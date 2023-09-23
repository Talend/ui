const path = require('path');
const fs = require('fs');
const childProcess = require('child_process');
const tmp = require('tmp');

const yarnlock = require('@yarnpkg/lockfile');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { DuplicatesPlugin } = require('inspectpack/plugin');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const ReactCMFWebpackPlugin = require('@talend/react-cmf-webpack-plugin');

const utils = require('@talend/scripts-utils');
const LICENSE_BANNER = require('./licence');
const icons = require('./icons');
const AppLoader = require('./loader');
const {
	getCommonStyleLoaders,
	getSassLoaders,
	getJSAndTSLoader,
	getSassData,
	getAssetsRules,
	getFileNameForExtension,
} = require('./webpack.config.common');

const DEFAULT_INDEX_TEMPLATE_PATH = 'src/app/index.html';
const BASE_TEMPLATE_PATH = path.join(__dirname, 'index.tpl.html');

const BASENAME = process.env.BASENAME || '/';

// Check if Typescript is setup
const useTypescript = utils.fs.tsConfig();

function getGitRevision() {
	let revision = process.env.GIT_COMMIT;
	if (!revision) {
		try {
			revision = childProcess.execSync('git rev-parse HEAD').toString().trim();
		} catch (e) {
			// eslint-disable-next-line no-console
			console.info('Failed to get git revision');
		}
	}
	return revision;
}

// eslint-disable-next-line import/no-dynamic-require
const packageJson = require(path.join(process.cwd(), 'package.json'));

// meta for html webpack plugin
const meta = {
	'app-version': packageJson.version,
	'app-revision': getGitRevision(),
};

function renderMeta() {
	return Object.keys(meta)
		.map(key => `<meta name="${key}" content="${meta[key]}" />`)
		.join('\n');
}

function getCopyConfig(env, userCopyConfig = []) {
	const config = [...userCopyConfig];
	const assetsOverridden = config.some(nextAsset =>
		typeof nextAsset === 'object' ? nextAsset.from === 'src/assets' : nextAsset === 'src/assets',
	);
	if (!assetsOverridden && fs.existsSync(path.join(process.cwd(), 'src/assets'))) {
		config.push({ from: 'src/assets' });
	}
	return config;
}

async function getIndexTemplate(env, mode, indexTemplatePath) {
	const headPath = path.join(process.cwd(), '.talend', 'head.html');
	const headExists = await utils.fs.isFile(headPath);

	let customHead = '';
	if (headExists) {
		// eslint-disable-next-line no-console
		console.log('custom head.html found');
		customHead = await fs.promises.readFile(headPath);
	}
	const header = `${customHead}
		<link rel="icon" type="image/svg+xml" href="<%= htmlWebpackPlugin.options.favicon || htmlWebpackPlugin.options.b64favicon %>">
		<style><%= htmlWebpackPlugin.options.appLoaderStyle %></style>
		<base href="${BASENAME}" />
	</head>`;
	// fs.exists is deprecated
	const templateExists = await utils.fs.isFile(indexTemplatePath);
	let indexTemplate;
	if (templateExists) {
		indexTemplate = await fs.promises.readFile(indexTemplatePath, 'utf8');
	} else {
		indexTemplate = await fs.promises.readFile(BASE_TEMPLATE_PATH, 'utf8');
	}

	const bodyPath = path.join(process.cwd(), '.talend', 'body.html');
	const customBodyExists = await utils.fs.isFile(bodyPath);
	let body = '</body>';
	if (customBodyExists) {
		body = await fs.promises.readFile(bodyPath);
		body += '</body>';
	}
	indexTemplate = indexTemplate.replace('</head>', header).replace('</body>', body);

	const tmpobj = tmp.fileSync();
	fs.writeFileSync(tmpobj.name, indexTemplate);
	return tmpobj.name;
}

