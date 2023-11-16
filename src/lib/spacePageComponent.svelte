<script lang="ts">

	import VoteComponent from '$lib/voteComponent.svelte';
	import ImageAddFilled from '~icons/bxs/image-add';
	import VideoAdd from '~icons/bxs/video-plus';
	import LinkIcon from '~icons/bx/link';
	import { page } from '$app/stores';
	import type { TagMeta } from '../models/trending.type';
	import type { Space } from '../models/space.type';
	import SpaceCardComponent from './spaceCardComponent.svelte';

	export let spaces: Space[];
</script>

{#each spaces as space, index}
	<SpaceCardComponent {space} />
{/each}
