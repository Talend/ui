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

const AppLoader = require('@talend/react-components/lib/AppLoader/constant').default;

const cdn = require('@talend/scripts-config-cdn');
const exists = require('@talend/scripts-utils/fs');
const LICENSE_BANNER = require('./licence');
const inject = require('./inject');
const icons = require('./icons');
const {
	getCommonStyleLoaders,
	getSassLoaders,
	getJSAndTSLoader,
	getSassData,
	getAssetsRules,
} = require('./webpack.config.common');

const INITIATOR_URL = process.env.INITIATOR_URL || '@@INITIATOR_URL@@';
const cdnMode = !!process.env.INITIATOR_URL;

const DEFAULT_INDEX_TEMPLATE_PATH = 'src/app/index.html';
const BASE_TEMPLATE_PATH = path.join(__dirname, 'index.tpl.html');
const getFileNameForExtension = (extension, prefix) =>
	`${prefix || ''}[name]-[contenthash].${extension}`;

const TALEND_LIB_PREFIX = '@talend/';

const BASENAME = process.env.BASENAME || '/';

// set @talend packages in module-to-cdn
cdn.configureTalendModules();

// Check if Typescript is setup
const useTypescript = exists.tsConfig();

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

function getTalendVersions() {
	const talendLibraries = {};
	const packagelockPath = path.join(process.cwd(), 'package-lock.json');
	const yarnlockPath = path.join(process.cwd(), 'yarn.lock');
	// eslint-disable-next-line
	const packageJson = require(path.join(process.cwd(), 'package.json'));

	const talendDependencies = Object.keys(packageJson.dependencies).filter(dependency =>
		dependency.includes(TALEND_LIB_PREFIX),
	);

	if (fs.existsSync(yarnlockPath)) {
		const data = fs.readFileSync(yarnlockPath, 'utf-8');
		const lock = yarnlock.parse(data);

		Object.keys(lock.object)
			.filter(k => k.startsWith(TALEND_LIB_PREFIX))
			.reduce((acc, key) => {
				// @talend/react-components@5.1.2
				const name = `${TALEND_LIB_PREFIX}${key.split('/')[1].split('@')[0]}`;
				if (talendDependencies.includes(name)) {
					const info = lock.object[key];
					acc[name] = info.version;
				}
				return acc;
			}, talendLibraries);
	} else if (fs.existsSync(packagelockPath)) {
		// eslint-disable-next-line
		const packageLock = require(packagelockPath);

		Object.keys(packageLock.packages)
			.filter(k => k.includes(TALEND_LIB_PREFIX))
			.reduce((acc, key) => {
				const name = `${TALEND_LIB_PREFIX}${key.split(TALEND_LIB_PREFIX)[1]}`;
				if (talendDependencies.includes(name)) {
					acc[name] = packageLock.packages[key].version;
				}
				return acc;
			}, talendLibraries);
	}

	let revision = process.env.GIT_COMMIT;
	if (!revision) {
		try {
			revision = childProcess.execSync('git rev-parse HEAD').toString().trim();
		} catch (e) {
			// eslint-disable-next-line no-console
			console.info('Failed to get git revision');
		}
	}

	return {
		version: packageJson.version,
		talendLibraries: Object.entries(talendLibraries).map(([name, version]) => ({ name, version })),
		revision,
	};
}

function getVersions() {
	const talendLibraries = cdn
		.getModulesFromLockFile()
		.filter(Boolean)
		.map(info => ({ version: info.version, name: info.name }));
	// eslint-disable-next-line
	const packageJson = require(path.join(process.cwd(), 'package.json'));

	return {
		version: packageJson.version,
		talendLibraries,
		revision: getGitRevision(),
	};
}

const VERSIONS = getVersions();
// meta for html webpack plugin
const meta = VERSIONS.talendLibraries.reduce(
	(acc, lib) => {
		acc[lib.name] = lib.version;
		return acc;
	},
	{
		'app-version': VERSIONS.version,
		'app-revision': VERSIONS.revision,
	},
);

