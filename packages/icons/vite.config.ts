import { defineConfig } from 'vite';
import { resolve } from 'path';
import { builtinModules } from 'module';

const nodeBuiltins = new Set([
	...builtinModules,
	...builtinModules.map(module => `node:${module}`),
]);

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
			// `src/extract.ts` is a Node-only helper used by the package entry.
			// Keep Node builtins external so Vite/Rollup doesn't rewrite them to
			// browser shims during the library build.
			external: id => id === 'react' || nodeBuiltins.has(id),
			output: {
				// Ensure proper CommonJS exports
				exports: 'named',
			},
		},
	},
});