module.exports = ({ getUserConfig, mode }) => {
	return async (env = {}) => {
		const cssPrefix = getUserConfig(['css', 'prefix']);
		const jsPrefix = getUserConfig(['js', 'prefix']);
		const userHtmlConfig = getUserConfig('html', {});
		const userSassData = getUserConfig('sass', {});
		const userCopyConfig = getUserConfig('copy', []);
		const cmf = getUserConfig('cmf');
		const sentryConfig = getUserConfig('sentry', {});
		const { theme } = userSassData;

		const appLoaderIcon = icons.getAppLoaderIconUrl(theme) || userHtmlConfig.appLoaderIcon;

		const sassData = getSassData(userSassData);
		const indexTemplatePath = path.join(
			process.cwd(),
			userHtmlConfig.template || DEFAULT_INDEX_TEMPLATE_PATH,
		);

		meta['app-id'] = userHtmlConfig.appId || theme;

		const indexTemplate = await getIndexTemplate(env, mode, indexTemplatePath);

		const isEnvDevelopment = mode === 'development';
		const isEnvProduction = mode === 'production';
		const isEnvDevelopmentServe = isEnvDevelopment && process.env.WEBPACK_SERVE === 'true';
		const b64favicon = icons.getFavicon(theme);

		const srcDirectories = (getUserConfig('webpack', {})?.monoRepoFixSourceMap || [])
			.map(src => path.resolve(process.cwd(), src))
			.concat([path.resolve(process.cwd(), './src/app')]);

		return {
			mode,
			entry: `${process.cwd()}/src/app/index`,
			output: {
				filename: getFileNameForExtension('js', jsPrefix),
				chunkFilename: getFileNameForExtension('js', jsPrefix),
				publicPath: '/',
				globalObject: 'self',
			},
			devtool: 'source-map',
			resolve: {
				extensions: ['.js', useTypescript && '.ts', useTypescript && '.tsx'].filter(Boolean),
				fallback: {
					url: false,
				},
			},
			module: {
				rules: [
					isEnvDevelopment && {
						test: /\.js$/,
						include: /node_modules/,
						use: ['source-map-loader'],
						enforce: 'pre',
					},
					{
						test: useTypescript ? /\.(js|ts|tsx)$/ : /\.js$/,
						exclude: /node_modules/,
						include: srcDirectories,
						use: getJSAndTSLoader(env, useTypescript),
					},
					{
						test: /\.css$/,
						exclude: /\.module\.css$/,
						use: getCommonStyleLoaders(false, isEnvDevelopmentServe),
					},
					{
						test: /\.module\.css$/,
						use: getCommonStyleLoaders(true, isEnvDevelopmentServe),
					},
					{
						test: /\.scss$/,
						exclude: /\.module\.scss$/,
						use: getSassLoaders(false, sassData, isEnvDevelopmentServe),
					},
					{
						test: /\.module\.scss$/,
						use: getSassLoaders(true, sassData, isEnvDevelopmentServe),
					},
					...getAssetsRules(true),
				].filter(Boolean),
			},
			plugins: [
				isEnvDevelopment && !!env.analyze && new DuplicatesPlugin(),
				new webpack.DefinePlugin({
					BUILD_TIMESTAMP: Date.now(),
					'process.env.ICON_BUNDLE': JSON.stringify(process.env.ICON_BUNDLE),
					'process.env.FORM_MOZ': JSON.stringify(process.env.FORM_MOZ),
					'process.env.DISABLE_JS_ERROR_NOTIFICATION': JSON.stringify(
						process.env.DISABLE_JS_ERROR_NOTIFICATION,
					),
				}),
				isEnvDevelopment &&
					!!env.analyze &&
					new BundleAnalyzerPlugin({
						analyzerMode: 'static',
						openAnalyzer: false,
						logLevel: 'error',
					}),
				new MiniCssExtractPlugin({
					filename: getFileNameForExtension('css', cssPrefix),
					chunkFilename: getFileNameForExtension('css', cssPrefix),
				}),
				isEnvProduction &&
					process.env.SENTRY_AUTH_TOKEN &&
					new SentryWebpackPlugin({
						// see https://docs.sentry.io/platforms/node/guides/aws-lambda/sourcemaps/uploading/webpack/
						org: sentryConfig.org || process.env.SENTRY_ORG || 'talend-0u',
						project: sentryConfig.project || process.env.SENTRY_PROJECT,
						release: `${meta['app-id']}@${packageJson.version}`,
						include: sentryConfig.include || ['dist/'],
						ignore: sentryConfig.ignore,
					}),
				new HtmlWebpackPlugin({
					filename: './index.html',
					appLoader: AppLoader.APP_LOADER,
					appLoaderStyle: AppLoader.getLoaderStyle(appLoaderIcon),
					...userHtmlConfig,
					b64favicon,
					template: indexTemplate,
					meta: { ...meta, ...(userHtmlConfig.meta || {}) },
				}),
				new CopyWebpackPlugin({
					patterns: getCopyConfig(env, userCopyConfig),
				}),
				new webpack.BannerPlugin({ banner: LICENSE_BANNER, entryOnly: true }),
				cmf && new ReactCMFWebpackPlugin({ watch: isEnvDevelopment }),
				useTypescript && new ForkTsCheckerWebpackPlugin(),
			].filter(Boolean),
			optimization: {
				// Automatically split vendor and commons
				// https://twitter.com/wSokra/status/969633336732905474
				// https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
				splitChunks: {
					chunks(chunk) {
						// exclude `polyfills` chunk as we want to only load it for old browsers
						return chunk.name !== 'polyfills';
					},
				},
				// Keep the runtime chunk separated to enable long term caching
				// https://twitter.com/wSokra/status/969679223278505985
				runtimeChunk: true,
				moduleIds: 'named',
			},
			watchOptions: {
				aggregateTimeout: 300,
				poll: 1000,
			},
			devServer: {
				port: 3000,
				historyApiFallback: true,
				client: {
					logging: 'error',
					overlay: { errors: true, warnings: false },
				},
				compress: true,
			},
		};
	};
};
