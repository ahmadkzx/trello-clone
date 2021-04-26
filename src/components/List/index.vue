<template>
  <div class="list" draggable @drop="handleDrop" @dragstart="handleStartDrag">
    <div class="list-header">
      <span class="list-header__title">{{ name }}</span>
    </div>

		<div class="list-cards" v-if="cards.length">
			<Card v-for="(card, index) in cards" :key="`${listId}-${index}`" :summary="card.summary" />
		</div>

		<AddCard :listId="listId" />
  </div>
</template>

<script>
import Card from '../Card'
import AddCard from '../AddCard'

export default {
  name: 'List',

	components: {
		Card,
		AddCard
	},

  props: {
    name: String,
    cards: Array,
    listId: [Number, String]
  },

	mounted() {
		const events = [ 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop' ]
		events.forEach(evt => this.$el.addEventListener(evt, e => {
			e.preventDefault()
  		e.stopPropagation()
		}))
	},

	methods: {
		handleDrop(e) {
			const draggedListId = e.dataTransfer.getData("Text")
			if (!draggedListId) return

    	this.$store.commit('moveList', { from: draggedListId, to: this.listId })
		},

		handleStartDrag(e) {
			e.dataTransfer.setData('Text', this.listId);
		}
	}
}
</script>

<style src="./index.scss" lang="scss" scoped />