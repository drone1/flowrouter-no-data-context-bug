import './bug.html'

Template.bug.helpers({
	nextId: () => parseInt(Template.currentData().id) + 1,
})
