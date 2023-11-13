<script lang="ts">
	import { AppShell, Avatar, FileButton, TabAnchor, TabGroup } from '@skeletonlabs/skeleton';

	import ImageAddFilled from '~icons/bxs/image-add';
	import VideoAdd from '~icons/bxs/video-plus';
	import LinkIcon from '~icons/bx/link';
	import PostCardComponent from './postCardComponent.svelte';
	import type { Post } from '../models/post.type';

	export let posts: Post[];
	export let spaceId: number;
</script>

<div class="pt-4 flex flex-row">
	<div class="basis-2 md:basis-2/12 lg:basis-1/5 xl:basis-3/12" />
	<div class="card basis-full md:basis-8/12 lg:basis-3/5 xl:basis-6/12">
		<section class="p-3 col-span-3">
			<form class="grid grid-cols-1 gap-2" method="POST" action="?/post">
				<label class="label pb-1">
					<span>Post In:</span>
					<input class="input w-52" type="search" name="search" placeholder="Search..." /></label
				>
				<label class="label">
					<textarea
						class="textarea grid-cols-[auto_1fr_auto]"
						name="Title"
						placeholder="Title (Optional)"
						rows="1"
					/>
				</label>
				<label class="label">
					<textarea
						class="textarea grid-cols-[auto_1fr_auto]"
						name="Post"
						placeholder="Post your thoughts!"
						rows="3"
					/>
				</label>
				<div class="flex-row flex">
					<FileButton name="pictures" button="btn-icon variant-filled-surface"
						><ImageAddFilled /></FileButton
					>
					<div class="pl-1" />
					<FileButton name="videos" button="btn-icon variant-filled-surface"
						><VideoAdd /></FileButton
					>
					<div class="pl-1" />
					<button type="button" class="btn-icon variant-filled-surface"><LinkIcon /></button>
				</div>
				<button type="submit" class="btn variant-filled-surface w-16 justify-self-end"
					>Post
				</button>
			</form>
		</section>
	</div>

	<div class="basis-2 md:basis-2/12 lg:basis-1/5 xl:basis-3/12" />
</div>
{#if posts != null && posts.length > 0}
	{#each posts as post, index}
		<div class="flex flex-row pt-4">
			<div class="basis-2 md:basis-2/12 lg:basis-1/5 xl:basis-3/12" />
			<div class="card basis-full md:basis-8/12 lg:basis-3/5 xl:basis-6/12">
				<PostCardComponent {post} {spaceId} />
			</div>
			<div class="basis-2 md:basis-2/12 lg:basis-1/5 xl:basis-3/12" />
		</div>
	{/each}
{:else}
	shits empty bro
{/if}
