const preventDragAndDropEvents = {
	mounted() {
		this.setEventListeners()
	},

	methods: {
		setEventListeners() {
			const events = [ 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop' ]
			events.forEach(evt => this.$el.addEventListener(evt, e => {
				e.preventDefault()
				e.stopPropagation()
			}))
		}
	}
}

export default preventDragAndDropEvents