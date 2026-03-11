import { copyFileSync, existsSync, mkdirSync, readdirSync, renameSync } from 'fs';
import { dirname, extname, join, relative } from 'path';
import type { Options } from 'tsup';

export const SOURCE_PATTERNS = ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.js', 'src/**/*.jsx'];

export const EXCLUDE_PATTERNS = [
	'!src/**/*.test.ts',
	'!src/**/*.test.tsx',
	'!src/**/*.test.js',
	'!src/**/*.test.jsx',
	'!src/**/*.spec.ts',
	'!src/**/*.spec.tsx',
	'!src/**/*.spec.js',
	'!src/**/*.spec.jsx',
	'!src/**/*.stories.ts',
	'!src/**/*.stories.tsx',
	'!src/**/*.stories.js',
	'!src/**/*.stories.jsx',
	'!src/**/__mocks__/**',
	'!src/**/__tests__/**',
];

const DEFAULT_COPY_EXTENSIONS = ['.css', '.scss', '.json'];

function walkFiles(dir: string): string[] {
	if (!existsSync(dir)) return [];
	const results: string[] = [];
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const fullPath = join(dir, entry.name);
		if (entry.isDirectory()) {
			results.push(...walkFiles(fullPath));
		} else {
			results.push(fullPath);
		}
	}
	return results;
}

/**
 * Copy static assets (CSS, SCSS, JSON, and any extra extensions) from srcDir to outDir,
 * preserving the directory structure. Mirrors the cpx2 copy step in the legacy build.
 */
export function copyAssets(srcDir: string, outDir: string, extraExtensions: string[] = []): void {
	const extensions = new Set([...DEFAULT_COPY_EXTENSIONS, ...extraExtensions]);
	for (const srcPath of walkFiles(srcDir)) {
		if (!extensions.has(extname(srcPath))) continue;
		const destPath = join(outDir, relative(srcDir, srcPath));
		mkdirSync(dirname(destPath), { recursive: true });
		copyFileSync(srcPath, destPath);
	}
}

/**
 * Rename .d.mts → .d.ts (and .d.mts.map → .d.ts.map) in the output directory.
 *
 * tsup v8 generates .d.mts for ESM format regardless of the outExtension setting,
 * but we use .js (not .mjs) to match the legacy lib-esm/ output. Renaming keeps
 * declaration files consistent with the JS output extension.
 */
export function renameDtsFiles(outDir: string): void {
	for (const file of walkFiles(outDir)) {
		if (file.endsWith('.d.mts')) {
			renameSync(file, file.replace(/\.d\.mts$/, '.d.ts'));
		} else if (file.endsWith('.d.mts.map')) {
			renameSync(file, file.replace(/\.d\.mts\.map$/, '.d.ts.map'));
		}
	}
}

export interface BaseConfigOptions {
	/** Output directory. Defaults to 'libx' for the parallel comparison build. */
	outDir?: string;
	/**
	 * Copy CSS/SCSS/JSON assets from src/ to outDir after build.
	 * Mirrors the cpx2 copy step in the legacy talend-scripts build.
	 */
	copyStaticAssets?: boolean;
	/**
	 * Extra file extensions to copy alongside the defaults (.css, .scss, .json).
	 * Useful for design-system which ships SVG/image assets.
	 */
	extraAssetExtensions?: string[];
	/** Any other tsup options to merge/override. */
	[key: string]: unknown;
}

/**
 * Returns a tsup Options object with sensible defaults for Talend library packages.
 * - ESM-only output (no CommonJS)
 * - File-per-file transform mode (bundle: false), matching the legacy Babel pipeline
 * - Source maps enabled
 * - .d.ts declaration generation (tsup dts, then normalized from .d.mts → .d.ts)
 * - Optional static asset copying (CSS/SCSS/JSON/images)
 *
 * @example
 * // Simple TS package:
 * export default defineConfig(baseConfig({ outDir: 'libx' }));
 *
 * // Package with CSS modules:
 * export default defineConfig(baseConfig({ outDir: 'libx', copyStaticAssets: true }));
 *
 * // design-system (CSS + SVG images):
 * export default defineConfig(baseConfig({
 *   outDir: 'libx',
 *   copyStaticAssets: true,
 *   extraAssetExtensions: ['.svg', '.png'],
 * }));
 */
export function baseConfig({
	outDir = 'libx',
	copyStaticAssets = false,
	extraAssetExtensions = [],
	...rest
}: BaseConfigOptions = {}): Options {
	return {
		entry: [...SOURCE_PATTERNS, ...EXCLUDE_PATTERNS],
		format: ['esm'],
		target: 'es2020',
		sourcemap: true,
		dts: true,
		bundle: false,
		clean: true,
		outDir,
		// Force .js extension (not .mjs) to match the existing lib-esm/ output and
		// consumer package.json exports entries which reference .js files.
		outExtension: () => ({ js: '.js' }),
		async onSuccess() {
			// tsup v8 generates .d.mts for ESM — normalize to .d.ts to match legacy output.
			renameDtsFiles(outDir);
			if (copyStaticAssets) {
				copyAssets('src', outDir, extraAssetExtensions);
			}
		},
		...(rest as Partial<Options>),
	};
}
