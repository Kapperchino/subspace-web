<script lang="ts">
	// Most of your app wide CSS should be put in this file
	import SideBar from '$lib/sidebar/sideBar.svelte';
	import type { LayoutData } from './$types';
	import AvatarComponent from '$lib/avatarComponent.svelte';
	import { onMount } from 'svelte';
	import ShellComponent from '$lib/shellComponent.svelte';
	import PhoneSideBarButton from '$lib/sidebar/phoneSideBarButton.svelte';
	import Pencil from '~icons/material-symbols/edit-rounded';
	import { coockieStore } from '$lib/store/tokenStore';
	import type { UserMeta } from '../../../models/signup.type';
	import PhotoEditButton from '$lib/user/photoEditButton.svelte';

	export let data: LayoutData;

	let user: UserMeta | undefined;
	onMount(() => {
		user = coockieStore.getValue('cookie');
	});
</script>

<ShellComponent>
	<svelte:fragment slot="navbar">
		<PhoneSideBarButton />
		<div class="flex grow flex-row justify-center">User Page</div>
	</svelte:fragment>
	<svelte:fragment slot="content">
		<div class="flex flex-row mt-2">
			<div class="flex grow" />
			<div class="flex grow card card-compact max-w-md md:max-w-xl bg-base-300 relative">
				<div class="indicator">
					{#if user?.user_id === Number(data.params.id)}
						<PhotoEditButton>
							<svelte:fragment slot="button">
								<button
									type="button"
									class="btn btn-circle btn-primary btn-sm absolute left-20 bottom-16 z-10"
								>
									<Pencil />
								</button>
							</svelte:fragment>
						</PhotoEditButton>
					{/if}
					<div class="avatar pt-2 pl-2">
						<div class="w-24 rounded-full">
							<AvatarComponent url={data.user.picture_meta?.url} userId={data.user?.user_id} />
						</div>
					</div>
				</div>
				<div class="card-title pl-2 pt-2">
					{data.user.display_name}
				</div>
				<div class="pl-2 text-primary">@{data.user.user_address}</div>
				{#if user?.user_id === Number(data.params.id)}
					<div class="flex flex-row justify-end">
						<button type="button" class="flex btn btn-primary btn-sm mx-2">
							<Pencil />
						</button>
					</div>
				{/if}
				<div class="card-body">
					{data.user.bio}
				</div>
			</div>
			<div class="flex grow" />
		</div>
		<slot />
	</svelte:fragment>
</ShellComponent>
