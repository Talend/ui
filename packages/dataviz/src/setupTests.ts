import { expect } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

expect.extend(matchers);

// Initialize i18next for tests
i18next.use(initReactI18next).init({
	lng: 'en',
	fallbackLng: 'en',
	resources: {},
	interpolation: {
		escapeValue: false,
	},
});

// Polyfill ResizeObserver for jsdom
// @ts-ignore
global.ResizeObserver = class ResizeObserver {
	observe() {}
	unobserve() {}
	disconnect() {}
};
