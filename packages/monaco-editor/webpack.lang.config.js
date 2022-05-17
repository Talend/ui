const path = require('path');
const fs = require('fs');
const metadata = require('monaco-editor/esm/metadata');
const { getBabelConfig } = require('@talend/scripts-config-babel/babel-resolver');

const LANGUAGES = metadata.languages.filter(lng => !lng.label.includes('-'));

// generate src before build
LANGUAGES.forEach(lng => {
	const { label, entry, worker } = lng;
	let content = `import '../language-util';\n`;
	if (Array.isArray(entry)) {
		content += `import { conf, language } from 'monaco-editor/esm/${entry[0].replace(
			'.contribution',
			'',
		)}';\n`;
		console.log('check', label, entry);
		// content += entry
		// 	.map(
		// 		i =>
		// 			`import { conf, language } from 'monaco-editor/esm/${i.replace('.contribution', '')}';`,
		// 	)
		// 	.join('\n');
	} else {
		content += `import { conf, language } from 'monaco-editor/esm/${entry.replace(
			'.contribution',
			'',
		)}';\n`;
	}
	content += `window.TalendMonacoEditor.languages.${label} = { conf, language };\n`;
	fs.writeFileSync(`${__dirname}/src/languages/${label}.js`, content);
	if (worker) {
	}
	// spawn()
});

module.exports = function (env, argv) {
	const isEnvProd = !!env.production;

	return LANGUAGES.map(lng => ({
		mode: isEnvProd ? 'production' : 'development',
		entry: `./src/languages/${lng.label}.js`,
		optimization: {
			minimize: isEnvProd,
		},
		externals: {
			'../../editor/editor.api.js': {
				commonjs: '../../editor/editor.api.js',
				commonjs2: '../../editor/editor.api.js',
				amd: '../../editor/editor.api.js',
				root: 'TalendMonacoEditorAPI',
			},
		},
		devtool: 'source-map',
		output: {
			path: path.join(__dirname, './dist/languages'),
			filename: `${lng.label}.js`,
			library: `TalendMonacoLang${lng.label}`,
			libraryTarget: 'umd2',
			globalObject: 'window',
		},
		module: {
			rules: [
				// {
				// 	test: /\.js$/,
				// 	use: {
				// 		loader: 'babel-loader',
				// 		options: getBabelConfig(),
				// 	},
				// 	// needed to compile class proeprties syntax in json worker
				// 	// include: /(monaco-editor)/,
				// },
				// {
				// 	test: /\.css$/,
				// 	use: ['style-loader', 'css-loader'],
				// },
				// {
				// 	test: /\.ttf$/,
				// 	use: ['file-loader'],
				// },
			],
		},
	}));
};
