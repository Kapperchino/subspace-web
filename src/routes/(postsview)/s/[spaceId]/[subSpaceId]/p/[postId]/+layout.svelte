<script lang="ts">
	import ShellComponent from '$lib/shellComponent.svelte';
	import SortPostComponent from '$lib/sortPostComponent.svelte';

	export let data: import('./$types').LayoutData;
</script>

<ShellComponent>
	<svelte:fragment slot="navbar">
		<div class="flex-none md:hidden">
			<label for="my-drawer-3" aria-label="open sidebar" class="btn btn-square btn-ghost">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					class="inline-block w-6 h-6 stroke-current"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h16"
					/></svg
				>
			</label>
		</div>
		<div class="flex-1" />
		<div class="md:flex-1" />
		<div class="flex backdrop-blur bg-base-300/60 ml-3 rounded-lg">
			<div class="flex grow" />
			{data.post?.space_name}
			<div class="flex grow" />
		</div>
		<div class="flex grow" />
		<SortPostComponent />
	</svelte:fragment>
	<svelte:fragment slot="content">
		<div><slot /></div>
	</svelte:fragment>
</ShellComponent>
