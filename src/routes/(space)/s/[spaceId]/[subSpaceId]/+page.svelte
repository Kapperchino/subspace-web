<script lang="ts">
	import type { PageData } from './$types';

	import { setContext } from 'svelte';
	import SpaceComponent from '$lib/spaceComponent.svelte';
	import SortPostComponent from '$lib/sortPostComponent.svelte';
	import SeoComponent from '$lib/seoComponent.svelte';
	import { persisted } from 'svelte-persisted-store';
	import { afterNavigate } from '$app/navigation';

	$: posts = persisted(`space-${spaceId}`, data.posts);
	$: offset = persisted(`space-${spaceId}-offset`, 0);
	$: loaded = persisted(`space-${spaceId}-loaded`, false);

	afterNavigate((nav) => {
		if (nav.type == 'enter' || nav.type == 'goto') {
			$posts = data.posts;
			$offset = 0;
			$loaded = false;
		}
	});

	export let data: PageData;
	let spaceId: number = data.spaceId;
	let parentId: number = data.subspace.parent_id;
	setContext('user', data.user);
</script>

<svelte:head>
	<SeoComponent
		title="Subspace {data.subspace.name}"
		description={data.subspace.description ??
			"Subspace is a social network for people to hang out with thier communities, there's a subspace for anything that you're intrested in, and if not, go create it!"}
		img={data.subspace.small_picture?.url ?? undefined}
	/>
</svelte:head>

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
	{data.subspace.name}
	<div class="flex grow" />

	<div class="flex grow" />
	<div class="backdrop-blur bg-base-300">
		<div class=" bottom-10 tabs tabs-boxed tabs-md flex">
			<a class="tab tab-active" href="/s/{parentId}/{spaceId}">Posts</a>
			<a class="tab" href="/s/{parentId}/{spaceId}/about">About</a>
		</div>
	</div>
	<div class="flex grow" />
	<div class="flex grow" />

	<SortPostComponent />
</div>

<SpaceComponent bind:loaded bind:posts bind:offset {spaceId} />
