<script>
	import BottomNavComponent from './bottomNavComponent.svelte';
	import SideBar from './sidebar/sideBar.svelte';
</script>

<div class="drawer md:drawer-open">
	<input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content flex flex-col">
		<!-- Navbar -->
		<div class="w-full navbar bg-base-300/60 sticky backdrop-blur-md top-0 z-40">
			<slot name="navbar">No navbar was provided</slot>
		</div>
		<div><slot name="content">No content was provided</slot></div>
	</div>
	<SideBar />
	<BottomNavComponent />
</div>
