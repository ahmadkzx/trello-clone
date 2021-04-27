<template>
	<div
		draggable
		class="card" 
		@drop.stop="handleDrop"
		@dragend.stop="handleDragEnd"
		@dragstart.stop="handleStartDrag"
	>
		<p class="card-summary">{{ cardSummary }}</p>
	</div>
</template>

<script>
import preventDragAndDropEvents from '@/mixins/preventDragAndDropEvents'

export default {
	name: 'Card',

	mixins: [ preventDragAndDropEvents ],

	props: {
		listId: {
			required: true,
			type: [Number, String]
		},

		cardSummary: {
			type: String,
			required: false
		},

		cardId: {
			required: true,
			type: [Number, String]
		},
	},

	data: () => ({
		isDragging: false
	}),

	methods: {
		handleDrop(e) {
			const draggedListId = e.dataTransfer.getData('Text')
			console.log(JSON.parse(draggedListId))

			if (!draggedListId) return

    	// this.$store.commit('moveList', { from: draggedListId, to: this.listId })
		},

		handleStartDrag(e) {
			this.isDragging = true
			const payload = { listId: this.listId, cardId: this.cardId }
			e.dataTransfer.setData('Text', JSON.stringify(payload))
		},

		handleDragEnd() {
			this.isDragging = false
		}
	}
}
</script>

<style src="./index.scss" lang="scss" scoped />