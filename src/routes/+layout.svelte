<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';

	import { TabGroup, TabAnchor } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
</script>

<TabGroup justify="justify-center">
	<TabAnchor  href="/s/1/1" selected={$page.url.pathname === '/s/1/1'} 
		>For You</TabAnchor
	>
	<TabAnchor href="/subscriptions" selected={$page.url.pathname === '/subscriptions'} 
		>Following</TabAnchor
	>
</TabGroup>

<slot />


