<template>
  <div class="add-card">
		<button
			class="add-card__show-form btn btn-primary"
			v-if="!isShowForm"
			@click="toggleShowForm"
		>
			اضافه کردن کارت
		</button>

		<div class="add-card-form" v-if="isShowForm">
			<textarea
				v-model="cardSummary"
				class="add-card-form__input text-input text-input"
				placeholder="خلاصه کار"
			/>

			<button
				class="add-card-form__create btn btn-primary"
				@click="addCard"
			>
				اضافه
			</button>
			<button
				class="add-card-form__close btn btn-outline-primary"
				@click="toggleShowForm"
			>
				انصراف
			</button>
		</div>
  </div>
</template>

<script>
export default {
  name: 'AddCard',

	props: {
		listId: {
			required: true,
			type: [Number, String]
		}
	},

  data: () => ({
    cardSummary: '',
    isShowForm: false
  }),

  methods: {
    toggleShowForm() {
      this.isShowForm = !this.isShowForm
    },

    addCard() {
      if (!this.cardSummary.length) return

			const payload = {
				listId: this.listId,
				summary: this.cardSummary
			}
      this.$store.commit('addCard', payload)

      this.cardSummary = ''
      this.isShowForm = false
    }
  }
}
</script>

<style src="./index.scss" lang="scss" scoped />