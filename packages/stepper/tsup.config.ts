import { defineConfig } from 'tsup';
import { baseConfig } from '@talend/scripts-config-tsup';

export default defineConfig(
	baseConfig({
		outDir: 'libx',
		copyStaticAssets: true,
	}),
);
