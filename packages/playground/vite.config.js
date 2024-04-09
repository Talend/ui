import react from '@vitejs/plugin-react';
import fixReactVirtualized from 'esbuild-plugin-react-virtualized';
import path from 'path';
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
			'~': path.resolve(__dirname, 'node_modules'),
		},
	},
});
