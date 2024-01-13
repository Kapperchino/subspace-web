<script lang="ts">

</script>

<div class=" shrink-0 px-2">
	<form method="POST" action="/spaces?/create">
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
