<script lang="ts">
	import { AppShell, TabAnchor, TabGroup } from '@skeletonlabs/skeleton';

	import type { PageData } from './$types';

	import { setContext } from 'svelte';
	import { page } from '$app/stores';
	import SpaceComponent from '$lib/spaceComponent.svelte';
	import type { Post } from '../../../../models/post.type';

	export let data: PageData;
	let posts: Post[] = data.posts!;
	let spaceId :number = data.spaceId;
	setContext('user', data.user);
</script>

<TabGroup justify="justify-center">
	<TabAnchor href="/s/1/1" selected={$page.url.pathname === '/s/1/1'}>Posts</TabAnchor>
	<TabAnchor href="/following" selected={$page.url.pathname === '/following'}>About</TabAnchor>
</TabGroup>
<SpaceComponent {posts} {spaceId}/>
