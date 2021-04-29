<template>
	<div
		:class="['list-container', {'dragOver': isDragOver }]"
		draggable
		@drop="handleDrop"
		@dragend="handleDragEnd"
		@dragenter="handleDragEnter"
		@dragleave="handleDragLeave"
		@dragstart="handleStartDrag"
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

		draggingListOffset: {
			defautl: 0,
			type: Number
		}
  },

	data: () => ({
		isDragging: false,
		isDragOver: false,
	}),

	methods: {
		handleDrop(e) {
			const dragData = this.getDragData(e.dataTransfer)
			if (!dragData || dragData?.data.listId === this.listId) return

    	this.$store.commit('moveList', { draggedListId: dragData.data.listId, targetListId: this.listId })
			this.isDragOver = false
			this.changeElementPostion('0')
			this.$emit('update:draggingListOffset', 0)
		},

		handleStartDrag(e) {
			this.isDragging = true
			const payload = {
				type: 'list',
				data: {
					listId: this.listId,
				}
			}

			e.dataTransfer.setData('Text', JSON.stringify(payload))
			this.$emit('update:draggingListOffset', this.$el.offsetLeft)
		},

		handleDragEnd() {
			this.isDragging = false
		},

		handleDragEnter(e) {
			if (!this.draggingListOffset || this.isDragging) return

			this.isDragOver = true
			const position = (this.$el.offsetLeft - this.draggingListOffset) * -1
			this.changeElementPostion(`${position}px`)
			
		},

		handleDragLeave(e) {
			if (!e.target.classList.contains('list-container') || this.isDragging) return
			this.changeElementPostion('0')
			this.isDragOver = false
		},

		getDragData(dataTransfer) {
			const dragData = dataTransfer.getData('Text')
			if (!dragData) return
			
			const dragDataObj = JSON.parse(dragData)
			if (dragData.type === 'card') return null

			return dragDataObj
		},

		changeElementPostion(position) {
			const targetEl = this.$el.querySelector('.list')
			targetEl.style.left = position
		}
	}
}
</script>

<style src="./index.scss" lang="scss" scoped />