import { defineConfig } from 'tsup';
import { baseConfig } from '@talend/scripts-config-tsup';

// design-tokens ships SCSS token files alongside the JS output.
// The separate `build:css` script for compiled CSS output is not part of this tsup build.
export default defineConfig(
	baseConfig({
		outDir: 'libx',
		copyStaticAssets: true,
	}),
);
