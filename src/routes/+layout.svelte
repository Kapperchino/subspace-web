<script lang="ts">
	// Most of your app wide CSS should be put in this file
	import { page } from '$app/stores';
	import FooterComponent from '$lib/footerComponent.svelte';
	import SideBar from '$lib/sideBar.svelte';
	import SideDrawer from '$lib/sideDrawer.svelte';
	import '../app.css';
	import 'highlight.js/styles/atom-one-dark.css';
</script>

<slot />
<div class="flex grow">
	<FooterComponent />
</div>
