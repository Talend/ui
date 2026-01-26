/**
 * @talend/icons main entry point
 * Exports react components and icon info utilities
 */

// Re-export from the existing CommonJS modules
export * as react from './index.js';
export * as info from './info.js';

// Also provide a default export for backward compatibility
import * as indexJs from './index.js';
import * as infoJs from './info.js';

export default {
	react: indexJs,
	info: infoJs,
};
