<script lang="ts">
	import VoteComponent from '$lib/voteComponent.svelte';
	import ImageAddFilled from '~icons/bxs/image-add';
	import VideoAdd from '~icons/bxs/video-plus';
	import LinkIcon from '~icons/bx/link';
	import { page } from '$app/stores';
	import type { TagMeta } from '../models/trending.type';
	import type { Space } from '../models/space.type';
	import SpaceCardComponent from './spaceCardComponent.svelte';
</script>

<div class=" shrink-0 px-2">
	<form method="POST" action="/logout?/logout">
		<div class="flex flex-col">
			<label for="name" class="label">
				<span class="label-text">Space Name</span>
			</label>
			<input name="name" id="name" placeholder="name" class="input input-bordered" required />
		</div>
		<div class="form-control mt-5">
			<button class="btn btn-secondary" type="submit">Create new space</button>
		</div>
	</form>
</div>
