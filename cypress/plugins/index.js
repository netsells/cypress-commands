const { loadAccessibilityPlugins } = require('../../dist/index.js');

module.exports = (on, config) => {
	loadAccessibilityPlugins(on, config);
}
