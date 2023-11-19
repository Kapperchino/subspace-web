<script lang="ts">
	// Most of your app wide CSS should be put in this file
	import { page } from '$app/stores';
	import FooterComponent from '$lib/footerComponent.svelte';
	import SideBar from '$lib/sideBar.svelte';
	import SideDrawer from '$lib/sideDrawer.svelte';
	import { Toaster } from 'svelte-french-toast';
	import '../app.css';

</script>
	<slot />
	<FooterComponent></FooterComponent>
	<Toaster />

