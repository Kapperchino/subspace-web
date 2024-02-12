<script lang="ts">
	import PostCardComponent from '../posts/postCardComponent.svelte';
	import type { Post } from '../../models/post.type';
	import NotFoundComponent from '../notFoundComponent.svelte';
	import { backendUrl } from '../store/clientBackendUrl';
	import { afterUpdate, onDestroy, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getUserByAddress } from '../../service/userServiceClient';
	import hljs from 'highlight.js/lib/common';
	import type { Writable } from 'svelte/store';
	import { createVirtualizer } from '@tanstack/svelte-virtual';
	import CommentComponent from '$lib/comments/commentComponent.svelte';
	import type { UserMeta } from '../../models/signup.type';
	import { coockieStore } from '$lib/store/tokenStore';

	export let comments: Writable<Comment[]>;
	export let offset: Writable<number>;
	export let loaded: Writable<boolean>;
	export let posterId: number;
	let isLoading = false;
	let observer: IntersectionObserver;
	let user: UserMeta;

	let element: HTMLDivElement;

	let virtualListEl: HTMLDivElement;
	let virtualItemEls: HTMLDivElement[] = [];

	$: count = $comments.length ?? 0;

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

	export const getCommentsClient = async (posterId: number, offset: number): Promise<Comment[]> => {
		const data = await fetch(
			`${backendUrl}/comments/users/${posterId}?sort=latest&days=7&start=${offset}&userId=${user.user_id}`,
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
			isLoading = true;
			const netComments = await getCommentsClient(posterId, $offset);
			if (netComments == null || netComments == undefined || netComments?.length == 0) {
				$loaded = true;
				isLoading = false;
				return;
			}
			$comments = $comments.concat(netComments);
			isLoading = false;
			if (netComments?.length != 10) {
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
				if (entries[0].isIntersecting) {
					await loadItems();
				}
			},
			{ rootMargin: '500px' }
		);
		if (element) {
			observer?.observe(element);
		}
		user = coockieStore.getValue('cookie');
	});

	onDestroy(() => {
		observer?.disconnect();
	});

	afterUpdate(() => {
		hljs.highlightAll();
	});
</script>

{#if $comments != null && $comments.length > 0}
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
							<CommentComponent
								comment={{comment:$comments[row.index],children: []}}
							/>
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
