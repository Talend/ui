import '@testing-library/jest-dom/vitest';
import serializer from 'jest-serializer-html';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

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
