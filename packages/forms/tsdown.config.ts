import { defineConfig } from 'tsdown';

export default defineConfig({
	entry: ['./src/index.ts'],
	unbundle: true,
	outDir: './lib',
	dts: true,
	outExtensions({ format }) {
		if (format === 'es') {
			return { js: '.js' }; // Use .js instead of .mjs for ESM
		}
		if (format === 'cjs') {
			return { js: '.cjs' }; // Keep .cjs for CJS
		}
	},
	copy: ['src/**/*.module.css', 'src/**/*.json'],
});
