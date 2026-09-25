import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [react()],
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['src/test-setup.jsx'],
		include: ['src/**/*.test.{js,jsx,ts,tsx}'],
		exclude: ['lib/**', 'lib-esm/**'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json-summary'],
		},
	},
});
