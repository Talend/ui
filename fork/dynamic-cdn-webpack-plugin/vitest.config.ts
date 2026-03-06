import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		globals: true,
		environment: 'node',
		include: ['src/**/*.test.js', 'test/**/*.test.js'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json-summary'],
		},
	},
});
