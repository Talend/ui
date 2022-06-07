const fs = require('fs/promises');
const path = require('path');

module.exports = {
	webpackFinal: async config => {
		const spriteAll = await fs.readFile(path.resolve('./dist/svg-bundle/all.svg'), {
			encoding: 'utf8',
		});
		const spriteXS = await fs.readFile(path.resolve('./dist/svg-bundle/XS.svg'), {
			encoding: 'utf8',
		});
		const spriteS = await fs.readFile(path.resolve('./dist/svg-bundle/S.svg'), {
			encoding: 'utf8',
		});
		const spriteM = await fs.readFile(path.resolve('./dist/svg-bundle/M.svg'), {
			encoding: 'utf8',
		});
		const spriteL = await fs.readFile(path.resolve('./dist/svg-bundle/L.svg'), {
			encoding: 'utf8',
		});
		config.plugins.map(plugin => {
			if (plugin.constructor.name.includes('HtmlWebpackPlugin')) {
				const htmlPlugin = plugin;
				htmlPlugin.options.templateParameters.bodyHtmlSnippet += spriteAll;
				htmlPlugin.options.templateParameters.bodyHtmlSnippet += spriteXS;
				htmlPlugin.options.templateParameters.bodyHtmlSnippet += spriteS;
				htmlPlugin.options.templateParameters.bodyHtmlSnippet += spriteM;
				htmlPlugin.options.templateParameters.bodyHtmlSnippet += spriteL;
				return htmlPlugin;
			}
			return plugin;
		});
		return config;
	},
};