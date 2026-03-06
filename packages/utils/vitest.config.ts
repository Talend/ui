import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		globals: true,
		environment: 'node',
		env: {
			TZ: 'UTC',
		},
		include: ['src/**/*.test.ts'],
		exclude: ['lib/**', 'lib-esm/**'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json-summary'],
		},
	},
});
