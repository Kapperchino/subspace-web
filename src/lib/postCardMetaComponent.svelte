<script lang="ts">
	import { AppShell, Avatar, FileButton, TabAnchor, TabGroup } from '@skeletonlabs/skeleton';

	import { textfit } from 'svelte-textfit';

	import VoteComponent from '$lib/voteComponent.svelte';
	import { VoteType, type PictureMeta, type Post, type VideoMeta } from '../models/post.type';

	const imgHeight = 500;

	export let post: Post;

	export function getDimention(meta: PictureMeta | undefined) {
		const ratio = meta!.width / meta!.height;
		const width = imgHeight * ratio;
		const height = Math.min(imgHeight, meta!.height);
		return {
			width: width,
			height: height
		};
	}

	function getVideoUrl(meta: VideoMeta): string {
		let url = '';
		let list = meta.url.split('/');
		list.pop();
		list.pop();
		list.push('/iframe');
		list.forEach((element) => {
			url += element;
			url += '/';
		});
		return url;
	}
</script>

<div class="flex flex-row pl-4 pb-2">
	<Avatar width="w-10" src={post?.poster_picture?.url} />
	<p class="font-semibold align-sub pl-1 pt-2">{post?.poster_name}</p>
	<a class="grow" href="/s/{post?.space_parent_id}/{post?.space_id}/p/{post.id}" />
	<div class="pr-3">
		<VoteComponent
			upVotes={post?.up_votes}
			downVotes={post?.down_votes}
			voteData={post?.vote}
			id={post?.id}
			voteType={VoteType.Post}
		/>
	</div>
</div>
