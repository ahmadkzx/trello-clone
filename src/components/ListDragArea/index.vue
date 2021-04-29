<template>
	<div class="area" @drop="handleDrop" @dragenter="handleDragEnter" @dragleave="resetListElStyle"></div>
</template>

<script>
import preventDragAndDropEvents from '@/mixins/preventDragAndDropEvents'

export default {
	name: 'ListDragArea',

	mixins: [ preventDragAndDropEvents ],

	props: {
    listId: {
			type: [Number, String],
			required: true
		},

		drggingListOffset: {
			default: 0,
			type: Number
		}
  },

	mounted() {
		this.preventDragEvents(this.$el)
	},

	methods: {
		handleDrop(e) {
			const dragData = this.getDraggedListData(e.dataTransfer)
			if (!dragData || dragData?.data.listId === this.listId) return

    	this.$store.commit('moveList', { draggedListId: dragData.data.listId, targetListId: this.listId })
			this.resetListElStyle(/*smooth*/ false)
		},

		handleDragEnter() {
			const listContainerEl = this.$el.parentNode
			const listEl = listContainerEl.querySelector('.list')

			const position = this.drggingListOffset - listContainerEl.offsetLeft
			listEl.classList.add('animate')
			listEl.style.position = 'absolute'
			listEl.style.left = `${position}px`
		},

		resetListElStyle(smooth = true) {
			const listEl = this.$el.parentNode.querySelector('.list')

			if (!smooth) listEl.classList.remove('animate')
			listEl.style.position = 'relative'
			listEl.style.left = `0`
		},

		getDraggedListData(dataTransfer) {
			const dragData = dataTransfer.getData('Text')
			if (!dragData) return
			
			const dragDataObj = JSON.parse(dragData)
			if (dragData.type === 'card') return null

			return dragDataObj
		},
	}
}
</script>

<style src="./index.scss" lang="scss" scoped />