<script lang="ts">
	// Most of your app wide CSS should be put in this file
	import SideBar from '$lib/sideBar.svelte';
	import { blur } from 'svelte/transition';
</script>

<div class="drawer z-50 md:drawer-open">
	<input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
	<SideBar />
	<div class="drawer-content flex flex-col">
		<slot />
		<div class="flex grow h-full"></div>
	</div>
</div>
