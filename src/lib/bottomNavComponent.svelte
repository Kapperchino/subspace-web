<script lang="ts">
	import Home from '~icons/bx/home';
	import Search from '~icons/bx/search';
	import Satellite from '~icons/material-symbols/satellite-alt-outline-sharp';
	import Bell from '~icons/ic/round-notifications-none';
	import Send from '~icons/ic/baseline-send';
	import PostingComponent from './postingComponent.svelte';
	import { goto, invalidateAll } from '$app/navigation';
	import { coockieStore } from './store/tokenStore';
	import { onMount } from 'svelte';
	import type { UserMeta } from '../models/signup.type';
	import AvatarComponent from './avatarComponent.svelte';
	import { createDialog, melt } from '@melt-ui/svelte';
	import X from '~icons/bx/x';
	let modal: HTMLDialogElement | undefined;

	var onSuccess = async () => {
		await invalidateAll();
		modal?.close();
	};

	let user: UserMeta;
	onMount(() => {
		user = coockieStore.getValue('cookie');
	});
</script>

<div class="sm:hidden btm-nav h-12 bg-base-300/60 z-50">
	<a href="/home" data-sveltekit-noscroll>
		<div class="text-lg">
			<Home />
		</div>
	</a>
	<a href="/explore" data-sveltekit-noscroll>
		<div class="text-lg">
			<Search />
		</div>
	</a>
	<a href="/spaces" data-sveltekit-noscroll>
		<div class="text-lg">
			<Satellite />
		</div>
	</a>
	<a href="/notifications" data-sveltekit-noscroll>
		<div class="text-lg">
			<Bell />
		</div>
	</a>
</div>
