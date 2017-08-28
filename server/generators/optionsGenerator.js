var compose = require('./generator-compose');

var middleware = [
    function (context, next) {
        let { sort } = context.query;
        if (sort) {
            sort = JSON.parse(sort);
            context.options.sort = { [sort[0]]: sort[1] === 'DESC' ? -1 : 1 };
        }
        next();
    },
    function (context, next) {
        let { range } = context.query;
        if (range) {
            range = JSON.parse(range);
            const limit = range[1] + 1 - range[0];
            context.options.limit = limit;
            context.options.skip = range[0];
        }
        next();
    }
];

module.exports = {
    optionsGenerator: compose(middleware)
}