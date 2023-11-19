<script lang="ts">
	import type { Vote, VoteType } from '../models/post.type';

	import Upvote from '~icons/bx/upvote';
	import Downvote from '~icons/bx/downvote';
	import UpvoteFilled from '~icons/bxs/upvote';
	import DownvoteFilled from '~icons/bxs/downvote';
	import { getContext, onMount } from 'svelte';
	import type { UserMeta } from '../models/signup.type';
	import { getVotes, vote } from '../service/voteService';
	export let voteData: Vote | undefined;
	export let id: number | undefined;
	export let upVotes: number = 0;
	export let downVotes: number = 0;
	export let voteType: VoteType;
	let user: UserMeta = getContext('user');
	let voteStateInit = voteData?.is_up_vote ? 'up' : 'down';
	$: totalVotes = upVotes - downVotes;
	$: voteState = voteData == null || voteData.is_deleted ? 'none' : voteStateInit;
	async function onLike(event: Event) {
		if (voteData == null) {
			voteData = {
				vote_id: 0,
				is_deleted: false,
				is_up_vote: true,
				user_id: user.user_id,
				post_or_comment_id: id!,
				vote_type: voteType
			};
		}
		voteData!.is_up_vote = true;
		voteData!.user_id = user.user_id;
		voteData!.post_or_comment_id = id!;
		const voteRes = await vote(voteData!);
		const voteVal = await getVotes(voteData!, id!);
		upVotes = voteVal.up_votes;
		downVotes = voteVal.down_votes;
		if (voteVal.is_deleted) {
			voteState = 'none';
		} else {
			voteState = 'up';
		}
	}

	async function onDislike(event: Event) {
		if (voteData == null) {
			voteData = {
				vote_id: 0,
				is_deleted: false,
				is_up_vote: false,
				user_id: user.user_id,
				post_or_comment_id: id!,
				vote_type: voteType
			};
		}
		voteData!.is_up_vote = false;
		voteData!.user_id = user.user_id;
		voteData!.post_or_comment_id = id!;
		const voteRes = await vote(voteData!);
		const voteVal = await getVotes(voteData!, id!);
		upVotes = voteVal.up_votes;
		downVotes = voteVal.down_votes;
		if (voteVal.is_deleted) {
			voteState = 'none';
		} else {
			voteState = 'down';
		}
	}
</script>

<div class="join join-horizontal">
	{#if voteState == 'none'}
		<button class="btn btn-sm btn-square join-item" on:click|stopPropagation={onLike}>
			<Upvote />
		</button>
		<div class="divider-neutral join-item" />
		<div class="font-semibold pt-1.5 pl-3 pr-3">
			{totalVotes}
		</div>
		<div class="divider-neutral join-item" />
		<button class="btn btn-sm btn-square join-item" on:click|stopPropagation={onDislike}
			><Downvote /></button
		>
	{:else if voteState == 'up'}
		<button class="btn btn-sm btn-square btn-primary join-item" on:click|stopPropagation={onLike}>
			<UpvoteFilled />
		</button>
		<div class="divider-neutral join-item" />
		<div class="font-semibold pt-1.5 pl-3 pr-3">
			{totalVotes}
		</div>
		<div class="divider-neutral join-item" />

		<button class="btn btn-sm btn-square join-item" on:click|stopPropagation={onDislike}
			><Downvote /></button
		>
	{:else}
		<button class="btn btn-sm btn-square join-item" on:click|stopPropagation={onLike}>
			<Upvote />
		</button>
		<div class="divider-neutral join-item" />
		<div class="font-semibold pt-1.5 pl-3 pr-3">
			{totalVotes}
		</div>
		<div class="divider-neutral join-item" />
		<button class="btn btn-sm btn-square btn-error join-item" on:click|stopPropagation={onDislike}
			><DownvoteFilled /></button
		>
	{/if}
</div>
