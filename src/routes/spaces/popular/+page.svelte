<script lang="ts">

	import type { PageData } from './$types';

	import { setContext } from 'svelte';
	import { page } from '$app/stores';
	import type { Space } from '../../../models/space.type';
	import SpacePageComponent from '$lib/spacePageComponent.svelte';

	export let data: PageData;
	let spaces: Space[] = data.spaces!;
	setContext('user', data.user);
</script>


<SpacePageComponent {spaces} />
