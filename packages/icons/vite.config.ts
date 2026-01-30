import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
	build: {
		lib: {
			// Multiple entry points for different exports
			entry: {
				index: resolve(__dirname, 'src/index.ts'),
				typeUtils: resolve(__dirname, 'src/typeUtils.ts'),
			},
			// Output both ESM and CJS
			formats: ['es', 'cjs'],
			// Customize naming
			fileName: (format, entryName) => {
				const ext = format === 'es' ? '.js' : '.cjs';
				return `${entryName}${ext}`;
			},
		},
		// Preserve svg-bundle directory (created by generate-svg-bundles.mjs)
		emptyOutDir: false,
		// Optimization settings
		minify: false,
		target: 'ES2020',
		rollupOptions: {
			// Don't include React in the bundle
			external: ['react'],
			output: {
				// Ensure proper CommonJS exports
				exports: 'named',
			},
		},
	},
});
