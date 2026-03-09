import '@testing-library/jest-dom/vitest';

// Keep existing test code working without touching every `jest.fn()` call.
globalThis.jest = vi;

vi.mock('@talend/utils', async () => {
	let i = 0;
	const actual = await vi.importActual('@talend/utils');
	return {
		...actual,
		randomUUID: () => `mocked-uuid-${i++}`,
	};
});
