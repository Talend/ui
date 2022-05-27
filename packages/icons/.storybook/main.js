const fs = require('fs/promises');
const path = require('path');

module.exports = {
	webpackFinal: async config => {
		const spriteAll = await fs.readFile(path.resolve('./dist/svg-bundle/all.svg'), {
			encoding: 'utf8',
		});
		const sprite8 = await fs.readFile(path.resolve('./dist/svg-bundle/8.svg'), {
			encoding: 'utf8',
		});
		const sprite12 = await fs.readFile(path.resolve('./dist/svg-bundle/12.svg'), {
			encoding: 'utf8',
		});
		const sprite16 = await fs.readFile(path.resolve('./dist/svg-bundle/16.svg'), {
			encoding: 'utf8',
		});
		const sprite24 = await fs.readFile(path.resolve('./dist/svg-bundle/24.svg'), {
			encoding: 'utf8',
		});
		config.plugins.map(plugin => {
			if (plugin.constructor.name.includes('HtmlWebpackPlugin')) {
				const htmlPlugin = plugin;
				htmlPlugin.options.templateParameters.bodyHtmlSnippet += spriteAll;
				htmlPlugin.options.templateParameters.bodyHtmlSnippet += sprite8;
				htmlPlugin.options.templateParameters.bodyHtmlSnippet += sprite12;
				htmlPlugin.options.templateParameters.bodyHtmlSnippet += sprite16;
				htmlPlugin.options.templateParameters.bodyHtmlSnippet += sprite24;
				return htmlPlugin;
			}
			return plugin;
		});
		return config;
	},
};
