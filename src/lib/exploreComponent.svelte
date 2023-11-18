<script lang="ts">
	import VoteComponent from '$lib/voteComponent.svelte';
	import ImageAddFilled from '~icons/bxs/image-add';
	import VideoAdd from '~icons/bxs/video-plus';
	import LinkIcon from '~icons/bx/link';
	import { page } from '$app/stores';
	import type { TagMeta } from '../models/trending.type';

	export let tags: TagMeta[];
</script>

{#if tags != null}
	{#each tags as tag, index}
		<div class="flex flex-row pt-4">
			<div class="basis-1/12 md:basis-2/12" />
			<a class="card card-compact basis-10/12 md:basis-8/12 shadow-lg" href="">
				<div class="card-body flex flex-row">
					<p class="flex text-lg font-semibold text-primary">#{tag.name}</p>
					<div class="grow" />
					<p class="flex text-lg font-semibold  text-primary justify-end">{tag.count}</p>
				</div>
			</a>
			<div class="basis-1/12 md:basis-2/12" />
		</div>
	{/each}
{/if}
