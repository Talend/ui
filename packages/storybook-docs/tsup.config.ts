import { defineConfig } from 'tsup';
import { baseConfig } from '@talend/scripts-config-tsup';

// storybook-docs ships CSS module files alongside the JS output.
// The separate `build:styles` script is not part of this tsup build.
export default defineConfig(
	baseConfig({
		outDir: 'libx',
		copyStaticAssets: true,
	}),
);
