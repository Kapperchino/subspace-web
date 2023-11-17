<script lang="ts">
	import type { Space } from '../models/space.type';
	import SpaceAvatarComponent from './spaceAvatarComponent.svelte';

	export let space: Space;
</script>


<div class="flex flex-row pt-2 justify-center">
	<div class="flex" />
	<div class="card card-compact grow max-w-xl bg-base-100 shadow-lg">
		<a
			class="card-body join join-horizontal flex"
			href="/s/{space.parent_id}/{space.id}"
		>
		<div class="avatar">
			<div class="w-10 rounded-full">
			
			<SpaceAvatarComponent url={space.small_picture?.url} />
			</div>
			</div>
			<p class="pt-2 join-item flex text-lg font-semibold  text-primary">{space.name}</p>
			<div class="flex"></div>
			<p class="pt-2 join-item flex text-lg font-semibold  text-primary justify-end">{space.sub_count}</p>
		</a>	
	</div>
	<div class="flex" />
</div>