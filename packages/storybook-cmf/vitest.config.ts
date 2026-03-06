import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [react({ include: /\.[jt]sx?$/ })],
	esbuild: {
		loader: 'jsx',
		include: /src\/.*\.[jt]sx?$/,
		jsx: 'automatic',
	},
	test: {
		globals: true,
		environment: 'jsdom',
		include: ['src/**/*.test.{js,jsx,ts,tsx}'],
		exclude: ['lib/**', 'lib-esm/**'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json-summary'],
		},
	},
});
