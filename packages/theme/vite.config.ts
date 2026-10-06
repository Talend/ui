import { mkdirSync, copyFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import postcssPresetEnv from 'postcss-preset-env';

const root = __dirname;

/**
 * Injects a module script tag pointing at the theme entry point when serving
 * the static `example/index.html` demo page in dev mode (replaces
 * html-webpack-plugin's auto-injection in the previous webpack setup).
 */
function injectDevEntryPoint() {
	return {
		name: 'bootstrap-theme-inject-dev-entry',
		transformIndexHtml(html: string) {
			return html.replace(
				'</head>',
				'\t\t<script type="module" src="/src/index.js"></script>\n\t</head>',
			);
		},
	};
}

/**
 * Copies dependencies.json next to the built bundle, mirroring the
 * copy-webpack-plugin step from the previous webpack config.
 */
function copyDependenciesManifest() {
	return {
		name: 'bootstrap-theme-copy-dependencies-manifest',
		closeBundle() {
			const outDir = resolve(root, 'dist');
			mkdirSync(outDir, { recursive: true });
			copyFileSync(
				resolve(root, 'dependencies.json'),
				resolve(outDir, 'bootstrap.js.dependencies.json'),
			);
		},
	};
}

export default defineConfig(({ command }) => ({
	server: {
		port: 1234,
		open: '/example/index.html',
	},
	css: {
		postcss: {
			plugins: [postcssPresetEnv()],
		},
		preprocessorOptions: {
			scss: {
				// let bare `@talend/...` imports resolve from node_modules, as the
				// previous sass-loader `includePaths` option did
				loadPaths: [resolve(root, 'node_modules'), resolve(root, '..', '..', 'node_modules')],
			},
		},
	},
	plugins: [command === 'serve' ? injectDevEntryPoint() : copyDependenciesManifest()],
	build: {
		outDir: resolve(root, 'dist'),
		emptyOutDir: true,
		sourcemap: true,
		cssMinify: true,
		lib: {
			entry: resolve(root, 'src/index.js'),
			name: 'TalendBootstrapTheme',
			formats: ['umd'],
			fileName: () => 'bootstrap.js',
			cssFileName: 'bootstrap',
		},
		rollupOptions: {
			output: {
				// flatten font files into dist/fonts, like the previous
				// webpack `asset/resource` generator config did
				assetFileNames: assetInfo => {
					const name = assetInfo.names?.[0] ?? '';
					if (/\.woff2?$/.test(name)) {
						return 'fonts/[name][extname]';
					}
					if (/\.css$/.test(name)) {
						return 'bootstrap.css';
					}
					return 'assets/[name]-[hash][extname]';
				},
			},
		},
	},
}));
