<script lang="ts">
	import AvatarComponent from '$lib/avatarComponent.svelte';
	import ShellComponent from '$lib/shellComponent.svelte';

	// Most of your app wide CSS should be put in this file
	import SideBar from '$lib/sideBar.svelte';
	import SortPostComponent from '$lib/sortPostComponent.svelte';
	import { coockieStore } from '$lib/store/tokenStore';
	import { onMount } from 'svelte';
	import type { UserMeta } from '../../models/signup.type';

	let user: UserMeta;
	onMount(() => {
		user = coockieStore.getValue('cookie');
	});
</script>

<ShellComponent>
	<svelte:fragment slot="navbar">
		<a class="flex sm:hidden" href="/users/{user?.user_id}">
			<div class="avatar">
				<div class="w-10 rounded-full">
					<AvatarComponent url={user?.picture_meta?.url} userId={user?.user_id} />
				</div>
			</div>
		</a>
		<div class="flex-1" />
		<div class="md:flex-1" />
		<div class="flex bg-base-300/60 ml-3 rounded-lg">
			<div class="bottom-10 tabs tabs-boxed tabs-md flex">
				<a class="tab tab-active" href="/home">Home</a>
				<a class="tab" href="/following">Following</a>
			</div>
		</div>
		<div class="flex grow" />
		<SortPostComponent />
	</svelte:fragment>
	<svelte:fragment slot="content">
		<div><slot /></div>
	</svelte:fragment>
</ShellComponent>
