<template>
	<div class="area" @drop="handleDrop"></div>
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