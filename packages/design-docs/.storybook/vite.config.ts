import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	// esbuild: {
	// 	loader: 'jsx',
	// 	include: /src\/.*\.jsx?$/,
	// 	exclude: [],
	// },
	// optimizeDeps: {
	// 	force: true,
	// 	esbuildOptions: {
	// 		plugins: [fixReactVirtualized],
	// 	},
	// },
});
