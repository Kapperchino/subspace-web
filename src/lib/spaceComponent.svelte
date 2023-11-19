<script lang="ts">
	import PostCardComponent from './postCardComponent.svelte';
	import type { Post } from '../models/post.type';
	import NotFoundComponent from './notFoundComponent.svelte';

	export let posts: Post[];
	export let spaceId: number;
</script>

{#if posts != null && posts.length > 0}
	{#each posts as post, index}
		<div class="flex flex-row pt-2 justify-center">
			<div class="flex" />
			<div class="grow max-w-md md:max-w-lg">
				<PostCardComponent {post} {spaceId} />
			</div>
			<div class="flex" />
		</div>
	{/each}
{:else}
	<NotFoundComponent />
{/if}
