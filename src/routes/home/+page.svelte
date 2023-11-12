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
	export let data: PageData;
	let posts: Post[] = data.posts!;
	setContext('user', data.user);
</script>

<AppShell>
	<TabGroup justify="justify-center">
		<TabAnchor href="/home" selected={$page.url.pathname === '/home'}>For You</TabAnchor>
		<TabAnchor href="/following" selected={$page.url.pathname === '/following'}>Following</TabAnchor
		>
	</TabGroup>
	<svelte:fragment slot="sidebarLeft"><SideBar /></svelte:fragment>
	<svelte:fragment slot="header">
		<div class="flex items-center md:hidden">
			<button class="btn btn-sm mr-4">
				<span>
					<svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
						<rect width="100" height="20" />
						<rect y="30" width="100" height="20" />
						<rect y="60" width="100" height="20" />
					</svg>
				</span>
			</button>
		</div>
	</svelte:fragment>
	<SpaceComponent {posts} />
</AppShell>
