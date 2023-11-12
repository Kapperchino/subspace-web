<script lang="ts">
	import { AppShell, Avatar, FileButton, TabAnchor, TabGroup } from '@skeletonlabs/skeleton';

	import { textfit } from 'svelte-textfit';

	import VoteComponent from '$lib/voteComponent.svelte';
	import ImageAddFilled from '~icons/bxs/image-add';
	import VideoAdd from '~icons/bxs/video-plus';
	import LinkIcon from '~icons/bx/link';
	import { page } from '$app/stores';
	import { VoteType, type PictureMeta, type Post } from '../models/post.type';

	export let posts: Post[];
	const imgHeight = 500;

	export function getDimention(meta: PictureMeta | undefined) {
		const ratio = meta!.width / meta!.height;
		const width = imgHeight * ratio;
		const height = Math.min(imgHeight, meta!.height);
		return {
			width: width,
			height: height
		};
	}
</script>

<div class="pt-4 flex flex-row">
	<div class="basis-2 md:basis-2/12" />
	<div class="card basis-full md:basis-8/12">
		<section class="p-3 col-span-3">
			<form class="grid grid-cols-1 gap-2" method="POST" action="?/post">
				<label class="label pb-1">
					<span>Post In:</span>
					<input class="input w-52" type="search" name="search" placeholder="Search..." /></label
				>
				<label class="label">
					<textarea
						class="textarea grid-cols-[auto_1fr_auto]"
						name="Title"
						placeholder="Title (Optional)"
						rows="1"
					/>
				</label>
				<label class="label">
					<textarea
						class="textarea grid-cols-[auto_1fr_auto]"
						name="Post"
						placeholder="Post your thoughts!"
						rows="3"
					/>
				</label>
				<div class="flex-row flex">
					<FileButton name="pictures" button="btn-icon variant-filled-surface"
						><ImageAddFilled /></FileButton
					>
					<div class="pl-1" />
					<FileButton name="videos" button="btn-icon variant-filled-surface"
						><VideoAdd /></FileButton
					>
					<div class="pl-1" />
					<button type="button" class="btn-icon variant-filled-surface"><LinkIcon /></button>
				</div>
				<button type="submit" class="btn variant-filled-surface w-16 justify-self-end"
					>Post
				</button>
			</form>
		</section>
	</div>

	<div class="basis-2 md:basis-2/12" />
</div>
{#each posts as post, index}
	<div class="flex flex-row pt-4">
		<div class="basis-2 md:basis-2/12" />
		<div class="card basis-full md:basis-8/12">
			{#if post?.topic != ''}
				<a
					class="flex p-3 pl-6 pt-4"
					href="/s/{post?.space_parent_id}/{post?.space_id}/p/{post.id}"
				>
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
			<a href="/s/{post?.space_parent_id}/{post?.space_id}/p/{post.id}">
				<section class="p-2 pl-4">{post?.body}</section>
			</a>
			<div class="flex flex-row pl-4 pb-2">
				<Avatar width="w-10" src={post?.poster_picture?.url} />
				<p class="font-semibold align-sub pl-1 pt-2">{post?.poster_name}</p>
				<a class="grow" href="/s/{post?.space_parent_id}/{post?.space_id}/p/{post.id}" />
				<div class="pr-3">
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
		<div class="basis-2 md:basis-2/12" />
	</div>
{/each}
