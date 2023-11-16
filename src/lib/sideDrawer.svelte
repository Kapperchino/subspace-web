<script lang="ts">
	import Home from '~icons/bx/home';
	import Search from '~icons/bx/search';
	import Satellite from '~icons/material-symbols/satellite-alt-outline-sharp';
	import Bell from '~icons/material-symbols/notifications';
	import { page } from '$app/stores';

</script>

<div class="drawer z-50 lg:drawer-open">
	<input id="my-drawer-3" type="checkbox" class="drawer-toggle" /> 
	<div class="drawer-content flex flex-col">
	  <!-- Navbar -->
	  <div class="w-full navbar bg-base-300">
		<div class="flex-none lg:hidden">
		  <label for="my-drawer-3" aria-label="open sidebar" class="btn btn-square btn-ghost">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
		  </label>
		</div> 
		<div class="flex-1 px-2 mx-2">Subspace</div>
	  </div>
	</div> 

	<div class="drawer-side">
	  <label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay lg:hidden"></label> 
	  <ul class="menu p-4 w-80 min-h-full bg-base-200">
		<!-- Sidebar content here -->
		<li><a>Sidebar Item 1</a></li>
		<li><a>Sidebar Item 2</a></li>
	  </ul>
	</div>
  </div>

<!-- <AppRail width="w-64">
	<AppRailAnchor
		aspectRatio="h-12"
		href="/home"
		regionLead="flex justify-items-start items-start"
		selected={$page.url.pathname === '/home' || $page.url.pathname === '/following'}
		on:click={drawerClose}
	>
		<div class="pl-3 flex flex-row">
			<Home />
			<div class="pl-1" />
			<p class="flex text-lg">Home</p>
		</div>
	</AppRailAnchor>
	<AppRailAnchor
		aspectRatio="h-12"
		href="/explore"
		selected={$page.url.pathname === '/explore'}
		on:click={drawerClose}
	>
		<div class="pl-3 flex flex-row">
			<Search />
			<div class="pl-1" />
			<p class="flex text-lg">Explore</p>
		</div>
	</AppRailAnchor>
	<AppRailAnchor
		aspectRatio="h-12"
		href="/spaces"
		selected={$page.url.pathname.startsWith('/spaces')}
		on:click={drawerClose}
	>
		<div class="pl-3 flex flex-row">
			<Satellite />
			<div class="pl-1" />
			<p class="flex text-lg">Space</p>
		</div></AppRailAnchor
	>
	<AppRailAnchor
		aspectRatio="h-12"
		href="/notifications"
		selected={$page.url.pathname === '/notifications'}
		on:click={drawerClose}
	>
		<div class="pl-3 flex flex-row">
			<Bell />
			<div class="pl-1" />
			<p class="flex text-lg">Notifications</p>
		</div></AppRailAnchor
	>
</AppRail> -->
