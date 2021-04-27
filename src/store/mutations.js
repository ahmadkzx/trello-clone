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
		const draggedListIndex = getListIndex(state.lists, draggedListId)
		const targetListIndex = getListIndex(state.lists, targetListId)

		const draggedList = state.lists[draggedListIndex]
		const targetList = state.lists[targetListIndex]

		Vue.set(state.lists, targetListIndex, draggedList)
		Vue.set(state.lists, draggedListIndex, targetList)
	},
}

// HELPERS //
function getListIndex(lists, id) {
	return lists.findIndex(lst => lst.id === id)
}