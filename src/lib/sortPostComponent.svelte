<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import SortIcon from '~icons/iconamoon/sorting-left-bold';

	let days: string = '7';
	let sortBy: string = 'popular';

	export let onSortChange = async () => {
		$page.url.searchParams.set('days', days);
		$page.url.searchParams.set('type', sortBy);
		await goto(`?${$page.url.searchParams.toString()}`, {
			invalidateAll: true,
			replaceState: true
		});
	};
</script>

<div class="md:hidden md:flex-row">
	<div class="dropdown dropdown-bottom dropdown-end">
		<div tabindex="0" role="button" class="btn btn-sm btn-ghost m-1 h-9"><SortIcon /></div>
		<ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32">
			<select
				class="select select-ghost select-sm w-full max-w-xs"
				bind:value={sortBy}
				on:change={onSortChange}
			>
				<option value="popular">Popular</option>
				<option value="latest">Latest</option>
			</select>
			<select
				bind:value={days}
				on:change={onSortChange}
				class="select select-ghost select-sm max-w-xs md:ml-2"
			>
				<option value="1">Today</option>
				<option value="7">This Week</option>
				<option value="30">This Month</option>
				<option value="365">This Year</option>
			</select>
		</ul>
	</div>
</div>

<div class="md:flex hidden md:flex-row">
	<select
		class="select select-ghost select-sm w-full max-w-xs"
		bind:value={sortBy}
		on:change={onSortChange}
	>
		<option value="popular">Popular</option>
		<option value="latest">Latest</option>
	</select>
	<select
		bind:value={days}
		on:change={onSortChange}
		class="select select-ghost select-sm max-w-xs md:ml-2"
	>
		<option value="1">Today</option>
		<option value="7">This Week</option>
		<option value="30">This Month</option>
		<option value="365">This Year</option>
	</select>
</div>
