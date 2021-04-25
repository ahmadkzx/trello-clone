import {
	v4 as makeUniqueId
} from 'uuid'

export default {
	createList(state, name) {
		state.lists.push({
			name,
			card: [],
			id: makeUniqueId(),
		})
	}
}