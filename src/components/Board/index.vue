<template>
  <div class="board">
    <List
      :key="list.id"
      :listId="list.id"
      :name="list.name"
      :cards="list.cards"
      v-for="list in lists"
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

  computed: {
    lists() {
      return this.$store.getters.lists
    }
  }
}
</script>

<style src="./index.scss" lang="scss" scoped />