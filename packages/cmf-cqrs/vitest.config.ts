import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		globals: true,
		environment: 'jsdom',
		include: ['src/**/*.test.{js,jsx,ts,tsx}'],
		exclude: ['lib/**', 'lib-esm/**'],
		setupFiles: ['src/test-setup.ts'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json-summary'],
		},
	},
});
