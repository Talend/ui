import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		globals: true,
		environment: 'node',
		testTimeout: 120000,
		setupFiles: ['tests/test-setup.js'],
		include: ['tests/**/*.test.cjs'],
	},
});
