<script lang="ts">
	// Most of your app wide CSS should be put in this file
	import { page } from '$app/stores';
	import FooterComponent from '$lib/footerComponent.svelte';
	import ShellComponent from '$lib/shellComponent.svelte';
	import PhoneSideBarButton from '$lib/sidebar/phoneSideBarButton.svelte';
	import SideBar from '$lib/sidebar/sideBar.svelte';
	import { blur } from 'svelte/transition';
</script>

<ShellComponent>
	<svelte:fragment slot="navbar">
		<PhoneSideBarButton />
		<div class="flex grow" />
		<div class="backdrop-blur bg-base-300">
			<div class=" bottom-10 tabs tabs-boxed tabs-md flex">
				<a class="tab tab-active" href="/spaces/popular">Popular</a>
				<a class="tab" href="/spaces/new">New</a>
			</div>
		</div>
		<div class="flex grow" />
	</svelte:fragment>
	<svelte:fragment slot="content">
		<slot />
	</svelte:fragment>
</ShellComponent>
