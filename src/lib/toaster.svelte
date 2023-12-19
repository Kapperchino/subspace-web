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
				{#if data.type == 'error'}
					<div class="relative alert alert-error">
						<div>
							<div use:melt={$description(id)}>
								{data.description}
							</div>
						</div>
					</div>
				{/if}
				{#if data.type == 'warning'}
					<div class="relative alert alert-warning">
						<div>
							<div use:melt={$description(id)}>
								{data.description}
							</div>
						</div>
					</div>
				{/if}
				{#if data.type == 'info'}
					<div class="relative alert alert-info">
						<div>
							<div use:melt={$description(id)}>
								{data.description}
							</div>
						</div>
					</div>
				{/if}
				{#if data.type == 'success'}
					<div class="relative alert alert-success">
						<div>
							<div use:melt={$description(id)}>
								{data.description}
							</div>
						</div>
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>
