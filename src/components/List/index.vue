<template>
	<div
		:class="['list-container', {'dragOver': isDragOver }]"
		draggable
		@drop="handleDrop"
		@dragend="handleDragEnd"
		@dragstart="handleDragStart"
	>
		<div :class="['list', { 'dragging': isDragging }]">
			<div class="list-header">
				<span class="list-header__title">{{ listName }}</span>
			</div>

			<div class="list-cards" v-if="listCards.length">
				<Card
					:listId="listId"
					:cardId="card.id"
					:key="`${listId}-${index}`"
					:cardSummary="card.summary"
					v-for="(card, index) in listCards"
				/>
			</div>

			<AddCard :listId="listId" />
		</div>
	</div>
</template>

<script>
import Card from '../Card'
import AddCard from '../AddCard'
import preventDragAndDropEvents from '@/mixins/preventDragAndDropEvents'

export default {
  name: 'List',

	mixins: [ preventDragAndDropEvents ],

	components: {
		Card,
		AddCard
	},

  props: {
    listName: {
			type: String,
			required: true
		},
		
    listCards: {
			type: Array,
			required: true
		},

    listId: {
			type: [Number, String],
			required: true
		},
  },

	data: () => ({
		isDragging: false,
	}),

	methods: {
		handleDragStart(e) {
			this.isDragging = true
			const payload = {
				type: 'list',
				data: {
					listId: this.listId
				}
			}

			e.dataTransfer.setData('Text', JSON.stringify(payload))
		},

		handleDragEnd() {
			this.isDragging = false
		},

		handleDrop(e) {
			const dragData = this.getDragData(e.dataTransfer)
			if (!dragData || dragData?.data.listId === this.listId) return

    	this.$store.commit('moveList', { draggedListId: dragData.data.listId, targetListId: this.listId })
		},

		getDragData(dataTransfer) {
			const dragData = dataTransfer.getData('Text')
			if (!dragData) return
			
			const dragDataObj = JSON.parse(dragData)
			if (dragData.type === 'card') return null

			return dragDataObj
		},
	}
}
</script>

<style src="./index.scss" lang="scss" scoped />