<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import {
		AppShell,
		Drawer,
		TabAnchor,
		TabGroup,
		type DrawerSettings,
		drawerStore
	} from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import SideDrawer from '$lib/sideDrawer.svelte';
	import SideBar from '$lib/sideBar.svelte';

	const drawerSettings: DrawerSettings = {
		width: 'w-64'
	};

	function drawerOpen(): void {
		drawerStore.open(drawerSettings);
	}
</script>

<AppShell>
	<Drawer>
		<SideDrawer />
	</Drawer>
	<svelte:fragment slot="sidebarLeft"><SideBar /></svelte:fragment>
	<svelte:fragment slot="header">
		<div class="flex items-center md:hidden">
			<button class="btn btn-sm mr-4" on:click={drawerOpen}>
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
	<slot />
</AppShell>
