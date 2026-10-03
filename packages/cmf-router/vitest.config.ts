import { defineConfig } from 'vitest/config';

export default defineConfig({
	esbuild: {
		loader: 'jsx',
		include: /.*\.[jt]sx?$/,
		jsx: 'automatic',
	},
	test: {
		globals: true,
		environment: 'jsdom',
		include: ['src/**/*.test.{js,jsx}'],
		exclude: ['lib/**', 'lib-esm/**'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json-summary'],
			include: ['src/**/*.{js,jsx}'],
			exclude: ['src/**/*.test.{js,jsx}'],
			// dev-only printRouterConfig and dead isDifferent in UIRouter.jsx stay uncovered
			thresholds: { lines: 90, branches: 85, functions: 85, statements: 90 },
		},
	},
});
