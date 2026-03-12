import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [react({ include: /\.[jt]sx?$/ })],
	esbuild: {
		loader: 'tsx',
		include: /(src|__tests__)\/.*\.[jt]sx?$/,
		exclude: /node_modules/,
		jsx: 'automatic',
		tsconfigRaw: {
			compilerOptions: {
				jsx: 'react-jsx',
			},
		},
	},
	test: {
		globals: true,
		environment: 'jsdom',
		environmentOptions: {
			jsdom: {
				url: 'http://localhost',
			},
		},
		setupFiles: ['src/test-setup.ts'],
		include: ['src/**/*.test.{js,jsx,ts,tsx}', '__tests__/**/*.test.{js,jsx,ts,tsx}'],
		exclude: ['lib/**', 'lib-esm/**'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json-summary'],
		},
	},
});
