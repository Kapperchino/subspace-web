<script lang="ts">
	import { createDialog, createPopover, createSwitch, melt } from '@melt-ui/svelte';
	import type { UserMeta } from '../../models/signup.type';
	import AvatarComponent from '../avatarComponent.svelte';

	import Dots from '~icons/mdi/dots-vertical';
	import X from '~icons/bx/x';
	import Logout from '~icons/material-symbols/logout-rounded';
	import { coockieStore } from '../store/tokenStore';
	import { goto } from '$app/navigation';
	import { themeStore } from '$lib/store/themeStore';
	import { flyAndScale } from '$lib/utils';
	import { fade } from 'svelte/transition';

	export let user: UserMeta | undefined;
	$: theme = themeStore;

	const {
		elements: { trigger, overlay, content, title, description, close, portalled },
		states: { open }
	} = createDialog({
		forceVisible: true
	});
</script>

<button type="button" use:melt={$trigger}>
	<slot name="button" />
</button>

<div use:melt={$portalled}>
	{#if $open}
		<div
			use:melt={$overlay}
			transition:fade={{ duration: 150 }}
			class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
		/>
		<div
			class="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-full sm:w-[90vw]
			max-w-xl translate-x-[-50%] translate-y-[-50%] rounded-xl bg-base-200
			p-3 shadow-lg"
			use:melt={$content}
			transition:flyAndScale={{
				duration: 150,
				y: 100,
				start: 0.96
			}}
		>
			<div class="flex flex-row">
				<h2 use:melt={$title} class="flex pb-2 text-lg font-semibold">Settings</h2>
				<div class="grow" />
				<button type="button" class="btn btn-sm btn-circle" use:melt={$close}><X /></button>
			</div>
			<div class="flex justify-center">
				<label class="flex cursor-pointer gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg
					>

					<input
						class="toggle"
						type="checkbox"
						value={$theme}
						on:change={(e) => {
							if ($theme == 'dark') {
								$theme = 'light';
							} else {
								$theme = 'dark';
							}
						}}
						checked={$theme == 'light'}
					/>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						><circle cx="12" cy="12" r="5" /><path
							d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
						/></svg
					>
				</label>
			</div>
		</div>
	{/if}
</div>
