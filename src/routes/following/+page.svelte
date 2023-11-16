<script lang="ts">

	import type { PageData } from './$types';

	import VoteComponent from '$lib/voteComponent.svelte';
	import { setContext } from 'svelte';
	import { VoteType, type Post, type PictureMeta } from '../../models/post.type';
	import { page } from '$app/stores';
	import PostCardComponent from '$lib/postCardComponent.svelte';

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

{#each posts as post, index}
<div class="flex flex-row pt-2 justify-center">
	<div class="flex" />
	<div class="grow max-w-xl">
		<PostCardComponent {post} spaceId={1} />
	</div>
	<div class="flex" />
</div>{/each}
