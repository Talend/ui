import { act, renderHook } from '@testing-library/react-hooks';
import { useCopyToClipboard } from '..';

describe('useCopyToClipboard', () => {
	beforeEach(() => {
		const writeText = jest.fn((data: string) => Promise.resolve());
		Object.assign(navigator, {
			clipboard: {
				writeText,
			},
		});
	});
	it('should be defined ', () => {
		expect(useCopyToClipboard).toBeDefined();
	});
	it('should copy', async () => {
		const hook = renderHook(() => useCopyToClipboard());
		const testValue = 'test';
		let [text, copyToClipboard] = hook.result.current;
		await act(async () => {
			await copyToClipboard(testValue);
		});
		[text, copyToClipboard] = hook.result.current;

		expect(text).toBe(testValue);
	});
});
