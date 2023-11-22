<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';

	import VoteComponent from '$lib/voteComponent.svelte';
	import type { CommentData } from '../models/comment.type';
	import { VoteType, type PictureMeta, type Post, type VideoMeta } from '../models/post.type';
	import CommentMetaComponent from './commentMetaComponent.svelte';
	import CommentingComponent from './commentingComponent.svelte';
	import PostCardMetaComponent from './postCardMetaComponent.svelte';
	import TimeComponent from './timeComponent.svelte';
	import ReplyIcon from '~icons/gridicons/reply';

	import CommentsIcon from '~icons/mdi/comment-text-multiple-outline';

	export let comment: CommentData | undefined;
	export let imgHeight: number = 500;
	let modal: HTMLDialogElement | undefined;

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

	var onSuccess = async () => {
		await invalidateAll();
		modal?.close();
	};
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
			<div class="btn btn-sm btn-secondary h-8" on:click={() => modal?.showModal()}>
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

<dialog id="my_modal" class="modal" bind:this={modal}>
	<div class="modal-box p-0">
		<div class="grow">
			<CommentingComponent post={undefined} comment={comment?.comment} {onSuccess} />
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
