<script lang="ts">
	import Home from '~icons/bx/home';
	import Search from '~icons/bx/search';
	import Satellite from '~icons/material-symbols/satellite-alt-outline-sharp';
	import Bell from '~icons/ic/round-notifications-none';
	import Send from '~icons/ic/baseline-send';
	import PostingComponent from '../posts/postingComponent.svelte';
	import { invalidateAll } from '$app/navigation';
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
	import SideBarProfilePhone from './sideBarProfilePhone.svelte';
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

<div
	class="z-50 fixed left-0 top-0 h-screen w-20
shadow-lg focus:outline-none"
>
	<ul class="menu p-4 w-60 min-h-full bg-base-200">
		{#if user}
			<a href="/users/{user?.user_id}" data-sveltekit-noscroll>
				{#if url.toString().startsWith(`/users/${user.user_id}`)}
					<li class="bg-primary rounded-lg">
						<div class=" join">
							<div class="text-lg text-primary-content">
								<Account />
							</div>
							<div class="flex text-lg text-primary-content">Account</div>
						</div>
					</li>
				{:else}
					<li class="rounded-lg">
						<div class="join">
							<div class="text-lg">
								<Account />
							</div>
							<div class="flex text-lg">Account</div>
						</div>
					</li>
				{/if}
			</a>
		{/if}

		<SettingsComponent {user}>
			<svelte:fragment slot="button">
				<li class="rounded-lg">
					<div class="join">
						<div class="text-lg">
							<Settings />
						</div>
						<div class="flex text-lg">Settings</div>
					</div>
				</li>
			</svelte:fragment>
		</SettingsComponent>

		<button type="button" class="btn btn-primary btn-sm h-12 mt-3" use:melt={$trigger}>
			<div class="text-lg flex flex-row">Post</div>
		</button>

		<SideBarProfilePhone {user} />
	</ul>
</div>

<div use:melt={$portalled}>
	{#if $open}
		<div use:melt={$overlay} class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
		<div
			class="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw]
			  max-w-xl translate-x-[-50%] translate-y-[-50%] rounded-xl bg-base-300
			  p-3 shadow-lg"
			use:melt={$content}
		>
			<div class="flex flex-row">
				<h2 use:melt={$title} class="flex pb-2 text-lg font-semibold">Comment</h2>
				<div class="grow" />
				<button type="button" class="btn btn-sm btn-circle" use:melt={$close}><X /></button>
			</div>
			<PostingComponent {onSuccess} />
		</div>
	{/if}
</div>
