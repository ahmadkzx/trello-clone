<template>
  <div class="list">
    <div class="list-header">
      <span class="list-header__title">{{ name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'List',

  props: {
    name: String,
    cards: Array,
    listId: [Number, String]
  }
}
</script>

<style src="./index.scss" lang="scss" scoped />