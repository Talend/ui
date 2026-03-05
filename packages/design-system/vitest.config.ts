import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [
		react({
			// also transform JSX in plain .js files
			include: /\.(jsx|tsx|js|ts)$/,
		}),
		{
			// mock static asset imports (images, fonts, etc.)
			name: 'asset-mock',
			transform(_src: string, id: string) {
				if (/\.(jpg|jpeg|png|gif|eot|otf|webp|svg|woff|woff2|ttf)$/.test(id)) {
					return { code: 'export default "test-file-stub"' };
				}
			},
		},
	],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./src/vitest.setup.ts'],
		include: ['src/**/*.test.{js,jsx,ts,tsx}'],
		css: false,
		snapshotSerializers: [],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json-summary'],
		},
	},
});
