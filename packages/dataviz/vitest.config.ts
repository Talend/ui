import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: 'jsdom',
		css: {
			modules: {
				classNameStrategy: 'non-scoped',
			},
		},
		setupFiles: ['./src/setupTests.ts'],
		include: ['src/**/*.test.{ts,tsx,js,jsx}'],
		coverage: {
			provider: 'v8',
			include: ['src/**/*.{ts,tsx}'],
			exclude: ['src/**/*.test.{ts,tsx}', 'src/**/*.stories.{ts,tsx}', 'src/**/index.ts'],
		},
	},
});
