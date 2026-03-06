import '@testing-library/jest-dom/vitest';
import serializer from 'jest-serializer-html';

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

expect.addSnapshotSerializer(serializer);
