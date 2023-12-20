<script lang="ts">
	import type { PageData } from './$types';

	import VoteComponent from '$lib/voteComponent.svelte';
	import { setContext } from 'svelte';
	import { page } from '$app/stores';
	import PostCardComponent from '$lib/posts/postCardComponent.svelte';
	import NotFoundComponent from '$lib/notFoundComponent.svelte';
	import type { PictureMeta } from '../../models/signup.type';

	export let data: PageData;
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

{#if data.posts != null && data.posts.length > 0}
	{#each data.posts as post, index}
		<div class="flex flex-row pt-2 justify-center">
			<div class="flex" />
			<div class="grow max-w-xl">
				<PostCardComponent {post} spaceId={1} />
			</div>
			<div class="flex" />
		</div>{/each}
{:else}
		<NotFoundComponent></NotFoundComponent>
{/if}
