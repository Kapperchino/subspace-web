<script lang="ts">
	import { AppShell, Avatar, FileButton, TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
	import type { Space } from '../models/space.type';

	export let space: Space;
</script>

<div class="flex flex-row pt-4">
	<div class="basis-1/12 md:basis-2/12" />
	<a class="card basis-10/12 md:basis-8/12 flex pl-2 pt-2 pb-2" href="">
		<Avatar src={space.small_picture?.url ?? ''} width="w-14" rounded="rounded-full" />
		<p class="text-lg font-semibold p-3 text-green-400">{space.name}</p>
		<div class="grow"></div>
		<p class="text-lg font-semibold p-3 text-green-400">{space.sub_count}</p>
	</a>
	<div class="basis-1/12 md:basis-2/12" />
</div>
