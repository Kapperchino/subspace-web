<script lang="ts">
	import PostCardComponent from './posts/postCardComponent.svelte';
	import type { Post } from '../models/post.type';
	import NotFoundComponent from './notFoundComponent.svelte';
	import { infiniteScrollAction } from 'svelte-legos';
	import { page } from '$app/stores';
	import { backendUrl } from './store/clientBackendUrl';
	import { coockieStore } from './store/tokenStore';
	import type { UserMeta } from '../models/signup.type';
	import { afterUpdate, onDestroy, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getUserByAddress } from '../service/userServiceClient';
	import hljs from 'highlight.js/lib/common';
	import type { Writable } from 'svelte/store';
	import { createVirtualizer, createWindowVirtualizer } from '@tanstack/svelte-virtual';

	export let posts: Writable<Post[]>;
	export let spaceId: number;
	export let offset: Writable<number>;
	export let loaded: Writable<boolean>;
	let isLoading = false;
	let observer: IntersectionObserver;

	let element: HTMLDivElement;

	let virtualListEl: HTMLDivElement;
	let virtualItemEls: HTMLDivElement[] = [];

	$: count = $posts?.length ?? 0;

	$: virtualizer = createVirtualizer<HTMLDivElement, HTMLDivElement>({
		getScrollElement: () => virtualListEl,
		count,
		scrollMargin: virtualListEl?.offsetTop ?? 0,
		estimateSize: () => 400,
		initialRect: { width: 400, height: 1000 },
		overscan: 20
	});

	$: items = $virtualizer.getVirtualItems();

	$: {
		if (virtualItemEls.length)
			virtualItemEls.forEach((el) => {
				$virtualizer.measureElement(el);
			});
	}

	$: {
		$virtualizer.setOptions({
			count: !loaded ? count + 1 : count
		});
	}

	export const getPostsClient = async (
		userId: number,
		spaceId: number,
		days: number,
		sortType: string,
		offset: number
	): Promise<Post[]> => {
		const data = await fetch(
			`${backendUrl}/posts/spaces/${spaceId}?sort=${sortType}&days=${days}&userId=${userId}&start=${offset}`,
			{
				headers: {
					'Content-Type': 'application/json; charset=UTF-8'
				}
			}
		);
		return await data.json();
	};

	async function loadItems() {
		if (!$loaded) {
			$offset += 10;
			const days = $page.url.searchParams.get('days') ?? '7';
			const type = $page.url.searchParams.get('type') ?? 'popular';
			const user: UserMeta | undefined = coockieStore.getValue('cookie');
			isLoading = true;
			const newPosts = await getPostsClient(
				user?.user_id ?? 0,
				spaceId,
				Number(days),
				type,
				$offset
			);
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
				await goto(`/users/${user.user_id}`);
			});
		}
		const observer = new IntersectionObserver(
			async (entries) => {
				if (entries) {
					if (entries[0]?.isIntersecting) {
						await loadItems();
					}
				}
			},
			{ rootMargin: '600px' }
		);
		if (element) {
			observer?.observe(element);
		}
	});

	onDestroy(() => {
		observer?.disconnect();
	});

	afterUpdate(() => {
		hljs.highlightAll();
	});
</script>

{#if $posts != null && $posts.length > 0}
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
							<PostCardComponent post={$posts[row.index]} {spaceId} index={row.index} />
						</div>
						<div class="flex" />
					</div>
				{/each}
			</div>
		</div>
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
