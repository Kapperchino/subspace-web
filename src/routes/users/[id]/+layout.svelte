<script lang="ts">
	// Most of your app wide CSS should be put in this file
	import SideBar from '$lib/sidebar/sideBar.svelte';
	import type { LayoutData } from './$types';
	import AvatarComponent from '$lib/avatarComponent.svelte';
	import { onMount } from 'svelte';
	import ShellComponent from '$lib/shellComponent.svelte';
	import PhoneSideBarButton from '$lib/sidebar/phoneSideBarButton.svelte';
	export let data: LayoutData;
</script>

<ShellComponent>
	<svelte:fragment slot="navbar">
		<PhoneSideBarButton />
		<div class="flex grow flex-row justify-center">User Page</div>
	</svelte:fragment>
	<svelte:fragment slot="content">
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
				<div class="pl-2 text-primary">@{data.user.user_address}</div>
				<div class="card-body">
					{data.user.bio}
				</div>
			</div>
			<div class="flex grow" />
		</div>
		<slot />
	</svelte:fragment>
</ShellComponent>
