const preventDragAndDropEvents = {
	methods: {
		preventDragEvents(el) {
			console.log(el)
			const events = [ 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop' ]
			events.forEach(evt => el.addEventListener(evt, e => {
				e.preventDefault()
				e.stopPropagation()
			}))
		}
	}
}

export default preventDragAndDropEvents