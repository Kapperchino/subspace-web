<script lang="ts">
	import { goto } from '$app/navigation';


	import VoteComponent from '$lib/voteComponent.svelte';
	import { VoteType, type PictureMeta, type Post, type VideoMeta } from '../models/post.type';
	import PostCardMetaComponent from './postCardMetaComponent.svelte';
	import TimeComponent from './timeComponent.svelte';

	const imgHeight = 500;

	export let post: Post;
	export let spaceId: number;

	export function getDimention(meta: PictureMeta | undefined) {
		const ratio = meta!.width / meta!.height;
		const height = Math.min(imgHeight, meta!.height);
		const width = height * ratio;
		return {
			width: width,
			height: height
		};
	}

	function getVideoUrl(meta: VideoMeta): string {
		let url = '';
		let list = meta.url.split('/');
		list.pop();
		list.pop();
		list.push('/iframe');
		list.forEach((element) => {
			url += element;
			url += '/';
		});
		return url;
	}

	function clickTo(){
		goto(`/s/${post?.space_parent_id}/${post?.space_id}/p/${post.id}`);
	}
</script>

	<div class="card card-compact shadow-lg bg-base-100 hover:cursor-pointer" on:click={clickTo}>
		<div class="card-body">
			<div class="flex-row flex">
				<div ><PostCardMetaComponent {post} {spaceId} /></div>
			</div>
	
			{#if post?.topic != ''}
				<a class="card-title" href="/s/{post?.space_parent_id}/{post?.space_id}/p/{post.id}">
					<h3>
						{post?.topic}
					</h3>
				</a>
			{/if}
			{#if post?.body != ''}
				<a href="/s/{post?.space_parent_id}/{post?.space_id}/p/{post.id}">
					<section class="p-2">{post?.body}</section>
				</a>
			{/if}
			{#if post?.post_pictures != null}
				<div
					class="flex justify-center"
				>
					<div class="basis-1/4 rounded-md bg-gradient-to-r from-gray-900 to-gray-800" />
					<!-- <img
						class="rounded-md"
						alt="The project logo"
						height={getDimention(post?.post_pictures?.at(0)).height}
						width={getDimention(post?.post_pictures?.at(0)).width}
						src={post?.post_pictures?.at(0)?.url}
					/> -->
					<img
						class="rounded-md"
						alt="The project logo"
						height={getDimention(post?.post_pictures?.at(0)).height}
						width={getDimention(post?.post_pictures?.at(0)).width}
						src={post?.post_pictures?.at(0)?.url}
					/>
	
					<div class="basis-1/4 rounded-md bg-gradient-to-l from-gray-900 to-gray-800" />
				</div>
			{/if}
			{#if post?.post_videos != null}
				
				<div style="position: relative; padding-top: 80%;">
					<!-- svelte-ignore a11y-missing-attribute -->
					<iframe
						src={getVideoUrl(post.post_videos[0])}
						style="border: none; position: absolute; top: 0; left: 0; height: 100%; width: 100%;"
						allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
						allowfullscreen={true}
					/>
				</div>
			{/if}
			<div class="card-actions">
				<div class="pt-2"><TimeComponent time={post.created} /></div>
				<div class="grow" />
				<div class="z-10">
					<VoteComponent
						upVotes={post?.up_votes}
						downVotes={post?.down_votes}
						voteData={post?.vote}
						id={post?.id}
						voteType={VoteType.Post}
					/>
				</div>
			</div>
		</div>
	</div>

