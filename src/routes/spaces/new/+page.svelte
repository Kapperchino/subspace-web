<script lang="ts">
	import type { PageData } from './$types';

	import { setContext } from 'svelte';
	import { page } from '$app/stores';
	import SpaceComponent from '$lib/spaceComponent.svelte';
	import SideBar from '$lib/sideBar.svelte';
	import ExploreComponent from '$lib/exploreComponent.svelte';
	import type { TagMeta } from '../../../models/trending.type';
	import type { Space } from '../../../models/space.type';
	import SpacePageComponent from '$lib/spacePageComponent.svelte';

	export let data: PageData;
	let spaces: Space[] = data.spaces!;
	setContext('user', data.user);
</script>

<!-- <TabGroup justify="justify-center">
	<TabAnchor href="/spaces/popular" selected={$page.url.pathname === '/spaces/popular'}
		>Popular</TabAnchor
	>
	<TabAnchor href="/spaces/new" selected={$page.url.pathname === '/spaces/new'}>New</TabAnchor>
</TabGroup> -->
<SpacePageComponent {spaces} />
