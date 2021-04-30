<template>
	<div
		:draggable="!isEditing"
		@drop.stop="handleDrop"
		@dragend.stop="handleDragEnd"
		@dragstart.stop="handleStartDrag"
		:class="['card', { 'dragging': isDragging }]" 
	>
		<p class="card-summary" v-if="!isEditing" @click="toggleEditForm">{{ cardSummary }}</p>

		<div class="card-edit-form" v-else>
			<textarea
				v-model="editedCardSummary"
				class="card-edit-form__input text-input text-input"
				placeholder="خلاصه کار"
			/>

			<button
				class="card-edit-form__create btn btn-primary"
				@click="applyEdit"
			>
				تایید
			</button>
			<button
				class="card-edit-form__close btn btn-glass"
				@click="toggleEditForm"
			>
				انصراف
			</button>
		</div>
	</div>
</template>

<script>
import preventDragAndDropEvents from '@/mixins/preventDragAndDropEvents'

export default {
	name: 'Card',

	mixins: [ preventDragAndDropEvents ],

	props: {
		listId: {
			required: true,
			type: [Number, String]
		},

		cardSummary: {
			type: String,
			required: false
		},

		cardId: {
			required: true,
			type: [Number, String]
		},

		isEditingCard: {
			type: Boolean,
			default: false
		}
	},

	data: () => ({
		isEditing: false,
		isDragging: false,
		editedCardSummary: ''
	}),

	mounted() {
		this.preventDragEvents(this.$el)
	},

	methods: {
		async handleDrop(e) {
			if (this.isEditing) return

			const dragData = await this.getDragData(e.dataTransfer)
			if (!dragData) return

			const payload = {
				draggedCardData: dragData.data,
				targetCardData: {
					listId: this.listId,
					cardId: this.cardId
				}
			}

    	this.$store.commit('moveCard', payload)
		},

		handleStartDrag(e) {
			this.isDragging = true
			const payload = {
				type: 'card',
				data: {
					listId: this.listId,
					cardId: this.cardId
				}
			}

			e.dataTransfer.setData('Text', JSON.stringify(payload))
		},

		handleDragEnd() {
			this.isDragging = false
		},

		getDragData(dataTransfer) {
			const dragData = dataTransfer.getData('Text')
			if (!dragData) return

			const dragDataObj = JSON.parse(dragData)
			if (dragData.type === 'list') return null
		
			return dragDataObj
		},

		applyEdit() {
			const variables = {
				cardId: this.cardId,
				listId: this.listId,
				data: {
					summary: this.editedCardSummary
				}
			}
			this.$store.commit('editCard', variables)
			this.toggleEditForm()
		},

		toggleEditForm() {
			this.isEditing = !this.isEditing
			this.$emit('update:isEditingCard', !this.isEditingCard)
		}
	},

	watch: {
		cardSummary:{
			immediate: true,
			handler: function (val) {
				this.editedCardSummary = val
			}
		}
	}
}
</script>

<style src="./index.scss" lang="scss" scoped />