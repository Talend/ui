import '@testing-library/jest-dom/vitest';

vi.mock('@talend/utils', async () => {
	const actual = await vi.importActual('@talend/utils');
	return {
		...actual,
		randomUUID: () => '00000000-0000-4000-8000-000000000000',
	};
});

// Keep existing tests functional while migrating from Jest to Vitest.
globalThis.jest = vi;
globalThis.xit = it.skip;

// Node v25+ declares `localStorage` on globalThis, which prevents vitest/jsdom from
// overriding it with jsdom's Storage. Use the JSDOM instance directly to fix this.
const jsdomLocalStorage = globalThis.jsdom?.window?.localStorage;
if (jsdomLocalStorage) {
	Object.defineProperty(globalThis, 'localStorage', {
		configurable: true,
		value: jsdomLocalStorage,
	});
}
