import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react({ include: /\.[jt]sx?$/ })],
	esbuild: {
		loader: 'tsx',
		include: /(src|__mocks__)\/.*\.[jt]sx?$/,
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
		include: ['src/**/*.test.{js,jsx,ts,tsx}'],
		exclude: ['lib/**', 'lib-esm/**'],
		setupFiles: ['src/test-setup.tsx'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json-summary'],
		},
	},
});
