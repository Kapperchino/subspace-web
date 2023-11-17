<script lang="ts">
	import type { PageData } from './$types';

	import { setContext } from 'svelte';
	import { page } from '$app/stores';
	import SpaceComponent from '$lib/spaceComponent.svelte';
	import type { Post } from '../../models/post.type';
	import SideBar from '$lib/sideBar.svelte';
	import type { TagMeta } from '../../models/trending.type';
	import ExploreComponent from '$lib/exploreComponent.svelte';

	export let data: PageData;
	let tags: TagMeta[] = data.tags!;
	setContext('user', data.user);
</script>

<div class="pt-1 flex backdrop-blur bg-base-300" >
	<div class="flex grow"></div>
	<div class="flex tabs tabs-boxed tabs-md ">
		<a class="tab tab-active" href="/home">Trending</a>
		<a class="tab" href="/news">News</a>
		<a class="tab" href="/sports">Sports</a>
	</div>
	<div class="flex grow"></div>

</div>

<ExploreComponent {tags} />
