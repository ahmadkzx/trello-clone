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
			const dragData = e.dataTransfer.getData('Text')
			if (!dragData) return
			
			const dragDataObj = JSON.parse(dragData)
			if (dragData.type === 'card') return

    	this.$store.commit('moveList', { draggedListId: dragDataObj.data.listId, targetListId: this.listId })
		},

		handleStartDrag(e) {
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
		}
	}
}
</script>

<style src="./index.scss" lang="scss" scoped />