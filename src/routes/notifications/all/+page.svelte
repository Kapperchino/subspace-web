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
	import SideBar from '$lib/sideBar.svelte';
	import ExploreComponent from '$lib/exploreComponent.svelte';
</script>

<AppShell>
	<TabGroup justify="justify-center">
		<TabAnchor href="/notifications/all" selected={$page.url.pathname === '/notifications/all'}
			>All</TabAnchor
		>
		<TabAnchor href="/notifications/mentions" selected={$page.url.pathname === '/notifications/mentions'}>Mentions</TabAnchor>
	</TabGroup>
	<svelte:fragment slot="sidebarLeft"><SideBar /></svelte:fragment>
</AppShell>
