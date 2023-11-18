<script lang="ts">
	// Most of your app wide CSS should be put in this file
	import { page } from '$app/stores';
	import ButtomNavComponent from '$lib/buttomNavComponent.svelte';
	import FooterComponent from '$lib/footerComponent.svelte';
	import SideBar from '$lib/sideBar.svelte';
	import SideDrawer from '$lib/sideDrawer.svelte';
	import { blur } from 'svelte/transition';
</script>

<div class="drawer z-50 md:drawer-open">
	<input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content flex flex-col" transition:blur>
		<slot />
	</div>
	<SideBar />
</div>
