const webpack = require('webpack');
const fs = require('fs');

// TODO: we need a better API to find current version
const iconsPKGPath = require
	.resolve('@talend/icons')
	.replace('/dist/TalendIcons.js', '/package.json');
const iconsPKG = JSON.parse(fs.readFileSync(iconsPKGPath).toString());

module.exports = {
	module: {
		rules: [
			{
				test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url-loader',
				options: {
					mimetype: 'application/font-woff',
				},
			},
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.TalendIconsVersion': JSON.stringify(iconsPKG.version),
		}),
	],
};
