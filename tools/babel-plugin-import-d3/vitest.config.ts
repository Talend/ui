import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		globals: true,
		environment: 'node',
		include: ['**/*.test.{js,ts}'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json-summary'],
		},
	},
});
