<script lang="ts">
	import { AppShell, Avatar } from '@skeletonlabs/skeleton';
	import { AppBar } from '@skeletonlabs/skeleton';

	import type { PageData } from './$types';
	import { textfit } from 'svelte-textfit';

	import Upvote from '~icons/bx/upvote';
	import Downvote from '~icons/bx/downvote';


	export let data: PageData;
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar>Skeleton</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">Sidebar Left</svelte:fragment>
	<svelte:fragment slot="sidebarRight">Sidebar Right</svelte:fragment>

	<div class="flex flex-row">
		<div class="basis-1/12 md:basis-1/4" />
		<div class="card col-span-3 basis-10/12 md:basis-2/4">
			{#if data.post?.topic != ''}
				<div class="p-3 pl-6 pt-4">
					<h3
						use:textfit={{
							mode: 'single',
							width: 1000,
							height: 30,
							forceSingleModeWidth: false
						}}
					>
						{data.post?.topic}
					</h3>
				</div>
			{/if}
			<div class="pl-4 pr-4 pt-2">
				<img class="rounded-md" alt="The project logo" src={data.post?.post_pictures?.at(0)?.url} />
			</div>
			<section class="p-2 pl-4">{data.post?.body}</section>
			<div class="flex flex-row pl-4 pb-2">
				<Avatar width="w-10" src={data.post?.poster_picture?.url} />
				<p class="font-semibold align-sub pl-1 pt-2">{data.post?.poster_name}</p>
				<div class="grow" />
				<div class="  btn-group   variant-ghost">
					<button> <Upvote /> </button>
					<button><Downvote/></button>
				</div>
			</div>
		</div>
		<div class="basis-1/12 md:basis-1/4" />
	</div>
</AppShell>
