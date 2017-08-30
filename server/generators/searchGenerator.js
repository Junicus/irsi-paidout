var compose = require('./generator-compose');

var middleware = [
	function (context, next) {

		let { filter } = context.query;
		if (filter) {
			let { search } = context;
			filter = JSON.parse(filter);
			console.log('Filter Before: ', filter);
			const keys = Object.keys(filter);
			console.log(keys);
			filter = keys.reduce((a, key) => {
				console.log('filter[key]', filter[key]);
				if (Array.isArray(filter[key])) {
					return Object.assign(a, { [key]: { $in: filter[key] } });
				} else {
					console.log('A: ', a);
					return Object.assign(a, { [key]: filter[key] });
				}
			}, {});
			console.log('Filter after: ', filter);
			Object.assign(search, filter);
		}
		next();
	}
];

module.exports = {
	searchGenerator: compose(middleware)
}
