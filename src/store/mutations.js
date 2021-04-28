import Vue from 'vue'
import { v4 as makeUniqueId } from 'uuid'

export default {
	createList(state, name) {
		state.lists.push({
			name,
			cards: [],
			id: makeUniqueId(),
		})
	},

	addCard(state, { listId, summary }) {
		let list = state.lists.find(list => list.id === listId)
		list.cards.push({
			summary,
			id: makeUniqueId()
		})
	},

	moveList(state, { draggedListId, targetListId }) {
		const draggedListIndex = state.lists.findIndex(lst => lst.id === draggedListId)
		const targetListIndex = state.lists.findIndex(lst => lst.id === targetListId)

		const draggedList = state.lists[draggedListIndex]
		const targetList = state.lists[targetListIndex]

		Vue.set(state.lists, targetListIndex, draggedList)
		Vue.set(state.lists, draggedListIndex, targetList)
	},

	moveCard(state, { draggedCardData, targetCardData }) {

		const draggedCardListIndex = state.lists.findIndex(lst => lst.id === draggedCardData.listId)
		const targetCardListIndex = state.lists.findIndex(lst => lst.id === targetCardData.listId)

		const draggedCardList = state.lists[draggedCardListIndex]
		const targetCardList = state.lists[targetCardListIndex]

		const draggedCardIndex = draggedCardList.cards.findIndex(card => card.id === draggedCardData.cardId)
		const targetCardIndex = targetCardList.cards.findIndex(card => card.id === targetCardData.cardId)

		const draggedCard = draggedCardList.cards[draggedCardIndex]
		const targetCard = targetCardList.cards[targetCardIndex]
		
		Vue.set(state.lists[targetCardListIndex].cards, targetCardIndex, draggedCard)
		Vue.set(state.lists[draggedCardListIndex].cards, draggedCardIndex, targetCard)

	}
}