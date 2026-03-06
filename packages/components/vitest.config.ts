import react from '@vitejs/plugin-react';
import fixReactVirtualized from 'esbuild-plugin-react-virtualized';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [react({ include: /\.[jt]sx?$/ })],
	css: {
		modules: {
			generateScopedName: '[local]',
		},
	},
	esbuild: {
		loader: 'tsx',
		include: /src\/.*\.[jt]sx?$/,
		exclude: [],
		jsx: 'automatic',
		tsconfigRaw: {
			compilerOptions: {
				jsx: 'react-jsx',
			},
		},
	},
	optimizeDeps: {
		esbuildOptions: {
			plugins: [fixReactVirtualized],
		},
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['src/test-setup.js'],
		include: ['src/**/*.test.{js,jsx,ts,tsx}'],
		exclude: ['lib/**', 'lib-esm/**'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json-summary'],
		},
	},
});
