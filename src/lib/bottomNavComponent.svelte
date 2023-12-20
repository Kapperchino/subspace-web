<script lang="ts">
	import Home from '~icons/bx/home';
	import Search from '~icons/bx/search';
	import Satellite from '~icons/material-symbols/satellite-alt-outline-sharp';
	import Bell from '~icons/ic/round-notifications-none';
	import Send from '~icons/ic/baseline-send';
	import PostingComponent from './posts/postingComponent.svelte';
	import { goto, invalidateAll } from '$app/navigation';
	import { coockieStore } from './store/tokenStore';
	import { onMount } from 'svelte';
	import type { UserMeta } from '../models/signup.type';
	import { page } from '$app/stores';

	let modal: HTMLDialogElement | undefined;

	var onSuccess = async () => {
		await invalidateAll();
		modal?.close();
	};

	let user: UserMeta;
	onMount(() => {
		user = coockieStore.getValue('cookie');
	});

	$: path = $page.route.id;
</script>

<div class="sm:hidden btm-nav h-12 bg-base-300/60 z-50">
	<a href="/home" data-sveltekit-noscroll>
		{#if path?.startsWith('/home')}
			<div class="text-lg text-primary">
				<Home />
			</div>
		{:else}
			<div class="text-lg">
				<Home />
			</div>
		{/if}
	</a>
	<a href="/explore" data-sveltekit-noscroll>
		{#if path?.startsWith('/explore')}
			<div class="text-lg text-primary">
				<Search />
			</div>
		{:else}
			<div class="text-lg">
				<Search />
			</div>
		{/if}
	</a>
	<a href="/spaces" data-sveltekit-noscroll>
		{#if path?.startsWith('/spaces')}
			<div class="text-lg text-primary">
				<Satellite />
			</div>
		{:else}
			<div class="text-lg">
				<Satellite />
			</div>
		{/if}
	</a>
	<a href="/notifications" data-sveltekit-noscroll>
		{#if path?.startsWith('/notifications')}
			<div class="text-lg text-primary">
				<Bell />
			</div>
		{:else}
			<div class="text-lg">
				<Bell />
			</div>
		{/if}
	</a>
</div>
