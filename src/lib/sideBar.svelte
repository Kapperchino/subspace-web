<script lang="ts">
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

<div class="drawer-side">
	<label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay lg:hidden"></label> 
	<ul class="menu p-4 w-60 min-h-full bg-base-200">
	  <!-- Sidebar content here -->
	  <li><div class=" join">
		<div class="text-lg">
			<Home></Home>
		</div>
		<a href="/home" class="flex text-lg">Home</a>
	  </div></li>
	  <li><div class=" join">
		<div class="text-lg">
			<Search />
		</div>
		<a href="/explore" class="flex text-lg">Explore</a>
	  </div></li>
	  <li><div class=" join">
		<div class="text-lg">
			<Satellite />
		</div>
		<a href="/spaces" class="flex text-lg">Space</a>
	  </div></li>
	  <li><div class=" join">
		<div class="text-lg">
			<Bell />
		</div>
		<a href="/notifications" class="flex text-lg">Notifications</a>
	  </div></li>
  </div>
