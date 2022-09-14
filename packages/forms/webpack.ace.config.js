// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const MODES = ['json', 'python', 'sql'];
const THEMES = ['chrome'];

// Modes
module.exports = MODES.map(mode => ({
	mode: 'production',
	entry: `ace-builds/src-min-noconflict/mode-${mode}`,
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: `mode-${mode}.js`,
	},
}))
	// Snippets
	.concat(
		MODES.map(snippets => ({
			mode: 'production',
			entry: `ace-builds/src-min-noconflict/snippets/${snippets}`,
			output: {
				path: path.resolve(__dirname, 'dist'),
				filename: `snippets-${snippets}.js`,
			},
		})),
	)
	// Themes
	.concat(
		THEMES.map(theme => ({
			mode: 'production',
			entry: `ace-builds/src-min-noconflict/theme-${theme}`,
			output: {
				path: path.resolve(__dirname, 'dist'),
				filename: `theme-${theme}.js`,
			},
		})),
	);
