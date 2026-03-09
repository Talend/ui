import '@testing-library/jest-dom/vitest';
import serializer from 'jest-serializer-html';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

// Node.js v22+ injects a native `localStorage` own data-property on `globalThis`
// that has no working `setItem`/`getItem` when `--localstorage-file` is not a
// valid path. In Vitest's jsdom environment `window === globalThis`, so jsdom's
// own setup cannot override this property.
//
// Replace it with a Proxy-backed in-memory store. The Proxy get trap checks
// `Storage.prototype` at call time so `StorageMock` spies (which patch
// Storage.prototype) are picked up automatically.
if (typeof Storage !== 'undefined') {
	const _data = {};
	const store = {
		getItem: key => (Object.prototype.hasOwnProperty.call(_data, key) ? _data[key] : null),
		setItem: (key, value) => {
			_data[key] = String(value);
		},
		removeItem: key => {
			delete _data[key];
		},
		clear: () => {
			for (const k of Object.keys(_data)) delete _data[k];
		},
		get length() {
			return Object.keys(_data).length;
		},
		key: n => Object.keys(_data)[n] ?? null,
	};
	const originals = Object.fromEntries(
		['getItem', 'setItem', 'removeItem', 'clear', 'key'].map(n => [n, Storage.prototype[n]]),
	);
	globalThis.localStorage = new Proxy(store, {
		get(target, prop) {
			if (prop in originals && Storage.prototype[prop] !== originals[prop]) {
				return Storage.prototype[prop];
			}
			const v = target[prop];
			return typeof v === 'function' ? v.bind(target) : v;
		},
	});
}

void i18next.use(initReactI18next).init({
	lng: 'en',
	fallbackLng: 'en',
	resources: { en: { translation: {} } },
	interpolation: { escapeValue: false },
});

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

// Suppress React warnings in tests, as they are not relevant to the test results and can clutter the output.
const originalConsoleError = console.error;
vi.spyOn(console, 'error').mockImplementation((...args) => {
	const [firstArg] = args;
	if (typeof firstArg === 'string' && firstArg.includes('Warning')) {
		return;
	}
	originalConsoleError(...args);
});

expect.addSnapshotSerializer(serializer);
