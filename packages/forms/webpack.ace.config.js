const path = require('path');
const MODES = ['json', 'python', 'sql'];

module.exports = MODES.map(mode => {
	return {
		mode: 'production',
		entry: `brace/mode/${mode}`,
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: `mode-${mode}.js`,
		},
	};
});
