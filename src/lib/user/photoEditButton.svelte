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
	import PhotoEditComponent from './photoEditComponent.svelte';

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
			sm:max-w-sm translate-x-[-50%] translate-y-[-50%] rounded-xl bg-base-200
			p-3 shadow-lg"
			use:melt={$content}
			transition:flyAndScale={{
				duration: 150,
				y: 100,
				start: 0.96
			}}
		>
			<div class="flex flex-row">
				<h2 use:melt={$title} class="flex pb-2 text-lg font-semibold">Upload Photo</h2>
				<div class="grow" />
				<button type="button" class="btn btn-sm btn-circle" use:melt={$close}><X /></button>
			</div>
			<PhotoEditComponent />
		</div>
	{/if}
</div>
