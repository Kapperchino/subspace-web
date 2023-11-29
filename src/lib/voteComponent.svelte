<script lang="ts">
	import type { Vote, VoteType } from '../models/post.type';

	import Upvote from '~icons/bx/upvote';
	import Downvote from '~icons/bx/downvote';
	import UpvoteFilled from '~icons/bxs/upvote';
	import DownvoteFilled from '~icons/bxs/downvote';
	import { getContext, onMount } from 'svelte';
	import type { UserMeta } from '../models/signup.type';
	import { getVotes, vote } from '../service/voteService';
	import { goto } from '$app/navigation';
	import { coockieStore } from './store/tokenStore';
	export let voteData: Vote | undefined;
	export let id: number | undefined;
	export let upVotes: number = 0;
	export let downVotes: number = 0;
	export let voteType: VoteType;

	enum VoteState {
		None,
		Upvote,
		Downvote
	}

	let user: UserMeta = getContext('user');

	$: voteStateInit = voteData?.is_up_vote ? VoteState.Upvote : VoteState.Downvote;
	$: totalVotes = upVotes - downVotes;
	$: voteState = voteData == null || voteData.is_deleted ? VoteState.None : voteStateInit;
	async function onLike(event: Event) {
		await commentClick();
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
			voteState = VoteState.None;
		} else {
			voteState = VoteState.Upvote;
		}
	}

	async function onDislike(event: Event) {
		await commentClick();
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
			voteState = VoteState.None;
		} else {
			voteState = VoteState.Downvote;
		}
	}

	async function commentClick() {
		const user: UserMeta = coockieStore.getValue('cookie');
		if (user == undefined) {
			await goto('/login');
			return;
		}
	}
</script>

<div class="join join-horizontal" on:click|stopPropagation|preventDefault>
	{#if voteState == VoteState.None}
		<button
			type="button"
			class="btn btn-sm btn-square join-item"
			on:click|stopPropagation|preventDefault={onLike}
		>
			<Upvote />
		</button>
		<div class="divider-neutral join-item" />
		<div class="font-semibold pt-1.5 pl-3 pr-3">
			{totalVotes}
		</div>
		<div class="divider-neutral join-item" />
		<button
			type="button"
			class="btn btn-sm btn-square join-item"
			on:click|stopPropagation|preventDefault={onDislike}><Downvote /></button
		>
	{:else if voteState == VoteState.Upvote}
		<button
			type="button"
			class="btn btn-sm btn-square btn-primary join-item"
			on:click|stopPropagation|preventDefault={onLike}
		>
			<UpvoteFilled />
		</button>
		<div class="divider-neutral join-item" />
		<div class="font-semibold pt-1.5 pl-3 pr-3">
			{totalVotes}
		</div>
		<div class="divider-neutral join-item" />

		<button
			type="button"
			class="btn btn-sm btn-square join-item"
			on:click|stopPropagation|preventDefault={onDislike}><Downvote /></button
		>
	{:else}
		<button
			type="button"
			class="btn btn-sm btn-square join-item"
			on:click|stopPropagation|preventDefault={onLike}
		>
			<Upvote />
		</button>
		<div class="divider-neutral join-item" />
		<div class="font-semibold pt-1.5 pl-3 pr-3">
			{totalVotes}
		</div>
		<div class="divider-neutral join-item" />
		<button
			type="button"
			class="btn btn-sm btn-square btn-error join-item"
			on:click|stopPropagation|preventDefault={onDislike}><DownvoteFilled /></button
		>
	{/if}
</div>
