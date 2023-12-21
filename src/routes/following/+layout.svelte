<script lang="ts">
	// Most of your app wide CSS should be put in this file
	import { page } from '$app/stores';
	import FooterComponent from '$lib/footerComponent.svelte';
	import ShellComponent from '$lib/shellComponent.svelte';
	import PhoneSideBarButton from '$lib/sidebar/phoneSideBarButton.svelte';
	import SideBar from '$lib/sidebar/sideBar.svelte';
	import SortPostComponent from '$lib/sortPostComponent.svelte';
	import { blur } from 'svelte/transition';
</script>

<ShellComponent>
	<svelte:fragment slot="navbar">
		<PhoneSideBarButton />
		<div class="flex grow" />
		<div class="flex grow" />

		<div class="flex backdrop-blur bg-base-300/60 ml-3 rounded-full">
			<div class=" bottom-10 tabs tabs-boxed tabs-md flex">
				<a class="tab" href="/home">Home</a>
				<a class="tab tab-active" href="/following">Following</a>
			</div>
		</div>
		<div class="flex grow" />
		<SortPostComponent />
	</svelte:fragment>
	<svelte:fragment slot="content">
		<div><slot /></div>
	</svelte:fragment>
</ShellComponent>
