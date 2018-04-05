const AppLoader = require('@talend/react-components/lib/AppLoader/constant').default;

function TalendHTMLOptimize(options) {
	this.options = options;
}

TalendHTMLOptimize.prototype.apply = function myapply(compiler) {
	const options = this.options || {};
	compiler.plugin('compilation', compilation => {
		compilation.plugin('html-webpack-plugin-alter-asset-tags', (data, cb) => {
			if (options.bodyBefore) {
				options.bodyBefore.forEach((script, index) => {
					data.body.splice(index, 0, script);
				});
			}
			if (options.loadCSSAsync) {
				// eslint-disable-next-line no-param-reassign
				data.head = data.head.map(head => {
					if (head.tagName !== 'link') {
						return head;
					}
					const media = head.attributes.media || 'all';
					// eslint-disable-next-line no-param-reassign
					head.attributes.media = 'none';
					// eslint-disable-next-line no-param-reassign
					head.attributes.onload = `media='${media}'`;
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
			cb(null, data);
		});
	});
};

module.exports = TalendHTMLOptimize;
