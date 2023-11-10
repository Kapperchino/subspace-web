<script lang="ts">
	import { AppShell, Avatar, TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
	import { AppBar } from '@skeletonlabs/skeleton';

	import type { PageData } from './$types';
	import { textfit } from 'svelte-textfit';

	import VoteComponent from '$lib/voteComponent.svelte';
	import { setContext } from 'svelte';
	import { VoteType, type Post, type PictureMeta } from '../../models/post.type';
	import { page } from '$app/stores';
	import SideBar from '$lib/sideBar.svelte';

	export let data: PageData;
	let posts: Post[] = data.posts!;
	const imgHeight = 500;

	export function getDimention(meta: PictureMeta | undefined) {
		const ratio = meta!.width / meta!.height;
		const width = imgHeight * ratio;
		const height = Math.min(imgHeight, meta!.height);
		return {
			width: width,
			height: height
		};
	}

	setContext('user', data.user);
</script>

<AppShell>
	<TabGroup justify="justify-center">
		<TabAnchor href="/home" selected={$page.url.pathname === '/home'}>For You</TabAnchor>
		<TabAnchor href="/following" selected={$page.url.pathname === '/following'}>Following</TabAnchor
		>
	</TabGroup>
	<svelte:fragment slot="sidebarLeft"><SideBar /></svelte:fragment>
	{#each posts as post, index}
		<div class="flex flex-row pt-4">
			<div class="basis-1/12 md:basis-3/12" />
			<div class="card card-hover basis-10/12 md:basis-6/12">
				{#if post?.topic != ''}
					<a
						class="flex p-3 pl-6 pt-4"
						href="/s/{post?.space_parent_id}/{post?.space_id}/p/{post.id}"
					>
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
					</a>
				{/if}
				{#if post?.post_pictures != null}
					<a
						class="pl-4 pr-4 pt-2 flex justify-center"
						href="/s/{post?.space_parent_id}/{post?.space_id}/p/{post.id}"
					>
						<div class="basis-1/4 rounded-md bg-gradient-to-r from-gray-900 to-gray-800" />
						<img
							class="rounded-md"
							alt="The project logo"
							height={getDimention(post?.post_pictures?.at(0)).height}
							width={getDimention(post?.post_pictures?.at(0)).width}
							src={post?.post_pictures?.at(0)?.url}
						/>
						<div class="basis-1/4 rounded-md bg-gradient-to-l from-gray-900 to-gray-800" />
					</a>
				{/if}
				<a href="/s/{post?.space_parent_id}/{post?.space_id}/p/{post.id}">
					<section class="p-2 pl-4">{post?.body}</section>
				</a>
				<div class="flex flex-row pl-4 pb-2">
					<Avatar width="w-10" src={post?.poster_picture?.url} />
					<p class="font-semibold align-sub pl-1 pt-2">{post?.poster_name}</p>
					<a class="grow" href="/s/{post?.space_parent_id}/{post?.space_id}/p/{post.id}" />
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
			</div>
			<div class="basis-1/12 md:basis-3/12" />
		</div>
	{/each}
</AppShell>
