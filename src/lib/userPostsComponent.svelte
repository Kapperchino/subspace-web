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
	import { afterUpdate, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getUserByAddress } from '../service/userServiceClient';
	import hljs from 'highlight.js/lib/common';
	import { createWindowVirtualizer } from '@tanstack/svelte-virtual';
	import { writable } from 'svelte/store';

	export let posts: Post[] | null;
	export let userId: number;
	let offset: number = 0;
	let loaded = false;
	$: isLoading = writable(false);

	let virtualListEl: HTMLDivElement;
	let virtualItemEls: HTMLDivElement[] = [];

	$: count = posts?.length ?? 0;

	$: virtualizer = createWindowVirtualizer<HTMLDivElement>({
		count,
		scrollMargin: virtualListEl?.offsetTop ?? 0,
		estimateSize: () => 300,
		initialRect: { width: 400, height: 1000 },
		overscan: 2
	});

	$: items = $virtualizer.getVirtualItems();

	$: {
		if (virtualItemEls.length) virtualItemEls.forEach((el) => $virtualizer.measureElement(el));
	}

	$: {
		$virtualizer.setOptions({
			count: !loaded ? count + 1 : count
		});

		const [lastItem] = [...$virtualizer.getVirtualItems()].reverse();

		if (lastItem && lastItem.index > count - 1 && !loaded && !$isLoading) {
			$isLoading = true;
		}
	}

	export const getPostsClient = async (
		curUserId: number,
		days: number,
		sortType: string,
		offset: number
	): Promise<Post[]> => {
		console.log(offset);
		const data = await axios.get(
			`${backendUrl}/posts/users/${userId}?sort=${sortType}&days=${days}&userId=${curUserId}&start=${offset}`,
			{
				headers: {
					'Content-Type': 'application/json; charset=UTF-8'
				}
			}
		);
		return data.data;
	};

	async function loadItems() {
		if (!loaded) {
			offset += 10;
			const days = $page.url.searchParams.get('days') ?? '30';
			const type = $page.url.searchParams.get('type') ?? 'popular';
			const user: UserMeta | undefined = coockieStore.getValue('cookie');
			const newPosts = await getPostsClient(user?.user_id ?? 0, Number(days), type, offset);
			if (newPosts == null || newPosts == undefined || newPosts?.length == 0) {
				loaded = true;
				$isLoading = false;
				return;
			}
			posts = posts!.concat(newPosts);
			$isLoading = false;
			if (newPosts?.length != 10) {
				loaded = true;
				$isLoading = false;
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
		isLoading.subscribe(async (val) => {
			if (val) {
				await loadItems();
			}
		});
	});

	afterUpdate(() => {
		hljs.highlightAll();
	});
</script>

{#if posts != null && posts.length > 0}
	<div bind:this={virtualListEl}>
		<div style="position: relative; height: {$virtualizer.getTotalSize()}px; width: 100%;">
			<div
				style="position: absolute; top: 0; width: 100%; transform: translateY({items[0]
					? items[0].start - $virtualizer.options.scrollMargin
					: 0}px);"
			>
				{#each items as row, idx (row.index)}
					<div
						bind:this={virtualItemEls[idx]}
						data-index={row.index}
						class="flex flex-row pt-2 justify-center"
					>
						<div class="flex" />
						<div class="grow max-w-full md:max-w-xl">
							<PostCardComponent post={posts[row.index]} spaceId={1} />
						</div>
						<div class="flex" />
					</div>
				{/each}
			</div>
		</div>
	</div>
{:else}
	<NotFoundComponent />
{/if}

{#if $isLoading}
	<div class="flex flex-row pt-2 pb-4 justify-center">
		<div class="flex" />
		<span class="flex content-center loading loading-spinner text-primary" />
		<div class="flex" />
	</div>
{/if}
