<script lang="ts">
	import type { PageData } from './$types';

	import Upvote from '~icons/bx/upvote';
	import Downvote from '~icons/bx/downvote';
	import VoteComponent from '$lib/voteComponent.svelte';
	import { setContext } from 'svelte';
	import AvatarComponent from '$lib/avatarComponent.svelte';
	import PostCardComponent from '$lib/postCardComponent.svelte';
	import PostPageComponent from '$lib/postPageComponent.svelte';
	import CommentComponent from '$lib/commentComponent.svelte';
	import type { PictureMeta, VideoMeta } from '../../../../../../models/post.type';
	import SeoComponent from '$lib/seoComponent.svelte';

	export let data: PageData;

	setContext('user', data.user);
</script>

<svelte:head>
	<SeoComponent
		title={data.post?.topic ?? 'Subspace Post'}
		description={data.post?.body ?? ''}
		img={data.post?.post_pictures?.at(0)?.url}
	/>
</svelte:head>

<!-- Navbar -->
<div class="w-full navbar bg-base-300">
	<div class="flex-none md:hidden">
		<label for="my-drawer-3" aria-label="open sidebar" class="btn btn-square btn-ghost">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				class="inline-block w-6 h-6 stroke-current"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M4 12h16M4 18h16"
				/></svg
			>
		</label>
	</div>
	<div class="flex grow" />
	{data.post?.space_name}
	<div class="flex grow" />
</div>
<div class="flex flex-row pt-2 justify-center">
	<div class="flex" />
	<div class="grow max-w-md md:max-w-xl">
		<PostPageComponent post={data.post} spaceId={data.post?.space_id} imgHeight={700} />
	</div>
	<div class="flex" />
</div>

{#if data.comments != undefined && data.comments.length > 0}
	<div class="w-full border-opacity-50 pt-4">
		<div class="divider divider-start divider-neutral pl-5">
			<p class="text-xl font-semi-bold subpixel-antialiased">Comments</p>
		</div>
	</div>
	{#each data.comments as comment, index}
		<div class="flex flex-row pt-4 justify-center">
			<div class="flex" />
			<div class="grow max-w-md md:max-w-xl">
				<CommentComponent {comment} />
			</div>
			<div class="flex" />
		</div>
	{/each}
{/if}
