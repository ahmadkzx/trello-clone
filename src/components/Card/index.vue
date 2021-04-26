<template>
	<div class="card" draggable>
		<p class="card-summary">{{ summary }}</p>
	</div>
</template>

<script>
export default {
	name: 'Card',

	props: {
		summary: String
	}
}
</script>

<style src="./index.scss" lang="scss" scoped />