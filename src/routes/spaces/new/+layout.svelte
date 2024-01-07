<script lang="ts">
	// Most of your app wide CSS should be put in this file
	import { page } from '$app/stores';
	import FooterComponent from '$lib/footerComponent.svelte';
	import ShellComponent from '$lib/shellComponent.svelte';
	import PhoneSideBarButton from '$lib/sidebar/phoneSideBarButton.svelte';
	import SideBar from '$lib/sidebar/sideBar.svelte';
	import SpaceCreationComponent from '$lib/spaceCreationComponent.svelte';
	import { createDialog, melt } from '@melt-ui/svelte';
	import { blur } from 'svelte/transition';
	import X from '~icons/bx/x';

	const {
		elements: { trigger, overlay, content, title, description, close, portalled },
		states: { open }
	} = createDialog({
		forceVisible: true
	});
</script>

<ShellComponent>
	<svelte:fragment slot="navbar">
		<PhoneSideBarButton />
		<div class="flex grow" />
		<div class="backdrop-blur bg-base-300">
			<div class=" bottom-10 tabs tabs-boxed tabs-md flex">
				<a class="tab" href="/spaces/popular">Popular</a>
				<a class="tab tab-active" href="/spaces/new">New</a>
			</div>
		</div>
		<div class="flex grow" />
		<div class="btn btn-sm btn-secondary h-8" on:click|preventDefault use:melt={$trigger}>
			<div class="text-md font-bold subpixel-antialiased">Create New</div>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="content">
		<div><slot /></div>
	</svelte:fragment>
</ShellComponent>

<div use:melt={$portalled}>
	{#if $open}
		<div use:melt={$overlay} class="fixed inset-0 z-50 bg-black/50" />
		<div
			class="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-full sm:w-[90vw]
			max-w-xl translate-x-[-50%] translate-y-[-50%] rounded-xl bg-base-200
			p-3 shadow-lg"
			use:melt={$content}
		>
			<div class="flex flex-row">
				<h2 use:melt={$title} class="flex pb-2 text-lg font-semibold">Create New Space</h2>
				<div class="grow" />
				<button type="button" class="btn btn-sm btn-circle" use:melt={$close}><X /></button>
			</div>
			<SpaceCreationComponent />
		</div>
	{/if}
</div>
