import { defineConfig } from 'vitest/config';
import path from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [
		react({
			include: '**/*.{jsx,tsx,js,ts}',
			jsxRuntime: 'automatic',
		}),
	],

	esbuild: {
		jsx: 'automatic',
	},

	test: {
		// Environment setup
		environment: 'jsdom',

		// Global setup
		setupFiles: ['./test/vitest-setup.js'],

		// Test file patterns
		include: ['src/**/*.test.{js,jsx,ts,tsx}', 'test/**/*Spec.{js,jsx,ts,tsx}'],

		// Global variables for compatibility with Jest
		globals: true,

		// Coverage configuration
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
			exclude: [
				'node_modules/',
				'test/',
				'lib/',
				'lib-esm/',
				'dist/',
				'**/*.config.*',
				'**/*.test.*',
				'**/*Spec.*',
			],
		},

		// Test timeout
		testTimeout: 10000,

		// Watch mode settings
		watch: false,
	},

	resolve: {
		alias: {
			// Handle asset imports
			'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|woff|woff2)$': path.join(
				__dirname,
				'test/file-mock.js',
			),
			'\\.(css|scss)$': path.join(__dirname, 'test/style-mock.js'),
		},
	},

	// Define global variables to replace Jest globals
	define: {
		'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'test'),
	},
});
