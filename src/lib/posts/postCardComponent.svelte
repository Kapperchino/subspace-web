<svelte:options immutable />

<script lang="ts">
	import VoteComponent from '$lib/voteComponent.svelte';
	import { VoteType, type PictureMeta, type Post } from '../../models/post.type';
	import CommentingComponent from '../comments/commentingComponent.svelte';
	import PostCardMetaComponent from './postCardMetaComponent.svelte';
	import TimeComponent from '../timeComponent.svelte';
	import X from '~icons/bx/x';

	import CommentsIcon from '~icons/mdi/comment-text-multiple-outline';
	import { createDialog, melt } from '@melt-ui/svelte';
	import { flyAndScale } from '$lib/utils';
	import { fade } from 'svelte/transition';
	import { Image } from '@unpic/svelte';

	export let post: Post | undefined;
	export let spaceId: number | undefined;
	export let index: number;
	const imgMaxHeight: number = 500;
	const imgMaxWidth: number = 550;
	let divElement: HTMLDivElement | undefined;
	$: imgDivWidth = divElement ? divElement?.offsetWidth : imgMaxWidth;

	export function getDimention(meta: PictureMeta | undefined) {
		const ratio = meta!.width / meta!.height;
		let height = imgDivWidth / ratio;
		return {
			width: imgDivWidth,
			height: Math.min(height, imgMaxHeight)
		};
	}

	export function getRatio(meta: PictureMeta | undefined) {
		const ratio = meta!.width / meta!.height;
		return ratio;
	}

	var onSuccess = async () => {
		$open = false;
	};

	const {
		elements: { trigger, overlay, content, title, description, close, portalled },
		states: { open }
	} = createDialog({
		forceVisible: true
	});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<a href="/s/{post?.space_parent_id}/{post?.space_id}/p/{post?.id}">
	<div
		class="card card-compact card-bordered shadow-lg bg-base-100 hover:cursor-pointer"
		draggable="false"
	>
		<div class="card-body">
			<div class="flex-row flex">
				<div><PostCardMetaComponent {post} {spaceId} /></div>
			</div>
			{#if post?.topic != ''}
				<a class="card-title" href="/s/{post?.space_parent_id}/{post?.space_id}/p/{post?.id}">
					<h3>
						{post?.topic}
					</h3>
				</a>
			{/if}
			{#if post?.body != ''}
				<a
					href="/s/{post?.space_parent_id}/{post?.space_id}/p/{post?.id}"
					class="prose max-w-[26rem] sm:max-w-none break-words subpixel-antialiased"
				>
					{@html post?.body}
				</a>
			{/if}
			{#if post?.post_pictures != null}
				<div
					class="flex justify-center bg-gradient-to-b from-gray-900 to-gray-600 rounded-lg overflow-hidden"
				>
					<Image
						src="https://subspace.place/cdn-cgi/image/format=auto/{post?.post_pictures?.at(0)?.url}"
						layout="constrained"
						aspectRatio={getRatio(post?.post_pictures?.at(0))}
						height="500"
						alt="image"
						priority="true"
						background="auto"
					/>
				</div>
			{/if}
			{#if post?.post_videos != null}
				<div class="flex">
					{#await import('../video/VideoPlayer.svelte') then { default: Player }}
						<svelte:component
							this={Player}
							src={post.post_videos[0].url}
							thumbnail={post?.post_videos[0].thumbnail}
							title={post.topic ?? 'video'}
						/>
					{/await}
				</div>
			{/if}
			<div class="card-actions">
				<div class="pt-2"><TimeComponent time={post?.created} /></div>
				<div class="grow" />
				<div class="btn btn-sm h-8" on:click|preventDefault use:melt={$trigger}>
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
</a>

<div use:melt={$portalled}>
	{#if $open}
		<div
			use:melt={$overlay}
			transition:fade={{ duration: 150 }}
			class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
		/>
		<div
			class="fixed left-[50%] top-[50%] z-40 max-h-[85vh] w-full sm:w-[90vw]
			  max-w-xl translate-x-[-50%] translate-y-[-50%] rounded-xl bg-base-200
			  p-3 shadow-lg"
			use:melt={$content}
			transition:flyAndScale={{
				duration: 150,
				y: 100,
				start: 0.96
			}}
		>
			<div class="flex flex-row">
				<h2 use:melt={$title} class="flex pb-2 text-lg font-semibold">Comment</h2>
				<div class="grow" />
				<button type="button" class="btn btn-sm btn-circle" use:melt={$close}><X /></button>
			</div>
			<CommentingComponent {post} comment={undefined} {onSuccess} />
		</div>
	{/if}
</div>
