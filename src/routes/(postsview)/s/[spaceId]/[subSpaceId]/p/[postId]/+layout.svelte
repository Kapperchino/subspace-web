<script lang="ts">
	import AvatarComponent from '$lib/avatarComponent.svelte';
	import ShellComponent from '$lib/shellComponent.svelte';
	import SortPostComponent from '$lib/sortPostComponent.svelte';

	export let data: import('./$types').LayoutData;
</script>

<ShellComponent>
	<svelte:fragment slot="navbar">
		<a class="flex flex-col mt-auto hover:cursor-pointer" href="/users/{data.user?.user_id}">
			<div class="avatar">
				<div class="w-10 rounded-full">
					<AvatarComponent url={data.user?.picture_meta?.url} userId={data.user?.user_id} />
				</div>
			</div>
		</a>
		<div class="flex-1" />
		<div class="md:flex-1" />
		<div class="flex backdrop-blur bg-base-300/60 ml-3 rounded-lg">
			<div class="flex grow" />
			{data.post?.space_name}
			<div class="flex grow" />
		</div>
		<div class="flex grow" />
		<SortPostComponent />
	</svelte:fragment>
	<svelte:fragment slot="content">
		<div><slot /></div>
	</svelte:fragment>
</ShellComponent>
