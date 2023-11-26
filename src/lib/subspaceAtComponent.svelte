<script lang="ts">
	import { clickOutsideAction } from 'svelte-legos';
	import { SpacePrefixState, type SpacePrefixRes } from '../models/space.type';
	import { prefixSearchSpaces } from '../service/searchService';
	import SpaceAvatarComponent from './spaceAvatarComponent.svelte';
	import User from '~icons/mdi/account';

	let closeDropdown: boolean = false;
	let input: string;
	let list: SpacePrefixRes[] = [];

	export let state: SpacePrefixState = SpacePrefixState.Init;
	export let selectedSpace: SpacePrefixRes;
	$: className = closeDropdown ? 'dropdown-close' : 'dropdown-open';

	async function process() {
		if (input.length == 0) {
			list = [];
		} else {
			list = (await prefixSearchSpaces(input)).data;
		}
	}

	export function clickOutside() {
		closeDropdown = true;
		state = SpacePrefixState.Init;
		list = [];
		input = '';
	}

	async function selectItem(item: SpacePrefixRes) {
		state = SpacePrefixState.Selected;
		list = [];
		input = '';
		selectedSpace = item;
	}
</script>

{#if state == SpacePrefixState.Selecting}
	{#if list.length > 0}
		<div class="dropdown {className}" use:clickOutsideAction on:clickoutside={clickOutside}>
			<input
				type="text"
				placeholder="Type here"
				class="input input-bordered input-xs input-secondary w-40"
				autofocus
				bind:value={input}
				on:input={process}
			/>
			<ul
				tabindex="0"
				class="dropdown-content z-[1] p-0 m-0 menu shadow bg-base-100 rounded-box flex"
			>
				{#each list as item, _}
					<li on:click={() => selectItem(item)}>
						<div class="flex flex-row">
							<div class="flex avatar p-0">
								<div class="w-6 rounded-full">
									<SpaceAvatarComponent url={item.small_picture?.url} />
								</div>
							</div>
							<div class="flex">{item.name}</div>
							<div class="grow" />
							<User />
							<div class="flex justify-end">{item.sub_count}</div>
						</div>
					</li>
				{/each}
			</ul>
		</div>
	{:else}
		<input
			type="text"
			placeholder="Type here"
			class="input input-bordered input-xs input-secondary w-40"
			autofocus
			bind:value={input}
			on:input={process}
			use:clickOutsideAction
			on:clickoutside={clickOutside}
		/>
	{/if}
{/if}

{#if state == SpacePrefixState.Init}
	<div
		class="btn btn-xs btn-secondary"
		on:click={() => {
			state = SpacePrefixState.Selecting;
		}}
	>
		@Subspace
	</div>
{/if}

{#if state == SpacePrefixState.Selected}
	<div
		class="btn btn-xs btn-secondary"
		on:click={() => {
			state = SpacePrefixState.Selecting;
		}}
	>
		<div class="flex flex-row">
			<div class="flex avatar p-0">
				<div class="w-5 rounded-full">
					<SpaceAvatarComponent url={selectedSpace.small_picture?.url} />
				</div>
			</div>
			<div class="pl-1 flex text-sm">{selectedSpace.name}</div>
		</div>
	</div>
{/if}
