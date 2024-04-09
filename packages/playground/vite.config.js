import react from '@vitejs/plugin-react';
import fixReactVirtualized from 'esbuild-plugin-react-virtualized';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	optimizeDeps: {
		esbuildOptions: {
			plugins: [fixReactVirtualized],
		},
	},
	resolve: {
		alias: {
			'~@talend/bootstrap-theme/src/theme/guidelines': fileURLToPath(
				import.meta.resolve('@talend/bootstrap-theme/src/theme/guidelines'),
			),
			'~@talend/design-tokens/lib/tokens': fileURLToPath(
				import.meta.resolve('@talend/design-tokens/lib/tokens'),
			),
			'~@talend/bootstrap-sass/assets/stylesheets/bootstrap/mixins': fileURLToPath(
				import.meta.resolve('@talend/bootstrap-sass/assets/stylesheets/bootstrap/mixins'),
			),
			'~@talend/bootstrap-theme/src/theme/animation': fileURLToPath(
				import.meta.resolve('@talend/bootstrap-theme/src/theme/animation'),
			),
			'~@talend/design-tokens/lib/_tokens.scss': fileURLToPath(
				import.meta.resolve('@talend/design-tokens/lib/_tokens.scss'),
			),
		},
	},
});
