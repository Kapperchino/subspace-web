<script lang="ts">
	// Most of your app wide CSS should be put in this file
	import SideBar from '$lib/sideBar.svelte';
	import SortPostComponent from '$lib/sortPostComponent.svelte';
</script>

<div class="drawer md:drawer-open">
	<input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content flex flex-col">
		<div class="w-full navbar bg-base-300 sticky top-0 z-40">
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
			<div class="flex backdrop-blur bg-base-300 ml-3">
				<div class=" bottom-10 tabs tabs-boxed tabs-md flex">
					<a class="tab tab-active" href="/home">Home</a>
					<a class="tab" href="/following">Following</a>
				</div>
			</div>
			<div class="flex grow" />
			<SortPostComponent />
		</div>
		<div><slot /></div>
	</div>
	<SideBar />
</div>
