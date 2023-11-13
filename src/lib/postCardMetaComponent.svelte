<script lang="ts">
	import { AppShell, Avatar, FileButton, TabAnchor, TabGroup } from '@skeletonlabs/skeleton';

	import { textfit } from 'svelte-textfit';
	import type { PictureMeta, Post, VideoMeta } from '../models/post.type';


	export let post: Post;
	export let spaceId: number;
</script>

<div class="flex flex-row">
	<a href="/users/{post.poster_id}"> <Avatar width="w-10" src={post?.poster_picture?.url} /> </a>
	<a href="/users/{post.poster_id}"
		><p class="text-primary-500 font-semibold align-sub pl-1 pt-2">{post?.poster_name}</p></a
	>
	{#if spaceId != post.space_id}
		<p class="font-semibold align-sub pl-1 pt-2 pr-2">posted in</p>
		<a href="/s/{post.space_parent_id}/{post.space_id}"
			><Avatar width="w-10" src={post?.space_picture?.url} /></a
		>
		<a href="/s/{post.space_parent_id}/{post.space_id}">
			<p class="text-primary-500 font-semibold align-sub pl-1 pt-2">{post?.space_name}</p>
		</a>
	{/if}
</div>
