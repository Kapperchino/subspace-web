<script lang="ts">
	import { AppShell, Avatar } from '@skeletonlabs/skeleton';
	import { AppBar } from '@skeletonlabs/skeleton';

	import type { PageData } from './$types';
	import { textfit } from 'svelte-textfit';

	import Upvote from '~icons/bx/upvote';
	import Downvote from '~icons/bx/downvote';
	import VoteComponent from '$lib/voteComponent.svelte';
	import { setContext } from 'svelte';
	import { VoteType, type Post } from '../../../../models/post.type';

	export let data: PageData;
	let posts: Post[] = data.posts!;

	setContext('user', data.user);
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar>Skeleton</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">Sidebar Left</svelte:fragment>
	{#each posts as post, index}
		<div class="flex flex-row pt-4">
			<div class="basis-1/12 md:basis-3/12" />
			<a
				href="/s/{data.params?.spaceId}/{data.params?.subSpaceId}/p/{post.id}"
				class="card card-hover col-span-3 basis-10/12 md:basis-6/12"
			>
				{#if post?.topic != ''}
					<div class="p-3 pl-6 pt-4">
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
					</div>
				{/if}
				<div class="pl-4 pr-4 pt-2">
					<img class="rounded-md" alt="The project logo" src={post?.post_pictures?.at(0)?.url} />
				</div>
				<section class="p-2 pl-4">{post?.body}</section>
				<div class="flex flex-row pl-4 pb-2">
					<Avatar width="w-10" src={post?.poster_picture?.url} />
					<p class="font-semibold align-sub pl-1 pt-2">{post?.poster_name}</p>
					<div class="grow" />
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
			</a>
			<div class="basis-1/12 md:basis-3/12" />
		</div>
	{/each}
    <svelte:fragment slot="sidebarRight">Sidebar Right</svelte:fragment>
</AppShell>
