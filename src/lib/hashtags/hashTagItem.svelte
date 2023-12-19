<script lang="ts">
	import { type ComponentType, createEventDispatcher } from 'svelte';
	import type { UserInfo } from '../../models/signup.type';
	import AvatarComponent from '$lib/avatarComponent.svelte';
	import type { TagName } from '../../models/trending.type';

	const dispatcher = createEventDispatcher<{
		active: HTMLElement;
	}>();
	export let tag: TagName;
	export let active = false;
	export let onClick = () => {};
	let element: HTMLElement;

	$: bg = active ? 'bg-primary' : 'bg-base-200';
	$: text = active ? 'text-primary-content' : '';
	$: {
		if (active) {
			// wait for next tick make sure layout is ready
			setTimeout(() => {
				dispatcher('active', element);
			});
		}
	}
</script>

<button on:click={onClick} bind:this={element} class="flex grow flex-row {bg} py-2 px-2 rounded-lg">
	<div class="flex pl-3">
		<span class="text-lg {text}">#{tag.name}</span>
	</div>
</button>
