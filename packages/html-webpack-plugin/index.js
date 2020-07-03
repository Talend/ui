const AppLoader = require('@talend/react-components/lib/AppLoader/constant').default;

function TalendHTMLOptimize(options) {
	this.options = options;
}

TalendHTMLOptimize.prototype.apply = function myapply(compiler) {
	const options = this.options || {};
	compiler.plugin('compilation', compilation => {
		compilation.plugin('html-webpack-plugin-alter-asset-tags', data => {
			// FIXME With inject: false we can't alter asset tags anymore
			// 		 We need to use another hook of this plugin
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
		});
	});
};

module.exports = TalendHTMLOptimize;
