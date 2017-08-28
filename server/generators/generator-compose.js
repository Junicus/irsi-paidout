const compose = (funcs) => {
    return function (context, superNext) {
        var executionIndex = 0;

        var next = function () {
            executionIndex++;
            if (executionIndex >= funcs.length) {
                if (superNext) {
                    return superNext()
                } else {
                    return null;
                }
            } else {
                return funcs[executionIndex](context, next);
            }
        }

        return funcs[0](context, next);
    }
}

module.exports = compose;