<script lang="ts">
	// Most of your app wide CSS should be put in this file
	import { page } from '$app/stores';
	import ButtomNavComponent from '$lib/buttomNavComponent.svelte';
	import FooterComponent from '$lib/footerComponent.svelte';
	import SideBar from '$lib/sideBar.svelte';
	import SideDrawer from '$lib/sideDrawer.svelte';
	import { blur } from 'svelte/transition';
	import type { LayoutData } from './$types';
	import AvatarComponent from '$lib/avatarComponent.svelte';

	export let data: LayoutData;
</script>

<div class="drawer z-50 md:drawer-open">
	<input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content flex flex-col">
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
			<div class="flex grow" />
			User page
			<div class="flex grow" />
		</div>
		<div class="flex flex-row mt-2">
			<div class="flex grow" />
			<div class="flex grow card card-compact max-w-md md:max-w-xl bg-base-300">
				<div class="avatar pt-2 pl-2">
					<div class="w-24 rounded-full">
						<AvatarComponent url={data.user.picture_meta?.url} userId={data.user.user_id} />
					</div>
				</div>
				<div class="card-title pl-2 pt-2">
					{data.user.display_name}
				</div>
				<div class="card-body">
					{data.user.bio}
				</div>
			</div>
			<div class="flex grow" />
		</div>

		<slot />
	</div>
	<SideBar />
</div>
