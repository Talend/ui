import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [react({ include: /src\/.*\.[jt]sx?$/ })],
	test: {
		globals: true,
		environment: 'jsdom',
		env: {
			TZ: 'UTC',
		},
		setupFiles: ['jest.setup.js'],
		include: ['src/**/*.test.{js,jsx,ts,tsx}'],
		exclude: ['lib/**', 'lib-esm/**'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json-summary'],
		},
	},
});
