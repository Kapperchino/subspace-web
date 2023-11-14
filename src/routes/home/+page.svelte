<script lang="ts">
	import {
		TabAnchor,
		TabGroup,
	} from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';

	import { setContext } from 'svelte';
	import { page } from '$app/stores';
	import SpaceComponent from '$lib/spaceComponent.svelte';
	import type { Post } from '../../models/post.type';
	import PostingComponent from '$lib/postingComponent.svelte';
	export let data: PageData;
	let posts: Post[] = data.posts!;

	setContext('user', data.user);
</script>

<TabGroup justify="justify-center">
	<TabAnchor href="/home" selected={$page.url.pathname === '/home'}>For You</TabAnchor>
	<TabAnchor href="/following" selected={$page.url.pathname === '/following'}>Following</TabAnchor>
</TabGroup>

<PostingComponent></PostingComponent>
<SpaceComponent {posts} spaceId={1} />