function getCopyConfig(env, userCopyConfig = []) {
	const config = [...userCopyConfig];
	const assetsOverridden = config.some(nextAsset =>
		typeof nextAsset === 'object' ? nextAsset.from === 'src/assets' : nextAsset === 'src/assets',
	);
	if (!assetsOverridden && fs.existsSync(path.join(process.cwd(), 'src/assets'))) {
		config.push({ from: 'src/assets' });
	}
	if (!cdnMode) {
		cdn.getCopyConfig().forEach(c => config.push(c));
	}
	return config;
}

async function getIndexTemplate(env, mode, indexTemplatePath) {
	const headPath = path.join(process.cwd(), '.talend', 'head.html');
	const headExists = await exists.isFile(headPath);

	let customHead = '';
	if (headExists) {
		// eslint-disable-next-line no-console
		console.log('custom head.html found');
		customHead = await fs.promises.readFile(headPath);
	}
	/*
	 * The following header is used to inject.
	 * Some UMD are not built correctly for browser.
	 * For example react-is index.js includes a test on process.env.NODE_ENV to require the min version or not.
	 * Let's bypass this issue by setting a process.env.NODE_ENV
	 */
	const header = `${customHead}<% var meta = htmlWebpackPlugin.options.meta;
		var metaKeys = Object.keys(meta);
		for(var i = 0; i < metaKeys.length; ++i) {%>
		<meta name="<%=metaKeys[i] %>" content="<%=meta[metaKeys[i]] %>" />
		<% } %>
		<link rel="icon" type="image/svg+xml" href="<%= htmlWebpackPlugin.options.favicon || htmlWebpackPlugin.options.b64favicon %>">
		<style><%= htmlWebpackPlugin.options.appLoaderStyle %></style>
		<script type="text/javascript">
			var process = { browser: true, env: { NODE_ENV: '${mode}' } };
			var TALEND_CDN_VERSIONS = {
				TUI: '@@TALEND_UI_VERSION@@', ${process.env.CUSTOM_VERSIONS || ''}
			};
			window.basename = '${BASENAME}';
			window.TALEND_INITIATOR_URL = '${INITIATOR_URL}';
			window.jsFiles = [<%= htmlWebpackPlugin.files.js.map(href => '"'+href+'"').join(',') %>];
			window.cssFiles = [<%= htmlWebpackPlugin.files.css.map(href => '"'+href+'"').join(',') %>];
			window.Talend = { build: <%= JSON.stringify(htmlWebpackPlugin.files.jsMetadata)%>, cssBuild:  <%= JSON.stringify(htmlWebpackPlugin.files.cssMetadata)%> };
			${await inject.getMinified()}
		</script>
		<base href="${BASENAME}" />
	</head>`;
	// fs.exists is deprecated
	const templateExists = await exists.isFile(indexTemplatePath);
	let indexTemplate;
	if (templateExists) {
		indexTemplate = await fs.promises.readFile(indexTemplatePath, 'utf8');
	} else {
		indexTemplate = await fs.promises.readFile(BASE_TEMPLATE_PATH, 'utf8');
	}

	const bodyPath = path.join(process.cwd(), '.talend', 'body.html');
	const customBodyExists = await exists.isFile(bodyPath);
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
		const cssModulesEnabled = getUserConfig(['css', 'modules'], true);
		const cssPrefix = getUserConfig(['css', 'prefix']);
		const jsPrefix = getUserConfig(['js', 'prefix']);
		const userHtmlConfig = getUserConfig('html', {});
		const userSassData = getUserConfig('sass', {});
		const userCopyConfig = getUserConfig('copy', []);
		const cmf = getUserConfig('cmf');
		const dcwpConfig = getUserConfig('dynamic-cdn-webpack-plugin');
		const sentryConfig = getUserConfig('sentry', {});
		const { theme } = userSassData;

		const appLoaderIcon = icons.getAppLoaderIconUrl(theme) || userHtmlConfig.appLoaderIcon;

		const sassData = getSassData(userSassData);
		const indexTemplatePath = path.join(
			process.cwd(),
			userHtmlConfig.template || DEFAULT_INDEX_TEMPLATE_PATH,
		);
		const indexTemplate = await getIndexTemplate(env, mode, indexTemplatePath);

		const isEnvDevelopment = mode === 'development';
		const isEnvProduction = mode === 'production';
		const b64favicon = icons.getFavicon(theme);

		meta['app-id'] = userHtmlConfig.appId || theme;

		return {
			mode,
			entry: `${process.cwd()}/src/app/index`,
			output: {
				filename: getFileNameForExtension('js', jsPrefix),
				chunkFilename: getFileNameForExtension('js', jsPrefix),
				publicPath: '/',
				globalObject: 'this',
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
						include: /@talend/,
						use: ['source-map-loader'],
						enforce: 'pre',
					},
					{
						test: useTypescript ? /\.(js|ts|tsx)$/ : /\.js$/,
						exclude: /node_modules/,
						use: getJSAndTSLoader(env, useTypescript),
					},
					{
						test: /\.html$/,
						use: [
							!process.env.NO_CACHE_LOADER && { loader: 'cache-loader' },
							{
								loader: 'html-loader',
								options: {
									minimize: {
										removeComments: true,
										collapseWhitespace: true,
									},
								},
							},
						].filter(Boolean),
						exclude: indexTemplatePath,
					},
					{
						test: /\.css$/,
						use: getCommonStyleLoaders(false, mode),
						exclude: /@talend/,
					},
					{
						test: /\.scss$/,
						use: getSassLoaders(false, sassData, mode),
						include: /bootstrap-theme/,
					},
					{
						test: /\.scss$/,
						use: getSassLoaders(true, sassData, mode),
						include: /@talend/,
						exclude: /bootstrap-theme/,
					},
					{
						test: /\.scss$/,
						use: getSassLoaders(cssModulesEnabled, sassData, mode),
						exclude: /@talend/,
					},
					...getAssetsRules(true),
				].filter(Boolean),
			},
			plugins: [
				isEnvDevelopment && new DuplicatesPlugin(),
				new webpack.DefinePlugin({
					BUILD_TIMESTAMP: Date.now(),
					TALEND_APP_INFO: JSON.stringify(getTalendVersions()),
					'process.env.ICON_BUNDLE': JSON.stringify(process.env.ICON_BUNDLE),
					'process.env.FORM_MOZ': JSON.stringify(process.env.FORM_MOZ),
					'process.env.DISABLE_JS_ERROR_NOTIFICATION': JSON.stringify(
						process.env.DISABLE_JS_ERROR_NOTIFICATION,
					),
				}),
				(isEnvDevelopment || !!env.analyze) &&
					new BundleAnalyzerPlugin({
						analyzerMode: 'static',
						openAnalyzer: !!env.analyze,
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
						release: VERSIONS.version,
						include: sentryConfig.include || ['dist/'],
						ignore: sentryConfig.ignore || ['cdn/'],
					}),
				,
				new HtmlWebpackPlugin({
					filename: './index.html',
					appLoader: AppLoader.APP_LOADER,
					appLoaderStyle: AppLoader.getLoaderStyle(appLoaderIcon),
					...userHtmlConfig,
					b64favicon,
					inject: false,
					template: indexTemplate,
					meta: { ...meta, ...(userHtmlConfig.meta || {}) },
				}),
				cdn.getWebpackPlugin(env, dcwpConfig),
				new CopyWebpackPlugin({ patterns: getCopyConfig(env, userCopyConfig) }),
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
				static: {
					directory: path.join(process.cwd(), 'dist'),
					watch: true,
				},
				compress: true,
				watchFiles: ['src/**/*', 'dist/**/*'],
			},
		};
	};
};
