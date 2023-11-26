<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';

	import VoteComponent from '$lib/voteComponent.svelte';
	import { VoteType, type PictureMeta, type Post, type VideoMeta } from '../models/post.type';
	import type { UserMeta } from '../models/signup.type';
	import CommentingComponent from './commentingComponent.svelte';
	import PostCardMetaComponent from './postCardMetaComponent.svelte';
	import { coockieStore } from './store/tokenStore';
	import TimeComponent from './timeComponent.svelte';

	// Import styles.
	import 'vidstack/player/styles/base.css';
	// Register elements.
	import 'vidstack/player';
	import 'vidstack/player/ui';
	import 'vidstack/icons';

	import { onMount } from 'svelte';
	import { isHLSProvider, type MediaCanPlayEvent, type MediaProviderChangeEvent } from 'vidstack';
	import type { MediaPlayerElement } from 'vidstack/elements';

	import CommentsIcon from '~icons/mdi/comment-text-multiple-outline';
	import VideoLayout from './video/layouts/VideoLayout.svelte';

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

	async function clickTo() {
		await goto(`/s/${post?.space_parent_id}/${post?.space_id}/p/${post?.id}`);
	}

	async function commentClick() {
		const user: UserMeta = coockieStore.getValue('cookie');
		if (user == undefined) {
			await goto('/login');
			return;
		}
		modal?.showModal();
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
					alt="Postcard pic"
					height={getDimention(post?.post_pictures?.at(0)).height}
					width={getDimention(post?.post_pictures?.at(0)).width}
					src={'https://subspace.place/cdn-cgi/image/fit=scale-down,width=550,format=auto/' +
						post?.post_pictures?.at(0)?.url}
				/>

				<div class="basis-1/4 rounded-md bg-gradient-to-l from-gray-900 to-gray-800" />
			</div>
		{/if}
		{#if post?.post_videos != null}
			<div class="flex">
				<media-player
					class="h-full w-full aspect-video bg-slate-900 text-white font-sans overflow-hidden rounded-md ring-media-focus data-[focus]:ring-4"
					title={post.topic ?? 'epic video'}
					src={post?.post_videos[0].url}
					crossorigin
					playsinline
					load="visible"
					on:click|stopPropagation
				>
					<media-provider>
						<media-poster
							class="absolute inset-0 block h-full w-full rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 [&>img]:h-full [&>img]:w-full [&>img]:object-cover"
							src={post?.post_videos[0].thumbnail}
							alt="Video thumbnail"
						/>
					</media-provider>
					<VideoLayout />
				</media-player>
			</div>
		{/if}
		<div class="card-actions">
			<div class="pt-2"><TimeComponent time={post?.created} /></div>
			<div class="grow" />
			<div class="btn btn-sm h-8" on:click|stopPropagation={commentClick}>
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
