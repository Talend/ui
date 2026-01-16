/**
 * @talend/storybook-config
 *
 * Storybook configuration utilities for Talend UI
 * Provides TypeScript functions to easily configure Storybook with Talend's defaults
 */

// Main configuration
export { createMainConfig } from './main';
export type { MainConfigOptions } from './main';

// Preview configuration
export { createPreviewConfig, getPreviewHead } from './preview';
export type { PreviewConfigOptions } from './preview';

// i18n configuration
export { initI18n } from './i18n';
export type { I18nextOptions } from './i18n';

// CMF configuration
export { configureCmfModules } from './cmf';
export type { CMFOptions } from './cmf';

// Utilities
export { fixWindowsPath, fixWindowsPaths } from './utils';
