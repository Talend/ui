const htmlWebpackPlugin = require('html-webpack-plugin');
const AppLoader = require('@talend/react-components/lib/AppLoader/constant').default;

function TalendHTMLOptimize(options) {
	this.options = options;
}

TalendHTMLOptimize.prototype.process = function process(data) {
	const options = this.options || {};
	if (options.bodyBefore) {
		data.body = options.bodyBefore.concat(data.body);
	}
	if (options.loadCSSAsync) {
		data.head = data.head.map(head => {
			if (head.tagName !== 'link') {
				return head;
			}
			const media = head.attributes.media || 'all';
			head.attributes.media = 'none';
			head.attributes.onload = `if(media!='${media}')media='${media}'`;
			return head;
		});
	}
	if (options.versions) {
		data.body.splice(0, 0, {
			tagName: 'script',
			closeTag: true,
			innerHTML: `TALEND_APP_INFO=${JSON.stringify(options.versions)}`,
			attributes: { type: 'text/javascript' },
		});
	}
	if (options.appLoaderIcon) {
		data.head.splice(0, 0, {
			tagName: 'style',
			closeTag: true,
			innerHTML: AppLoader.getLoaderStyle(options.appLoaderIcon),
		});
	}
	return data;
};

TalendHTMLOptimize.prototype.apply = function myapply(compiler) {
	if (compiler.hooks) {
		compiler.hooks.compilation.tap('TalendHtmlWebpackPlugin', compilation => {
			if (htmlWebpackPlugin.getHooks) {
				// htmlWebpackPlugin @Next
				const hooks = htmlWebpackPlugin.getHooks(compilation);
				return (
					hooks &&
					hooks.alterAssetTags &&
					hooks.alterAssetTags.tap('TalendHtmlWebpackPlugin', data => this.process(data))
				);
			}
			return compilation.plugin('html-webpack-plugin-alter-asset-tags', data => this.process(data));
		});
	}
};

module.exports = TalendHTMLOptimize;
