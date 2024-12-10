import { FlowRouter } from 'meteor/ostrio:flow-router-extra'

import '/imports/client/layouts/my-layout.js'
import '/imports/client/views/bug.js'

Template.registerHelper('assert', function(exp, msg) {
	if (exp) return
	console.error(msg)
	debugger
})

FlowRouter.route('/', {
	action() {
		FlowRouter.go('/1')
	}
})

FlowRouter.route('/:id', {
	name: 'bug',
	action(params, query, data) {
		// Clicking the link should cause the global assert helper above to fire, rather than render the page with
		// fresh data. Things worked in Meteor 2.16, but broke in 3.0.3, and are still broken in 3.0.4, and 3.1.
		const route = this
		data = {
			id: params?.id,
			dynTemplate: 'bug'
		}

		const appBodyTemplate = Template.my_layout
		route.render(appBodyTemplate, 'bug', data)

		/*
		// Blaze only
		import '/client/my-layout.js'
		const appBodyTemplate = Template.app
		Blaze.renderWithData(Template.app, data, document.body)
		 */
	}
})
