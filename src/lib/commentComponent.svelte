<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';

	import VoteComponent from '$lib/voteComponent.svelte';
	import type { CommentData } from '../models/comment.type';
	import { VoteType, type PictureMeta, type Post, type VideoMeta } from '../models/post.type';
	import CommentMetaComponent from './commentMetaComponent.svelte';
	import CommentingComponent from './commentingComponent.svelte';
	import TimeComponent from './timeComponent.svelte';
	import ReplyIcon from '~icons/gridicons/reply';
	import { createDialog, melt } from '@melt-ui/svelte';
	import X from '~icons/bx/x';

	export let comment: CommentData | undefined;
	export let imgHeight: number = 500;
	let btn: HTMLButtonElement;

	export function getDimention(meta: PictureMeta | undefined) {
		const ratio = meta!.width / meta!.height;
		const height = Math.min(imgHeight, meta!.height);
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
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="card card-compact shadow-lg bg-base-100 hover:cursor-pointer">
	<div class="card-body">
		<div class="flex-row flex">
			<div><CommentMetaComponent comment={comment?.comment} /></div>
		</div>

		{#if comment?.comment.body != ''}
			<section class="p-2 break-words subpixel-antialiased">
				{comment?.comment.body}
			</section>
		{/if}

		<div class="card-actions">
			<div class="pt-2"><TimeComponent time={comment?.comment.created} /></div>
			<div class="grow" />
			<div class="btn btn-sm btn-secondary h-8" use:melt={$trigger}>
				<div class="text-md font-bold subpixel-antialiased"><ReplyIcon /></div>
			</div>
			<div class="z-10">
				<VoteComponent
					upVotes={comment?.comment.up_votes}
					downVotes={comment?.comment.down_votes}
					voteData={comment?.comment.vote}
					id={comment?.comment.id}
					voteType={VoteType.Comment}
				/>
			</div>
		</div>
	</div>
</div>

{#if comment?.children != null && comment?.children.length > 0}
	{#each comment?.children as child, index}
		<div class="flex flex-row pt-2 justify-center">
			<div class="flex" />
			<div class="divider divider-neutral divider-horizontal" />
			<div class="grow flex-row max-w-md md:max-w-xl">
				<svelte:self comment={child} />
			</div>
			<div class="flex" />
		</div>
	{/each}
{/if}

<div use:melt={$portalled}>
	{#if $open}
		<div use:melt={$overlay} class="fixed inset-0 z-50 bg-black/50" />
		<div
			class="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw]
			  max-w-xl translate-x-[-50%] translate-y-[-50%] rounded-xl bg-base-200
			  p-3 shadow-lg"
			use:melt={$content}
		>
			<div class="flex flex-row">
				<h2 use:melt={$title} class="flex pb-2 text-lg font-semibold">Comment</h2>
				<div class="grow" />
				<button type="button" bind:this={btn} class="btn btn-sm btn-circle" use:melt={$close}
					><X /></button
				>
			</div>
			<CommentingComponent post={undefined} comment={comment?.comment} {onSuccess} />
		</div>
	{/if}
</div>
