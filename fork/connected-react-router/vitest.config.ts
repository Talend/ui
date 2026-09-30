import { defineConfig } from 'vitest/config';

export default defineConfig({
	esbuild: {
		loader: 'jsx',
		include: /\/(src|test)\/.*\.js$/,
		exclude: [],
	},
	test: {
		globals: true,
		environment: 'jsdom',
		include: ['test/**/*.test.js'],
		exclude: ['lib/**', 'lib-esm/**'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json-summary'],
		},
	},
});
