const path = require('path');
const MODES = ['json', 'python', 'sql'];
const THEMES = ['chrome'];

module.exports = MODES.map(mode => ({
	mode: 'production',
	entry: `brace/mode/${mode}`,
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: `mode-${mode}.js`,
	},
}))
	.concat(
		MODES.map(snippets => ({
			mode: 'production',
			entry: `brace/snippets/${snippets}`,
			output: {
				path: path.resolve(__dirname, 'dist'),
				filename: `snippets-${snippets}.js`,
			},
		})),
	)
	.concat(
		THEMES.map(theme => ({
			mode: 'production',
			entry: `brace/theme/${theme}`,
			output: {
				path: path.resolve(__dirname, 'dist'),
				filename: `theme-${theme}.js`,
			},
		})),
	);
