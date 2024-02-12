<script lang="ts">
	import UserPageComponent from '$lib/user/userPageComponent.svelte';
	import type { Writable } from 'svelte/store';
	import type { PageData } from './$types';

	import { setContext } from 'svelte';
	import type { Post } from '../../../../models/post.type';
	import { persisted } from 'svelte-persisted-store';
	import { afterNavigate } from '$app/navigation';
	import SeoComponent from '$lib/seoComponent.svelte';
	import UserCommentComponent from '$lib/user/userCommentComponent.svelte';

	export let data: PageData;
	setContext('user', data.user);

	$: comments = persisted(`user-${data.user.user_id}-comments`, data.comments);
	$: offset = persisted(`user-${data.user.user_id}-comments-offset`, 0);
	$: loaded = persisted(`user-${data.user.user_id}-comments-loaded`, false);

	afterNavigate((nav) => {
		if (nav.type == 'enter' || nav.type == 'goto') {
			$comments = data.comments;
			$offset = 0;
			$loaded = false;
		}
	});
</script>

<SeoComponent
	title="Subspace User: {data.user.display_name}"
	description={data.user.bio ??
		"Subspace is a social network for people to hang out with thier communities, there's a subspace for anything that you're intrested in, and if not, go create it!"}
	img={data.user.picture_meta?.url ?? undefined}
/>

<div class="flex flex-row mt-2">
	<div class="flex grow" />
	<div class="flex grow" />
	<div class="flex grow max-w-md md:max-w-xl">
		<div class="tabs tabs-boxed tabs-md justify-center">
			<a class="tab" href="/users/{data.user.user_id}/posts">Posts</a>
			<a class="tab tab-active" href="/users/{data.user.user_id}/comments">Comments</a>
		</div>
	</div>
	<div class="flex grow" />
</div>
<UserCommentComponent bind:loaded bind:comments bind:offset bind:posterId={data.user.user_id}   />
