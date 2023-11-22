<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';

	import VoteComponent from '$lib/voteComponent.svelte';
	import { VoteType, type PictureMeta, type Post, type VideoMeta } from '../models/post.type';
	import CommentingComponent from './commentingComponent.svelte';
	import PostCardMetaComponent from './postCardMetaComponent.svelte';
	import TimeComponent from './timeComponent.svelte';

	import CommentsIcon from '~icons/mdi/comment-text-multiple-outline';

	let modal: HTMLDialogElement | undefined;

	export let post: Post | undefined;
	export let spaceId: number | undefined;
	export let imgHeight: number = 500;
	export let imgMinHeight: number = 300;

	export function getDimention(meta: PictureMeta | undefined) {
		const ratio = meta!.width / meta!.height;
		var height = Math.min(imgHeight, meta!.height);
		height = Math.max(imgMinHeight, height);
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

	async function clickTo() {
		await goto(`/s/${post?.space_parent_id}/${post?.space_id}/p/${post?.id}`);
	}

	async function commentClick() {
		modal?.show();
	}

	var onSuccess = async () => {
		modal?.close();
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="card card-compact shadow-lg bg-base-100 hover:cursor-pointer" on:click={clickTo}>
	<div class="card-body">
		<div class="flex-row flex">
			<div><PostCardMetaComponent {post} {spaceId} /></div>
		</div>
		{#if post?.topic != ''}
			<a
				class="card-title"
				href="/s/{post?.space_parent_id}/{post?.space_id}/p/{post?.id}"
				data-sveltekit-noscroll
			>
				<h3>
					{post?.topic}
				</h3>
			</a>
		{/if}
		{#if post?.body != ''}
			<a href="/s/{post?.space_parent_id}/{post?.space_id}/p/{post?.id}" data-sveltekit-noscroll>
				<section class="p-2 break-words subpixel-antialiased">
					{post?.body}
				</section>
			</a>
		{/if}
		{#if post?.post_pictures != null}
			<div class="flex justify-center">
				<div class="basis-1/4 rounded-md bg-gradient-to-r from-gray-900 to-gray-800" />
				<img
					loading="lazy"
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
			<div class="pt-2"><TimeComponent time={post?.created} /></div>
			<div class="grow" />
			<div class="btn btn-sm h-8" on:click|stopPropagation={() => modal?.showModal()}>
				<div class="join join-horizontal">
					<div class="text-primary"><CommentsIcon /></div>
					<p class="pl-2 font-semibold">{post?.comments_count}</p>
				</div>
			</div>
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

<dialog id="my_modal" class="modal" bind:this={modal}>
	<div class="modal-box p-0">
		<div class="grow">
			<CommentingComponent {post} comment={undefined} {onSuccess} />
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
