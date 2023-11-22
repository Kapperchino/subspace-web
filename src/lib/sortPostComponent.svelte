<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let days: string = '7';
	let sortBy: string = 'popular';

	export let onSortChange = async () => {
		$page.url.searchParams.set('days', days);
		$page.url.searchParams.set('type', sortBy);
		await goto(`?${$page.url.searchParams.toString()}`, { invalidateAll: true });
	};
</script>

<select class="select select-ghost select-sm max-w-xs" bind:value={sortBy} on:change={onSortChange}>
	<option value="popular">Popular</option>
	<option value="latest">Latest</option>
</select>
<select
	bind:value={days}
	on:change={onSortChange}
	class="select select-ghost select-sm max-w-xs ml-1"
>
	<option value="1">Today</option>
	<option value="7">This Week</option>
	<option value="30">This Month</option>
	<option value="365">This Year</option>
</select>
