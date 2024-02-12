<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';

	import VoteComponent from '$lib/voteComponent.svelte';
	import { VoteType, type PictureMeta, type Post, type VideoMeta } from '../../models/post.type';
	import CommentingComponent from '../comments/commentingComponent.svelte';
	import PostCardMetaComponent from './postCardMetaComponent.svelte';
	import TimeComponent from '../timeComponent.svelte';
	import ReplyIcon from '~icons/gridicons/reply';
	import X from '~icons/bx/x';

	import { createDialog, melt } from '@melt-ui/svelte';
	import { afterUpdate, onMount } from 'svelte';
	import { getUserByAddress } from '../../service/userServiceClient';
	import hljs from 'highlight.js/lib/common';
	import { flyAndScale } from '$lib/utils';
	import { fade } from 'svelte/transition';
	import { Image } from '@unpic/svelte';

	export let post: Post | undefined;
	export let spaceId: number | undefined;
	export let imgHeight: number = 400;
	export let imgMinHeight: number = 300;

	let btn: HTMLButtonElement;

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

	var onSuccess = async () => {
		await invalidateAll();
		btn.click();
	};

	const {
		elements: { trigger, overlay, content, title, description, close, portalled },
		states: { open }
	} = createDialog({
		forceVisible: true
	});

	onMount(() => {
		const list = document.getElementsByClassName('mentions');
		for (let i = 0; i < list.length; i++) {
			const element = list.item(i);
			const name = element?.getAttribute('data-id');
			element!.className = element!.className.concat(' cursor-pointer');
			element?.addEventListener('click', async (e) => {
				e.preventDefault();
				const user = await getUserByAddress(name!);
				await goto(`/users/${user.user_id}`);
			});
		}
	});

	export function getRatio(meta: PictureMeta | undefined) {
		const ratio = meta!.width / meta!.height;
		return ratio;
	}

	afterUpdate(() => {
		hljs.highlightAll();
	});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="card card-compact card-bordered shadow-lg bg-base-100">
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
			<div class="prose max-w-[26rem] sm:max-w-none break-words">
				{@html post?.body}
			</div>
		{/if}
		{#if post?.post_pictures != null}
			<div
				class="flex justify-center bg-gradient-to-b from-gray-900 to-gray-600 rounded-lg overflow-hidden"
			>
				<div>
					<Image
						src="https://subspace.place/cdn-cgi/image/format=auto/{post?.post_pictures?.at(0)?.url}"
						layout="constrained"
						aspectRatio={getRatio(post?.post_pictures?.at(0))}
						height="600"
						alt="image"
					/>
				</div>
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
			<div class="btn btn-sm btn-secondary h-8" use:melt={$trigger}>
				<div class="text-md font-bold subpixel-antialiased"><ReplyIcon /></div>
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
				<button type="button" class="btn btn-sm btn-circle" use:melt={$close} bind:this={btn}
					><X /></button
				>
			</div>
			<CommentingComponent {post} comment={undefined} {onSuccess} />
		</div>
	{/if}
</div>
