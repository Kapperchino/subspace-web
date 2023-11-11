<script lang="ts">
	import {
		AppRail,
		AppRailAnchor,
		AppShell,
		Avatar,
		FileButton,
		TabAnchor,
		TabGroup
	} from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';

	import { setContext } from 'svelte';
	import { page } from '$app/stores';
	import SpaceComponent from '$lib/spaceComponent.svelte';
	import type { Post } from '../../models/post.type';
	import SideBar from '$lib/sideBar.svelte';
	import type { TagMeta } from '../../models/trending.type';
	import ExploreComponent from '$lib/exploreComponent.svelte';

	export let data: PageData;
	let tags: TagMeta[] = data.tags!;
	setContext('user', data.user);
</script>

<AppShell>
	<div class="flex flex-row pt-3">
		<div class="basis-1/6" />
		<input class="input basis-4/6" type="search" name="search" placeholder="Search..." />
		<div class="basis-1/6" />
	</div>
	<TabGroup justify="justify-center">
		<TabAnchor href="/trending" selected={$page.url.pathname === '/explore'}>Trending</TabAnchor>
		<TabAnchor href="/news" selected={$page.url.pathname === '/news'}>News</TabAnchor>
		<TabAnchor href="/sports" selected={$page.url.pathname === '/sports'}>Sports</TabAnchor>
	</TabGroup>
	<svelte:fragment slot="sidebarLeft"><SideBar /></svelte:fragment>
	<ExploreComponent {tags} />
</AppShell>
