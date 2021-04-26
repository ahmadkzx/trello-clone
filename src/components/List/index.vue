<template>
  <div class="list">
    <div class="list-header">
      <span class="list-header__title">{{ name }}</span>
    </div>

		<div class="list-cards" v-if="cards.length">
			<Card v-for="(card, index) in cards" :key="`${listId}-${index}`" :summary="card.summary" />
		</div>

		<AddCard :listId="listId" />
  </div>
</template>

<script>
import Card from '../Card'
import AddCard from '../AddCard'

export default {
  name: 'List',

	components: {
		Card,
		AddCard
	},

  props: {
    name: String,
    cards: Array,
    listId: [Number, String]
  }
}
</script>

<style src="./index.scss" lang="scss" scoped />