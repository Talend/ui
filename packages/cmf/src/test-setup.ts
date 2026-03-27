import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

vi.mock('@talend/utils', async () => {
	const actual = await vi.importActual<Record<string, unknown>>('@talend/utils');
	return {
		...actual,
		randomUUID: () => '42',
	};
});

// Node v25+ declares `localStorage` on globalThis, which prevents vitest/jsdom from
// overriding it with jsdom's Storage. Use the JSDOM instance directly to fix this.
// @ts-expect-error - jsdom is set by vitest's jsdom environment
const jsdomLocalStorage = globalThis.jsdom?.window?.localStorage;
if (jsdomLocalStorage) {
	Object.defineProperty(globalThis, 'localStorage', {
		configurable: true,
		value: jsdomLocalStorage,
	});
}
