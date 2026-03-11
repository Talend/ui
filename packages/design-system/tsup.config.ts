import { defineConfig } from 'tsup';
import { baseConfig } from '@talend/scripts-config-tsup';

// design-system ships CSS modules AND SVG logo images from src/images/
export default defineConfig(
	baseConfig({
		outDir: 'libx',
		copyStaticAssets: true,
		extraAssetExtensions: ['.svg', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.ico'],
	}),
);
