<script lang="ts">
	import { textfit } from 'svelte-textfit';
	import type { PictureMeta, Post, VideoMeta } from '../models/post.type';

	export let post: Post;
	export let spaceId: number;
</script>

<div class="flex flex-row">
	<a href="/users/{post.poster_id}">
		<div class="avatar">
			<div class="w-10 rounded-full">
				<img src={post?.poster_picture?.url} />
			</div>
		</div>
	</a>
	<a href="/users/{post.poster_id}"
		><p class="text-primary font-semibold align-sub pl-1 pt-2">{post?.poster_name}</p></a
	>
	{#if spaceId != post.space_id}
		<p class="font-semibold align-sub pl-1 pt-2 pr-2">posted in</p>
		<a href="/s/{post.space_parent_id}/{post.space_id}">
			<div class="avatar">
				<div class="w-11 rounded-full">
					<img src={post?.space_picture?.url} />
				</div>
			</div>
		</a>
		<a href="/s/{post.space_parent_id}/{post.space_id}">
			<p class="text-primary font-semibold align-sub pl-1 pt-2">{post?.space_name}</p>
		</a>
	{/if}
</div>
