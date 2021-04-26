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
		list.cards.push({ summary })
	},

	moveList(state, { from, to }) { /*from and to is list Ids*/
		const toIndex = state.lists.findIndex(lst => lst.id === to)
		const fromIndex = state.lists.findIndex(lst => lst.id === from)

		const draggedList = state.lists[fromIndex]
		const droppedAreaList = state.lists[toIndex]

		Vue.set(state.lists, toIndex, draggedList)
		Vue.set(state.lists, fromIndex, droppedAreaList)

	}
}