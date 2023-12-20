<script lang="ts">
	import type { PictureMeta, Post, VideoMeta } from '../../models/post.type';
	import AvatarComponent from '../avatarComponent.svelte';
	import SpaceAvatarComponent from '../spaceAvatarComponent.svelte';

	export let post: Post | undefined;
	export let spaceId: number | undefined;
</script>

<svelte:options immutable />

<div class="flex flex-row" >
	<a href="/users/{post?.poster_id}">
		<div class="avatar">
			<div class="w-10 rounded-full">
				<AvatarComponent url={post?.poster_picture?.url} userId={post?.poster_id}/>
			</div>
		</div>
	</a>
	<a href="/users/{post?.poster_id}" on:click|stopPropagation
		><p class="text-primary font-semibold align-sub pl-1 pt-2">{post?.poster_name}</p></a
	>
	{#if spaceId != post?.space_id}
		<p class="font-semibold align-sub pl-1 pt-2 pr-1">posted in</p>
		<a href="/s/{post?.space_parent_id}/{post?.space_id}" on:click|stopPropagation>
			<div class="avatar">
				<div class="w-10 rounded-full">
					<SpaceAvatarComponent url={post?.space_picture?.url} />
				</div>
			</div>
		</a>
		<a href="/s/{post?.space_parent_id}/{post?.space_id}">
			<p class="text-primary font-semibold align-sub pl-1 pt-2">{post?.space_name}</p>
		</a>
	{/if}
</div>
