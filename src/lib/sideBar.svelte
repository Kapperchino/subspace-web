<!-- <script lang="ts">
	import type { Vote, VoteType } from '../models/post.type';

	import Home from '~icons/bx/home';
	import Search from '~icons/bx/search';
	import Satellite from '~icons/material-symbols/satellite-alt-outline-sharp';
	import Bell from '~icons/material-symbols/notifications';
	import DownvoteFilled from '~icons/bxs/downvote';
	import { getContext, onMount } from 'svelte';
	import type { UserMeta } from '../models/signup.type';
	import { getVotes, vote } from '../service/voteService';
	import { page } from '$app/stores';
</script>

<AppRail width="w-0 md:w-14 lg:w-64 sm:w-0">
	<AppRailAnchor
		aspectRatio="h-12"
		href="/home"
		regionLead="flex justify-items-start items-start"
		selected={$page.url.pathname === '/home' || $page.url.pathname === '/following'}
	>
		<div class="pl-3 flex flex-row">
			<Home />
			<div class="pl-1" />
			<p class="hidden lg:flex lg:text-lg">Home</p>
		</div>
	</AppRailAnchor>
	<AppRailAnchor aspectRatio="h-12" href="/explore" selected={$page.url.pathname === '/explore'}>
		<div class="pl-3 flex flex-row">
			<Search />
			<div class="pl-1" />
			<p class="hidden lg:flex lg:text-lg">Explore</p>
		</div>
	</AppRailAnchor>
	<AppRailAnchor
		aspectRatio="h-12"
		href="/spaces"
		selected={$page.url.pathname.startsWith('/spaces')}
	>
		<div class="pl-3 flex flex-row">
			<Satellite />
			<div class="pl-1" />
			<p class="hidden lg:flex lg:text-lg">Space</p>
		</div></AppRailAnchor
	>
	<AppRailAnchor aspectRatio="h-12" href="/notifications" selected={$page.url.pathname === '/notifications'}>
		<div class="pl-3 flex flex-row">
			<Bell />
			<div class="pl-1" />
			<p class="hidden lg:flex lg:text-lg">Notifications</p>
		</div></AppRailAnchor
	>
</AppRail>

<style>
	/*
        Cannot target component in CSS, target SVG
        instead using Svelte's :global() function
    */
	div :global(svg) {
		font-size: 24px;
		line-height: 1em;
	}

	/*
        Must use :global() because Svelte cannot assign style to a
        component by class name, it can only work with standard HTML tags.
    */
	div :global(.big-icon) {
		font-size: 72px;
	}
</style> -->
