<script lang="ts">
	// Most of your app wide CSS should be put in this file
	import FooterComponent from '$lib/footerComponent.svelte';
	import Toaster from '$lib/toaster.svelte';
	import '../app.css';
	import 'highlight.js/styles/atom-one-dark.css';
</script>

<Toaster />
<slot />
<div class="h-screen md:h-0" />
<div class="flex grow">
	<FooterComponent />
</div>
