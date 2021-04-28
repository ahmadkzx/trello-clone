<template>
	<div
		draggable
		@drop.stop="handleDrop"
		@dragend.stop="handleDragEnd"
		@dragstart.stop="handleStartDrag"
		:class="['card', { 'dragging': isDragging }]" 
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
			const dragData = e.dataTransfer.getData('Text')
			if (!dragData) return
			
			const dragDataObj = JSON.parse(dragData)
			if (dragData.type === 'list') return

			const payload = {
				draggedCardData: dragDataObj.data,
				targetCardData: {
					listId: this.listId,
					cardId: this.cardId
				}
			}

    	this.$store.commit('moveCard', payload)
		},

		handleStartDrag(e) {
			this.isDragging = true
			const payload = {
				type: 'card',
				data: {
					listId: this.listId,
					cardId: this.cardId
				}
			}

			e.dataTransfer.setData('Text', JSON.stringify(payload))
		},

		handleDragEnd() {
			this.isDragging = false
		}
	}
}
</script>

<style src="./index.scss" lang="scss" scoped />