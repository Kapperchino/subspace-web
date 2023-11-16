<script lang="ts">
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

<PostingComponent></PostingComponent>
<SpaceComponent {posts} spaceId={1} />
