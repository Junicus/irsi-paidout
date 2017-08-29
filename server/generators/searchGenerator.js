var compose = require('./generator-compose');

var middleware = [
    function (context, next) {
        let { filter } = context.query;
        if (filter) {
            filter = JSON.parse(filter);
            context.search.filter = filter;
        }
        next();
    }
];

module.exports = {
    searchGenerator: compose(middleware)
}