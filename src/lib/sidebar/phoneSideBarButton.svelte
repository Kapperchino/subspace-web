<script lang="ts">
	import Home from '~icons/bx/home';
	import Search from '~icons/bx/search';
	import Satellite from '~icons/material-symbols/satellite-alt-outline-sharp';
	import Bell from '~icons/ic/round-notifications-none';
	import Send from '~icons/ic/baseline-send';
	import PostingComponent from '../posts/postingComponent.svelte';
	import { goto, invalidateAll } from '$app/navigation';
	import { coockieStore } from '../store/tokenStore';
	import { onMount } from 'svelte';
	import type { UserMeta } from '../../models/signup.type';
	import { createDialog, melt } from '@melt-ui/svelte';
	import X from '~icons/bx/x';
	import Settings from '~icons/material-symbols/settings-outline-rounded';
	import Account from '~icons/material-symbols/account-circle';
	import { page } from '$app/stores';
	import SideBarProfileComponent from './sideBarProfileComponent.svelte';
	import SettingsComponent from './settingsComponent.svelte';
	import AvatarComponent from '$lib/avatarComponent.svelte';
	import PhoneSideBar from './phoneSideBar.svelte';
	import { fade, fly } from 'svelte/transition';
	let modal: HTMLDialogElement | undefined;

	var onSuccess = async () => {
		await invalidateAll();
		modal?.close();
	};

	let user: UserMeta | undefined;
	onMount(() => {
		user = coockieStore.getValue('cookie');
	});

	const {
		elements: { trigger, overlay, content, title, description, close, portalled },
		states: { open }
	} = createDialog({
		forceVisible: true
	});

	$: path = $page.route.id;
	$: url = $page.url.pathname;
</script>

<div class="flex sm:hidden" use:melt={$trigger}>
	<div class="avatar">
		<div class="w-10 rounded-full">
			<AvatarComponent url={user?.picture_meta?.url} userId={user?.user_id} />
		</div>
	</div>
</div>

<div use:melt={$portalled}>
	{#if $open}
		<div use:melt={$overlay} class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />

		<div use:melt={$content}>
			<PhoneSideBar />
		</div>
	{/if}
</div>
