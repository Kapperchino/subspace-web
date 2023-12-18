<script lang="ts">
	import AvatarComponent from '$lib/avatarComponent.svelte';
	import ShellComponent from '$lib/shellComponent.svelte';
	import SortPostComponent from '$lib/sortPostComponent.svelte';
	import { coockieStore } from '$lib/store/tokenStore';
	import { onMount } from 'svelte';
	import type { UserMeta } from '../../../../../../../models/signup.type';

	export let data: import('./$types').LayoutData;
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
