<script lang="ts">
	import type { PageData } from './$types';

	import { setContext } from 'svelte';
	import SpaceComponent from '$lib/spaceComponent.svelte';
	import UserPostsComponent from '$lib/userPostsComponent.svelte';

	export let data: PageData;
	setContext('user', data.user);
</script>

<div class="flex flex-row mt-2">
	<div class="flex grow" />
	<div class="flex grow" />
	<div class="flex grow max-w-md md:max-w-xl">
		<div class="tabs tabs-boxed tabs-md justify-center">
			<a class="tab tab-active" href="/users/{data.user.user_id}/posts">Posts</a>
			<a class="tab" href="/users/{data.user.user_id}/comments">Comments</a>
		</div>
	</div>
	<div class="flex grow" />
</div>
<UserPostsComponent posts={data.posts} userId={data.user.user_id} />
