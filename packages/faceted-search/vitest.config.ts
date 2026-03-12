import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [react({ include: /\.[jt]sx?$/ })],
	esbuild: {
		loader: 'tsx',
		include: /src\/.*\.[jt]sx?$/,
		exclude: [],
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
		env: {
			TZ: 'UTC',
		},
		setupFiles: ['test-setup.js'],
		include: ['src/**/*.test.{js,jsx,ts,tsx}'],
		exclude: ['lib/**', 'lib-esm/**'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json-summary'],
		},
	},
});
