import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		globals: true,
		environment: 'node',
		env: {
			TZ: 'UTC',
		},
		include: ['supernova-exporter/src/**/*.test.js'],
		exclude: ['lib/**', 'lib-esm/**', 'node_modules/**'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json-summary'],
		},
	},
});
