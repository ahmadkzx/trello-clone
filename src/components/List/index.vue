<template>
  <div
		:class="['list', { 'dragging': isDragging }]"
		draggable
		@drop="handleDrop"
		@dragend="handleDragEnd"
		@dragstart="handleStartDrag"
	>
    <div class="list-header">
      <span class="list-header__title">{{ listName }}</span>
    </div>

		<div class="list-listCards" v-if="listCards.length">
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
		}
  },

	data: () => ({
		isDragging: false
	}),

	methods: {
		handleDrop(e) {
			const draggedListId = e.dataTransfer.getData('Text')
			if (!draggedListId) return

    	this.$store.commit('moveList', { draggedListId, targetListId: this.listId })
		},

		handleStartDrag(e) {
			this.isDragging = true
			e.dataTransfer.setData('Text', this.listId)
		},

		handleDragEnd() {
			this.isDragging = false
		}
	}
}
</script>

<style src="./index.scss" lang="scss" scoped />