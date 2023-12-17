<script lang="ts">
	import { goto } from '$app/navigation';

	// Most of your app wide CSS should be put in this file
	import { page } from '$app/stores';
	import FooterComponent from '$lib/footerComponent.svelte';
	import ShellComponent from '$lib/shellComponent.svelte';
	import SideBar from '$lib/sideBar.svelte';
	import SideDrawer from '$lib/sideDrawer.svelte';
	import { blur } from 'svelte/transition';

	let term: string;
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
		<div class="flex grow justify-center">
			<div class="flex flex-col">
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
				<div class="pt-1 flex justify-center">
					<div class="flex tabs tabs-boxed tabs-md">
						<a class="tab tab-active" href="/home">Trending</a>
						<a class="tab" href="/news">News</a>
					</div>
				</div>
			</div>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="content">
		<div><slot /></div>
	</svelte:fragment>
</ShellComponent>
