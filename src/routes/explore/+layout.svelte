<script lang="ts">
	import { goto } from '$app/navigation';

	// Most of your app wide CSS should be put in this file
	import { page } from '$app/stores';
	import FooterComponent from '$lib/footerComponent.svelte';
	import SideBar from '$lib/sideBar.svelte';
	import SideDrawer from '$lib/sideDrawer.svelte';
	import { blur } from 'svelte/transition';

	let term: string;
</script>

<div class="drawer z-50 md:drawer-open">
	<input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content flex flex-col">
		<!-- Navbar -->
		<div class="w-full navbar bg-base-300">
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
			<div class="flex" />
			<div class="flex grow" />
			<div class="flex flex-row pt-3">
				<div class="basis-1/6" />
				<form method="POST" action="?/search">
					<div class="form-control">
						<input
							name="search"
							type="text"
							bind:value={term}
							placeholder="Search"
							class="input input-bordered"
						/>
					</div>
				</form>
				<div class="basis-1/6" />
			</div>
			<div class="flex grow" />
		</div>
		<div><slot /></div>
	</div>
	<SideBar />
</div>
