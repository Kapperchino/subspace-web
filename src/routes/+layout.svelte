<script lang="ts">
	// Most of your app wide CSS should be put in this file
	import { page } from '$app/stores';
	import FooterComponent from '$lib/footerComponent.svelte';
	import SideBar from '$lib/sideBar.svelte';
	import '../app.css';
	import 'highlight.js/styles/atom-one-dark.css';
</script>

<slot />
<div class="h-screen md:h-0"></div>
<div class="flex grow">
	<FooterComponent />
</div>
