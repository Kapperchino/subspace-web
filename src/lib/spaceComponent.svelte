<script lang="ts">
	import { AppShell, Avatar, FileButton, TabAnchor, TabGroup } from '@skeletonlabs/skeleton';

	import PostCardComponent from './postCardComponent.svelte';
	import type { Post } from '../models/post.type';

	export let posts: Post[];
	export let spaceId: number;
</script>

{#if posts != null && posts.length > 0}
	{#each posts as post, index}
		<div class="flex flex-row pt-4">
			<div class="basis-2 md:basis-2/12 lg:basis-1/5 xl:basis-3/12" />
			<div class="card basis-full md:basis-8/12 lg:basis-3/5 xl:basis-6/12">
				<PostCardComponent {post} {spaceId} />
			</div>
			<div class="basis-2 md:basis-2/12 lg:basis-1/5 xl:basis-3/12" />
		</div>
	{/each}
{:else}
	shits empty bro
{/if}
