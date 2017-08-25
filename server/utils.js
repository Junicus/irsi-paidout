const getOptions = (query) => {
	const { field, order, page, perPage } = query;
	const options = {};
	if (field) options.sort = { [field]: order === 'DESC' ? -1 : 1 };
	if (perPage) options.limit = parseInt(perPage);
	if (page) options.skip = page > 0 ? ((page - 1) * perPage) : 0;
	return options
}

const logger = context => next => (args, method) => {
	console.log(method, args);
	return next(args, method).then((res) => {
		console.log(method + ' result', res)
		return res
	});
}

module.exports = {
	getOptions,
	logger
}
