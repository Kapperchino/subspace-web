<script lang="ts">

	export let time: string;

	function getTimeDiff(later: string): string {
		var now = new Date().getTime();
		var diffEpoch = now - new Date(later).getTime();
		const diff = new Date(diffEpoch).getTime();
		const minutes = Math.floor(diff / 1000 / 60);
		const hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);
		if (days >= 365) {
			const years = days / 365;
			if (years == 1) {
				return `${years} year`;
			}
			return `${years} year`;
		}
		if (days >= 1) {
			if (days == 1) {
				return `${days} day`;
			}
			return `${days} days`;
		}
		if (hours >= 1) {
			if (hours == 1) {
				return `${hours} hour`;
			}
			return `${hours} hours`;
		}

		if (minutes >= 1) {
			if (minutes == 1) {
				return `${minutes} minute`;
			}
			return `${minutes} minutes`;
		}

		const seconds = Math.floor(diff / 1000);
		return `${seconds} seconds`;
	}
</script>

<div class="flex">
	{getTimeDiff(time)} ago
</div>
