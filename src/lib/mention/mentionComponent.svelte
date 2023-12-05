<svelte:options accessors={true} />

<script lang="ts">
	import type { SuggestionProps } from '@tiptap/suggestion';
	import { lockscroll, createLockScrollStore } from '@svelte-put/lockscroll';

	import { onDestroy, onMount } from 'svelte';
	import MentionItem from './mentionItem.svelte';

	export let props: SuggestionProps<any>;
	const SCROLL_HEIGHT = 400;
	const ELEMENT_HEIGHT = 60;

	const editor = props.editor;
	$: query = props.query;

	let selectedIndex = 0;

	$: menus = props.items;

	export const onKeyDown = ({ event }: { event: KeyboardEvent }) => {
		if (event.key === 'ArrowUp') {
			upHandler();
			return true;
		}

		if (event.key === 'ArrowDown') {
			downHandler();
			return true;
		}

		if (event.key === 'Enter') {
			enterHandler();
			return true;
		}

		return false;
	};
	const upHandler = () => {
		selectedIndex = (selectedIndex + menus.length - 1) % menus.length;
	};

	const downHandler = () => {
		selectedIndex = (selectedIndex + 1) % menus.length;
	};

	const enterHandler = () => {
		onSelect(selectedIndex);
	};

	const onActiveChange = (element: CustomEvent<HTMLElement>, idx: number) => {
		//max slash menu scroll is 400
		const parent = element.detail.offsetParent!;
		const elementHeight = (idx + 1) * ELEMENT_HEIGHT;
		if (elementHeight < parent.scrollTop || elementHeight > parent.scrollTop + SCROLL_HEIGHT) {
			requestAnimationFrame(() => {
				parent.scrollTo({
					top: Math.max(elementHeight - ELEMENT_HEIGHT, 0),
					behavior: 'smooth'
				});
			});
		}
	};

	const onSelect = (idx: number) => {
		const item = props.items[idx];
		if (item) {
			props.command({ id: item.user_address });
		}
	};

	const locked = createLockScrollStore();

	onMount(() => {
		$locked = true;
	});
	onDestroy(() => {
		$locked = false;
	});
</script>

<svelte:body use:lockscroll={locked} />

{#if menus?.length === 0 || menus == null}{:else}
	<ul class="z-50 flex max-h-[300px] flex-col overflow-hidden rounded-lg w-60">
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<div class="flex max-h-full flex-col gap-0 overflow-y-auto bg-base-100" tabindex="0">
			{#each menus as item, index (index)}
				<li
					class="relative cursor-pointer scroll-my-2 rounded-md pb-1 pl-2 pr-2 flex grow
	data-[highlighted]:bg-neutral data-[highlighted]:text-magnum-900
	  data-[disabled]:opacity-50"
				>
					<MentionItem
						on:active={(event) => onActiveChange(event, index)}
						user={item}
						active={selectedIndex === index}
						onClick={() => onSelect(index)}
					/>
				</li>
			{/each}
		</div>
	</ul>
{/if}
