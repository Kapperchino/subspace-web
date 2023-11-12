<script lang="ts">
	import {
		AppRail,
		AppRailAnchor,
		AppShell,
		Avatar,
		Drawer,
		FileButton,
		TabAnchor,
		TabGroup,
		drawerStore,
		type DrawerSettings
	} from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';

	import { setContext } from 'svelte';
	import { page } from '$app/stores';
	import SpaceComponent from '$lib/spaceComponent.svelte';
	import type { Post } from '../../models/post.type';
	import SideBar from '$lib/sideBar.svelte';
	export let data: PageData;
	let posts: Post[] = data.posts!;

	setContext('user', data.user);
</script>

<TabGroup justify="justify-center">
	<TabAnchor href="/home" selected={$page.url.pathname === '/home'}>For You</TabAnchor>
	<TabAnchor href="/following" selected={$page.url.pathname === '/following'}>Following</TabAnchor>
</TabGroup>
<SpaceComponent {posts} />
