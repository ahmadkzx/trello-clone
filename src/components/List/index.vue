<template>
	<div class="list-container">

		<div :class="['list', { 'dragging': isCurrentListDragging }]" draggable @dragend="handleDragEnd" @dragstart="handleDragStart">
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

		<ListDragArea v-if="isDraggingList" :listId="listId" />
	</div>
</template>

<script>
import Card from '../Card'
import AddCard from '../AddCard'
import ListDragArea from '../ListDragArea'
import preventDragAndDropEvents from '@/mixins/preventDragAndDropEvents'

export default {
  name: 'List',

	mixins: [ preventDragAndDropEvents ],

	components: {
		Card,
		AddCard,
		ListDragArea
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

		isDraggingList: {
			type: Boolean,
			default: false
		}
  },

	data: () => ({
		isCurrentListDragging: false
	}),

	mounted() {
		this.preventDragEvents(this.$el.querySelector('.list'))
	},

	methods: {
		handleDragStart(e) {
			const payload = {
				type: 'list',
				data: {
					listId: this.listId
				}
			}

			e.dataTransfer.setData('Text', JSON.stringify(payload))
			this.$emit('update:isDraggingList', true)
			this.isCurrentListDragging = true
		},

		handleDragEnd() {
			this.$emit('update:isDraggingList', false)
			this.isCurrentListDragging = false
		},
	}
}
</script>

<style src="./index.scss" lang="scss" scoped />