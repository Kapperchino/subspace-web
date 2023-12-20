<script lang="ts">
	// Most of your app wide CSS should be put in this file
	import { page } from '$app/stores';
	import FooterComponent from '$lib/footerComponent.svelte';
	import SideBar from '$lib/sidebar/sideBar.svelte';
	import { blur } from 'svelte/transition';
</script>

<div class="drawer z-50 md:drawer-open">
	<input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content flex flex-col">
		<slot />
		<div class="flex grow"></div>
	</div>
	<SideBar />
</div>
