<script lang="ts">

	import type { PageData } from './$types';
	import { textfit } from 'svelte-textfit';

	import Upvote from '~icons/bx/upvote';
	import Downvote from '~icons/bx/downvote';
	import VoteComponent from '$lib/voteComponent.svelte';
	import { setContext } from 'svelte';
	import { VoteType, type PictureMeta, type VideoMeta } from '../../../../../../models/post.type';

	export let data: PageData;
	const imgHeight = 800;

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

	setContext('user', data.user);
</script>

<div class="pt-6 flex flex-row">
	<div class="basis-2 md:basis-1/6" />
	<div class="card col-span-3 basis-full md:basis-4/6">
		{#if data.post?.topic != ''}
			<div class="flex p-3 pl-6 pt-4">
				<h3
					use:textfit={{
						mode: 'single',
						width: 1000,
						height: 30,
						forceSingleModeWidth: false
					}}
				>
					{data.post?.topic}
				</h3>
			</div>
		{/if}
		{#if data.post?.post_pictures != null}
			<div class="pl-4 pr-4 pt-2 flex justify-center">
				<div class="basis-1/4 rounded-md bg-gradient-to-r from-gray-900 to-gray-800" />
				<img
					class="rounded-md"
					alt="The project logo"
					height={getDimention(data.post?.post_pictures?.at(0)).height}
					width={getDimention(data.post?.post_pictures?.at(0)).width}
					src={data.post?.post_pictures?.at(0)?.url}
				/>
				<div class="basis-1/4 rounded-md bg-gradient-to-l from-gray-900 to-gray-800" />
			</div>
		{/if}
		{#if data.post?.post_videos != null}
			<div style="position: relative; padding-top: 80%;">
				<!-- svelte-ignore a11y-missing-attribute -->
				<iframe
					src={getVideoUrl(data.post?.post_videos[0])}
					style="border: none; position: absolute; top: 0; left: 0; height: 100%; width: 100%;"
					allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
					allowfullscreen={true}
				/>
			</div>
		{/if}
		<section class="p-2 pl-4">{data.post?.body}</section>
		<div class="flex flex-row pl-4 pb-2">
			<Avatar width="w-10" src={data.post?.poster_picture?.url} />
			<p class="font-semibold align-sub pl-1 pt-2">{data.post?.poster_name}</p>
			<div class="grow" />
			<div class="pr-3">
				<VoteComponent
					upVotes={data.post?.up_votes}
					downVotes={data.post?.down_votes}
					voteData={data.post?.vote}
					id={data.post?.id}
					voteType={VoteType.Post}
				/>
			</div>
		</div>
	</div>
	<div class="basis-2 md:basis-1/6" />
</div>
