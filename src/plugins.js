const { evaluate } = require('aatt');

module.exports = (on, config) => {
    on('task', {
        evaluate(options) {
            return evaluate(options);
        },
    });
};
