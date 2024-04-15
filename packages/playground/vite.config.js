import react from '@vitejs/plugin-react';
import fixReactVirtualized from 'esbuild-plugin-react-virtualized';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import { viteMockServe } from 'vite-plugin-mock';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		viteMockServe({
			mockPath: 'mockVite',
			localEnabled: true,
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
			'~@talend/design-tokens/lib/_tokens.scss': fileURLToPath(
				import.meta.resolve('@talend/design-tokens/lib/_tokens.scss'),
			),
		},
	},
});
