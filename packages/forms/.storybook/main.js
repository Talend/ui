const path = require('path');
const aceRoot = require.resolve('ace-builds').replace('ace.js', '');

module.exports = {
	staticDirs: [{ from: path.join(aceRoot), to: '/' }],
};
