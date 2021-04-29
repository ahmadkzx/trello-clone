<template>
  <div class="board">
    <List
      :key="list.id"
      :listId="list.id"
      :listName="list.name"
      :listCards="list.cards"
      v-for="list in lists"
			:draggingListOffset.sync="draggingListOffset"
    />
    <CreateList />
  </div>
</template>

<script>
import List from '../List'
import CreateList from '../CreateList'

export default {
  name: 'Board',

  components: {
    List,
    CreateList
  },

	data: () => ({
		draggingListOffset: 0
	}),

  computed: {
    lists() {
      return this.$store.getters.lists
    }
  }
}
</script>

<style src="./index.scss" lang="scss" scoped />