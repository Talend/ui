import { defineConfig } from 'vitest/config';

export default defineConfig({
	esbuild: {
		loader: 'jsx',
		include: /src\/.*\.js$/,
	},
	test: {
		globals: true,
		environment: 'node',
		isolate: true,
		fileParallelism: false,
		include: ['src/**/*.test.js'],
		exclude: ['lib/**', 'lib-esm/**'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json-summary'],
		},
	},
});
