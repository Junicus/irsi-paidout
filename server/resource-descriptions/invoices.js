module.exports = {
	urlTemplates: {
		"self": "http://localhost:3001/invoices/{id}",
		"relationship": "http://localhost:3001/invoices/{ownerId}/relationships/{path}"
	},

	beforeSave: function (resource, req, res, superFn) {
		return resource;
	},

	beforeRender: function (resource, req, res, superFn) {
		return resource;
	}
}
