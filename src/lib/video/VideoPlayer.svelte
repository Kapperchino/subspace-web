<script lang="ts">
	import VideoLayout from './layouts/VideoLayout.svelte';
	// Import styles.
	import 'vidstack/player/styles/base.css';
	import 'vidstack/player/styles/default/theme.css';
	import 'vidstack/player/styles/default/layouts/video.css';
	// Register elements.
	import 'vidstack/player';
	import 'vidstack/player/ui';
	import 'vidstack/icons';
	import 'vidstack/player/layouts';
	import 'vidstack/player/ui';

	import type { MediaPlayerElement } from 'vidstack/elements';

	export let title: string;
	export let src: string;
	export let thumbnail: string;
	let player: MediaPlayerElement;
</script>

<media-player
	class="h-full w-full aspect-video bg-slate-900 text-white font-sans overflow-hidden rounded-md ring-media-focus data-[focus]:ring-4"
	{title}
	{src}
	crossorigin
	playsinline
	load="visible"
	bind:this={player}
	on:click|stopPropagation|preventDefault
>
	<media-provider>
		<media-poster
			class="absolute inset-0 block h-full w-full rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 [&>img]:h-full [&>img]:w-full [&>img]:object-cover"
			src={'https://subspace.place/cdn-cgi/image/fit=scale-down,width=650,format=auto/' + thumbnail}
			alt="Video thumbnail"
		/>
	</media-provider>
	<media-video-layout
		small-when="(width < 500)"
	/>
</media-player>
