<template>
  <div class="create-list">
    <transition name="fade">
      <button
        class="create-list__show-form btn btn-glass"
        v-if="!isShowForm"
        @click="toggleShowForm"
      >
        ساخت لیست جدید
      </button>
    </transition>

    <transition name="fade">
      <div class="create-list-form" v-if="isShowForm">
        <input
          type="text"
          v-model="newListName"
          class="create-list-form__input text-input text-input"
          placeholder="نام لیست"
        />

        <button
          class="create-list-form__create btn btn-primary"
          @click="createList"
        >
          ساخت
        </button>
        <button
          class="create-list-form__close btn btn-outline-primary"
          @click="toggleShowForm"
        >
          انصراف
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'CreateList',

  data: () => ({
    newListName: '',
    isShowForm: false
  }),

  methods: {
    toggleShowForm() {
      this.isShowForm = !this.isShowForm
    },

    createList() {
      if (!this.newListName.length) return

      this.$store.commit('createList', /*listName*/ this.newListName)

      this.newListName = ''
      this.isShowForm = false
    }
  }
}
</script>

<style src="./index.scss" lang="scss" scoped />