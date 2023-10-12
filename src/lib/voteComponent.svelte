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
	console.log(voteData);
	$: totalVotes = upVotes - downVotes;
	$: voteState = voteData == null || voteData.is_deleted ? 'none' : voteStateInit;
	async function onLike() {
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
		const voteRes = await vote(voteData!, user);
		const voteVal = await getVotes(voteData!, user, id!);
		upVotes = voteVal.up_votes;
		downVotes = voteVal.down_votes;
		if (voteVal.is_deleted) {
			voteState = 'none';
		} else {
			voteState = 'up';
		}
	}

	async function onDislike() {
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
		const voteRes = await vote(voteData!, user);
		const voteVal = await getVotes(voteData!, user, id!);
		upVotes = voteVal.up_votes;
		downVotes = voteVal.down_votes;
		if (voteVal.is_deleted) {
			voteState = 'none';
		} else {
			voteState = 'down';
		}
	}
</script>

<div class="btn-group variant-ghost p">
	{#if voteState == 'none'}
		<button class="btn-md" on:click={onLike}> <Upvote /> </button>
		<div class=" px-2.5 pt-1.5">
			{totalVotes}
		</div>
		<button class="btn-md" on:click={onDislike}><Downvote /></button>
	{:else if voteState == 'up'}
		<button class="btn-md" on:click={onLike}> <UpvoteFilled /> </button>
		<div class=" px-2.5 pt-1.5">
			{totalVotes}
		</div>
		<button class="btn-md" on:click={onDislike}><Downvote /></button>
	{:else}
		<button class="btn-md" on:click={onLike}> <Upvote /> </button>
		<div class=" px-2.5 pt-1.5">
			{totalVotes}
		</div>
		<button class="btn-md" on:click={onDislike}><DownvoteFilled /></button>
	{/if}
</div>

<style>
	.btn-group button {
		padding-left: 0.5rem;
		padding-right: 0.5rem;
	}
</style>
