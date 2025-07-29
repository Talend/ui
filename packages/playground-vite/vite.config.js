import react from '@vitejs/plugin-react';
import fixReactVirtualized from 'esbuild-plugin-react-virtualized';
import fs, { existsSync } from 'fs';
import path, { join } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import { viteMockServe } from 'vite-plugin-mock';

function getPath(pkg) {
	let currentDir = path.dirname(fileURLToPath(import.meta.resolve(pkg)));

	while (currentDir !== '/' && !existsSync(join(currentDir, 'package.json'))) {
		currentDir = path.dirname(currentDir);
	}

	if (existsSync(join(currentDir, 'package.json'))) {
		return currentDir;
	}
	throw new Error('package.json introuvable pour le package spécifié');
}

function getVersion(pkg) {
	const packagePath = path.join(getPath(pkg), 'package.json');
	const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
	return packageJson.version;
}

const PKGS = [
	'@talend/locales-design-system',
	'@talend/locales-tui-components',
	'@talend/locales-tui-containers',
	'@talend/locales-tui-faceted-search',
	'@talend/locales-tui-forms',
	'@talend/assets-api',
	'@talend/design-tokens',
	'@talend/design-system',
	'@talend/react-components',
	'@talend/react-containers',
	'@talend/react-cmf',
	'@talend/react-cmf-router',
	'@talend/react-dataviz',
	'@talend/react-faceted-search',
	'@talend/react-forms',
	'@talend/bootstrap-theme',
	'@talend/icons',
];

const patterns = PKGS.map(pkg => `<meta name="${pkg}" content="${getVersion(pkg)}" />`).join('\n');

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		viteMockServe({
			mockPath: 'mockVite',
			localEnabled: true,
		}),
		createHtmlPlugin({
			minify: true,
			inject: {
				data: {
					title: 'index',
					injectMeta: patterns,
				},
			},
		}),
		{
			name: 'configure-static-files',
			configureServer(server) {
				server.middlewares.use((req, res, next) => {
					if (req.url === '/settings.json') {
						const filePath = path.resolve(__dirname, 'src/settings/settings.json');
						const fileContents = fs.readFileSync(filePath, 'utf-8');
						res.end(fileContents);
						return;
					}
					next();
				});
			},
		},
	],
	optimizeDeps: {
		esbuildOptions: {
			plugins: [fixReactVirtualized],
		},
	},
	resolve: {
		alias: {
			'~@talend/bootstrap-sass/assets/stylesheets/bootstrap/mixins': fileURLToPath(
				import.meta.resolve('@talend/bootstrap-sass/assets/stylesheets/bootstrap/mixins'),
			),
			'~@talend/bootstrap-theme/src/theme/guidelines': fileURLToPath(
				import.meta.resolve('@talend/bootstrap-theme/src/theme/guidelines'),
			),
			'~@talend/bootstrap-theme/src/theme/animation': fileURLToPath(
				import.meta.resolve('@talend/bootstrap-theme/src/theme/animation'),
			),
			'~@talend/design-tokens/lib/tokens': fileURLToPath(
				import.meta.resolve('@talend/design-tokens/lib/tokens'),
			),
		},
	},
});
