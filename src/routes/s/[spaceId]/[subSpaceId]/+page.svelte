<script lang="ts">
	import type { PageData } from './$types';

	import { setContext } from 'svelte';
	import { page } from '$app/stores';
	import SpaceComponent from '$lib/spaceComponent.svelte';
	import type { Post } from '../../../../models/post.type';
	import SortPostComponent from '$lib/sortPostComponent.svelte';

	export let data: PageData;
	let spaceId: number = data.spaceId;
	let parentId: number = data.subspace.parent_id;
	setContext('user', data.user);
</script>

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
<!-- <TabGroup justify="justify-center">
	<TabAnchor href="/s/1/1" selected={$page.url.pathname === '/s/1/1'}>Posts</TabAnchor>
	<TabAnchor href="/following" selected={$page.url.pathname === '/following'}>About</TabAnchor>
</TabGroup> -->
<SpaceComponent posts={data.posts} {spaceId} />
