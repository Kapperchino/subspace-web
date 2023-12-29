<script lang="ts">
	import { clickOutsideAction } from 'svelte-legos';
	import { SpacePrefixState, type SpacePrefixRes } from '../models/space.type';
	import { prefixSearchSpaces } from '../service/searchService';
	import SpaceAvatarComponent from './spaceAvatarComponent.svelte';
	import { createCombobox, melt } from '@melt-ui/svelte';

	let list: SpacePrefixRes[] = [];

	export let state: SpacePrefixState = SpacePrefixState.Init;
	export let selectedSpace: SpacePrefixRes | undefined;

	export function clickOutside() {
		if ($inputValue.length == 0) {
			$open = false;
			state = SpacePrefixState.Init;
			list = [];
			$inputValue = '';
		}
	}

	const {
		elements: { menu, input, option, label },
		states: { open, inputValue, touchedInput, selected },
		helpers: { isSelected }
	} = createCombobox({
		forceVisible: true
	});

	selected.subscribe((val: any | undefined) => {
		if (val != undefined) {
			selectedSpace = val.value;
			state = SpacePrefixState.Selected;
			$inputValue = '';
		}
	});

	let debounceTimer: ReturnType<typeof setTimeout>;

	const debounce = (callback: () => void) => {
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(callback, 200);
	};

	$: {
		if ($touchedInput) {
			debounce(async () => {
				list = await prefixSearchSpaces($inputValue);
			});
		} else {
			list = [];
		}
	}
</script>

{#if state == SpacePrefixState.Selecting}
	<div>
		<input
			use:melt={$input}
			use:clickOutsideAction
			on:clickoutside={clickOutside}
			type="text"
			placeholder="Search"
			class="input input-bordered input-lg text-lg input-secondary w-60 max-h-[54px]"
			autofocus
		/>
	</div>
	{#if $open}
		<ul class="flex max-h-[300px] flex-col overflow-hidden rounded-lg w-60 z-50" use:melt={$menu}>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<div
				class="flex max-h-full flex-col gap-0 overflow-y-auto bg-base-100 px-2 py-2"
				tabindex="0"
			>
				{#each list as item, index (index)}
					<li
						use:melt={$option({
							value: item,
							label: item.name,
							disabled: item.name == 'SubSpace'
						})}
						class="relative cursor-pointer scroll-my-2 rounded-md py-2 pl-2 pr-2
        data-[highlighted]:bg-secondary data-[highlighted]:text-primary-content
          data-[disabled]:opacity-50"
					>
						<div class="flex flex-row">
							<div class="flex avatar p-0">
								<div class="w-6 rounded-full">
									<SpaceAvatarComponent url={item.small_picture?.url} />
								</div>
							</div>
							<div class="flex pl-3">
								<span class="text-lg">{item.name}</span>
							</div>
						</div>
					</li>
				{/each}
			</div>
		</ul>
	{/if}
{/if}

{#if state == SpacePrefixState.Init}
	<button
		type="button"
		class="btn btn-secondary btn-sm shadow-md shadow-secondary px-1"
		on:click={() => {
			state = SpacePrefixState.Selecting;
		}}
	>
		@Subspace
	</button>
{/if}

{#if state == SpacePrefixState.Selected}
	<button
		class="btn btn-secondary shadow-md btn-sm shadow-secondary px-1"
		type="button"
		on:click={() => {
			state = SpacePrefixState.Selecting;
		}}
	>
		<div class="flex flex-row">
			<div class="pr-0.5 flex text-base">@</div>
			<div class="flex avatar p-0">
				<div class="w-5 rounded-full">
					<SpaceAvatarComponent url={selectedSpace?.small_picture?.url} />
				</div>
			</div>
			<div class="pl-1 flex text-base">{selectedSpace?.name}</div>
		</div>
	</button>
{/if}
