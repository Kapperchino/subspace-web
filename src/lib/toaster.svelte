<script lang="ts" context="module">
	export type ToastData = {
		title: string;
		description: string;
		type: 'success' | 'info' | 'warning' | 'error';
	};

	const {
		elements: { content, title, description, close },
		helpers,
		states: { toasts },
		actions: { portal }
	} = createToaster<ToastData>();

	export let addToast = helpers.addToast;
</script>

<script lang="ts">
	import { createToaster, melt } from '@melt-ui/svelte';
</script>

<div use:portal>
	<div class="toast toast-center z-50" use:portal>
		{#each $toasts as { id, data } (id)}
			<div use:melt={$content(id)}>
				<div class="relative alert alert-{data.type}">
					<div>
						<!-- <h3 use:melt={$title(id)} class="flex items-center gap-2 font-semibold">
							{data.title}
							<span class="rounded-full square-1.5 {data.color}" />
						</h3> -->
						<div use:melt={$description(id)}>
							{data.description}
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
