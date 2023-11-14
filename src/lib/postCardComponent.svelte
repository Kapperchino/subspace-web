<script lang="ts">
	import { AppShell, Avatar, FileButton, TabAnchor, TabGroup } from '@skeletonlabs/skeleton';

	import { textfit } from 'svelte-textfit';

	import VoteComponent from '$lib/voteComponent.svelte';
	import { VoteType, type PictureMeta, type Post, type VideoMeta } from '../models/post.type';
	import PostCardMetaComponent from './postCardMetaComponent.svelte';
	import TimeComponent from './timeComponent.svelte';

	const imgHeight = 500;

	export let post: Post;
	export let spaceId: number;

	export function getDimention(meta: PictureMeta | undefined) {
		const ratio = meta!.width / meta!.height;
		const width = imgHeight * ratio;
		const height = Math.min(imgHeight, meta!.height);
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
</script>

<div class="flex-row flex">
	<div class="pt-2 pl-2"><PostCardMetaComponent {post} {spaceId} /></div>
	<a class="grow" href="/s/{post?.space_parent_id}/{post?.space_id}/p/{post.id}" />
</div>

{#if post?.topic != ''}
	<a class="flex p-3 pl-6 pt-4" href="/s/{post?.space_parent_id}/{post?.space_id}/p/{post.id}">
		<h3
			use:textfit={{
				mode: 'single',
				width: 1000,
				height: 30,
				forceSingleModeWidth: false
			}}
		>
			{post?.topic}
		</h3>
	</a>
{/if}
{#if post?.body != ''}
	<a href="/s/{post?.space_parent_id}/{post?.space_id}/p/{post.id}">
		<section class="p-2 pl-4">{post?.body}</section>
	</a>
{/if}
{#if post?.post_pictures != null}
	<a
		class="pl-4 pr-4 pt-2 flex justify-center"
		href="/s/{post?.space_parent_id}/{post?.space_id}/p/{post.id}"
	>
		<div class="basis-1/4 rounded-md bg-gradient-to-r from-gray-900 to-gray-800" />
		<img
			class="rounded-md"
			alt="The project logo"
			height={getDimention(post?.post_pictures?.at(0)).height}
			width={getDimention(post?.post_pictures?.at(0)).width}
			src={post?.post_pictures?.at(0)?.url}
		/>
		<div class="basis-1/4 rounded-md bg-gradient-to-l from-gray-900 to-gray-800" />
	</a>
{/if}
{#if post?.post_videos != null}
	<div class="pt-2" />
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
<div class="flex flex-row pl-4 pb-2 pt-2">
	<div class="pt-2"><TimeComponent time={post.created} /></div>
	<a class="grow" href="/s/{post?.space_parent_id}/{post?.space_id}/p/{post.id}" />
	<div class="pr-3 pt-1">
		<VoteComponent
			upVotes={post?.up_votes}
			downVotes={post?.down_votes}
			voteData={post?.vote}
			id={post?.id}
			voteType={VoteType.Post}
		/>
	</div>
</div>
