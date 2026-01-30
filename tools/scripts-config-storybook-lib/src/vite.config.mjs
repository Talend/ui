import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fixReactVirtualized from 'esbuild-plugin-react-virtualized';

export default defineConfig({
	plugins: [react()],
	// esbuild: {
	// 	loader: 'jsx',
	// 	include: /src\/.*\.jsx?$/,
	// 	exclude: [],
	// },
	optimizeDeps: {
		force: true,
		esbuildOptions: {
			plugins: [fixReactVirtualized],
		},
	},
});
