import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

vi.mock('@talend/utils', async () => {
	const actual = await vi.importActual<Record<string, unknown>>('@talend/utils');
	return {
		...actual,
		randomUUID: () => '42',
	};
});
