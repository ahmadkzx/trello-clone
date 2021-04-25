<template>
  <div class="board">
    <CreateList />
  </div>
</template>

<script>
import CreateList from '../CreateList'

export default {
  name: 'Board',

  components: {
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