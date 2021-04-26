import {
	v4 as makeUniqueId
} from 'uuid'

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
	}
}