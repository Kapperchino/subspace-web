<script lang="ts">
	import PostCardComponent from './postCardComponent.svelte';
	import type { Post } from '../models/post.type';
	import NotFoundComponent from './notFoundComponent.svelte';
	import { infiniteScrollAction } from 'svelte-legos';
	import { applyAction, enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { backendUrl } from './store/clientBackendUrl';
	import { coockieStore } from './store/tokenStore';
	import type { UserMeta } from '../models/signup.type';

	export let posts: Post[];
	export let spaceId: number;
	let offset: number = 0;
	let loaded = false;

	export const getPostsClient = async (
		userId: number,
		spaceId: number,
		days: number,
		sortType: string,
		offset: number
	): Promise<Response> => {
		const data = await fetch(
			`${backendUrl}/posts/spaces/${spaceId}?sort=${sortType}&days=${days}&userId=${userId}&start=${offset}`,
			{
				headers: {
					'Content-Type': 'application/json; charset=UTF-8'
				}
			}
		);
		return data;
	};

	async function fetchFunction(
		userId: number,
		days: string,
		type: string,
		offset: number,
		spaceId: number
	): Promise<Post[]> {
		return (await getPostsClient(userId, spaceId, Number(days), type, offset)).json();
	}

	async function loadItems() {
		if (!loaded) {
			offset += 10;
			const days = $page.url.searchParams.get('days') ?? '7';
			const type = $page.url.searchParams.get('type') ?? 'popular';
			const user: UserMeta | undefined = coockieStore.getValue('cookie');
			const newPosts = await fetchFunction(user?.user_id ?? 0, days, type, offset, spaceId);
			if (newPosts == null || newPosts == undefined || newPosts?.length == 0) {
				loaded = true;
				return;
			}
			posts = posts.concat(newPosts);
			if (newPosts?.length != 10) {
				loaded = true;
				return;
			}
		}
	}
</script>

{#if posts != null && posts.length > 0}
	<div
		use:infiniteScrollAction={{
			// boolean, default: false
			distance: 600,
			cb: loadItems,
			disabled: loaded
		}}
	>
		{#each posts as post, index}
			<div class="flex flex-row pt-2 justify-center">
				<div class="flex" />
				<div class="grow max-w-md md:max-w-xl">
					<PostCardComponent {post} {spaceId} />
				</div>
				<div class="flex" />
			</div>
		{/each}
	</div>
{:else}
	<NotFoundComponent />
{/if}
