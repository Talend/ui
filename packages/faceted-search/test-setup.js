import '@testing-library/jest-dom/vitest';

// Keep existing test code working without touching every `jest.fn()` call.
globalThis.jest = vi;

// Node v25+ declares `localStorage` on globalThis, which prevents vitest/jsdom from
// overriding it with jsdom's Storage. Use the JSDOM instance directly to fix this.
const jsdomLocalStorage = globalThis.jsdom?.window?.localStorage;
if (jsdomLocalStorage) {
	Object.defineProperty(globalThis, 'localStorage', {
		configurable: true,
		value: jsdomLocalStorage,
	});
}

vi.mock('@talend/utils', async () => {
	let i = 0;
	const actual = await vi.importActual('@talend/utils');
	return {
		...actual,
		randomUUID: () => `mocked-uuid-${i++}`,
	};
});
