<script lang="ts">
	import { AppShell, Avatar, FileButton, TabAnchor, TabGroup } from '@skeletonlabs/skeleton';

	import { textfit } from 'svelte-textfit';

	import VoteComponent from '$lib/voteComponent.svelte';
	import ImageAddFilled from '~icons/bxs/image-add';
	import VideoAdd from '~icons/bxs/video-plus';
	import LinkIcon from '~icons/bx/link';
	import { page } from '$app/stores';
	import type { TagMeta } from '../models/trending.type';

	export let tags: TagMeta[];
</script>

{#each tags as tag, index}
	<div class="flex flex-row pt-4">
		<div class="basis-1/12 md:basis-2/12" />
		<a class="card basis-10/12 md:basis-8/12 flex flex-row" href="">
			<p class="basis-2/6 text-lg font-semibold p-3 pl-5 text-green-400">#{tag.name}</p>
			<div class="basis-3/6" />
			<p class="text-lg font-semibold basis-1/6 p-3 pl-14 text-green-400">{tag.count}</p>
		</a>
		<div class="basis-1/12 md:basis-2/12" />
	</div>
{/each}
