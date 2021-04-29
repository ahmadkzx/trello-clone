const preventDragAndDropEvents = {
	methods: {
		preventDragEvents(el) {
			const events = [ 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop' ]
			events.forEach(evt => el.addEventListener(evt, e => {
				e.preventDefault()
				e.stopPropagation()
			}))
		}
	}
}

export default preventDragAndDropEvents