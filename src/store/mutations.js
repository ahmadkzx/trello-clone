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
}