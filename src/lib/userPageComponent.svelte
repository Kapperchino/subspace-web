<script lang="ts">
	import PostCardComponent from './postCardComponent.svelte';
	import type { Post } from '../models/post.type';
	import NotFoundComponent from './notFoundComponent.svelte';
	import { infiniteScrollAction } from 'svelte-legos';
	import { page } from '$app/stores';
	import { backendUrl } from './store/clientBackendUrl';
	import { coockieStore } from './store/tokenStore';
	import type { UserMeta } from '../models/signup.type';
	import axios from 'axios';
	import { afterUpdate, onDestroy, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getUserByAddress } from '../service/userServiceClient';
	import hljs from 'highlight.js/lib/common';
	import type { Writable } from 'svelte/store';

	export let posts: Writable<Post[]>;
	export let userId: number;
	export let offset: Writable<number>;
	export let loaded: Writable<boolean>;
	let isLoading = false;
	let observer: IntersectionObserver;

	let element: HTMLDivElement;

	export const getPostsClient = async (userId: number, offset: number): Promise<Post[]> => {
		const data = await axios.get(
			`${backendUrl}/posts/users/${userId}?sort=latest&days=7&start=${offset}`,
			{
				headers: {
					'Content-Type': 'application/json; charset=UTF-8'
				}
			}
		);
		return data.data;
	};

	async function loadItems() {
		if (!$loaded) {
			$offset += 10;
			isLoading = true;
			const newPosts = await getPostsClient(userId, $offset);
			if (newPosts == null || newPosts == undefined || newPosts?.length == 0) {
				$loaded = true;
				isLoading = false;
				return;
			}
			$posts = $posts.concat(newPosts);
			isLoading = false;
			if (newPosts?.length != 10) {
				$loaded = true;
				isLoading = false;
				return;
			}
		}
	}

	onMount(() => {
		const list = document.getElementsByClassName('mentions');
		for (let i = 0; i < list.length; i++) {
			const element = list.item(i);
			const name = element?.getAttribute('data-id');
			element?.addEventListener('click', async (e) => {
				e.preventDefault();
				const user = await getUserByAddress(name!);
				await goto(`/users/${user.data.user_id}`);
			});
		}
		const observer = new IntersectionObserver(
			async (entries) => {
				if (entries[0].isIntersecting) {
					await loadItems();
				}
			},
			{ rootMargin: '500px' }
		);
		observer?.observe(element);
	});

	onDestroy(() => {
		observer?.disconnect();
	});

	afterUpdate(() => {
		hljs.highlightAll();
	});
</script>

{#if $posts != null && $posts.length > 0}
	<div>
		{#each $posts as post, index}
			<div class="flex flex-row pt-2 justify-center">
				<div class="flex" />
				<div class="grow max-w-full md:max-w-xl">
					<PostCardComponent {post} spaceId={1} />
				</div>
				<div class="flex" />
			</div>
		{/each}
		<div bind:this={element} class="h-40" />
	</div>
{:else}
	<NotFoundComponent />
{/if}

{#if isLoading}
	<div class="flex flex-row pt-2 pb-4 justify-center">
		<div class="flex" />
		<span class="flex content-center loading loading-spinner text-primary" />
		<div class="flex" />
	</div>
{/if}
