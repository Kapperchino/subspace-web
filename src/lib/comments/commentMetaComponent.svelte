<script lang="ts">
	import type { Comment } from '../../models/comment.type';
	import type { PictureMeta, Post, VideoMeta } from '../../models/post.type';
	import AvatarComponent from '../avatarComponent.svelte';
	import SpaceAvatarComponent from '../spaceAvatarComponent.svelte';

	export let comment: Comment | undefined;
</script>

<div class="flex flex-row">
	<a href="/users/{comment?.poster_id}">
		<div class="avatar">
			<div class="w-10 rounded-full">
				<AvatarComponent url={comment?.poster_picture?.url} userId={comment?.poster_id} />
			</div>
		</div>
	</a>
	<a href="/users/{comment?.poster_id}" on:click|stopPropagation
		><p class="text-primary font-semibold align-sub pl-1 pt-2">{comment?.poster_name}</p></a
	>
</div>
