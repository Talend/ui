import { useColumnsVisibility } from './useColumnsVisibility.hook';
import { renderHook, act } from '@testing-library/react-hooks';
import { StorageMock } from '../../../../../test/storageMock';

const STORAGE_KEY = 'storage-key';

describe('useColumnsVisibility', () => {
	it('should have undefined visible columns if no initial value', () => {
		const { result } = renderHook(() => useColumnsVisibility());
		expect(result.current.visibleColumns).toBeUndefined();
	});

	it('should set new columns visible by default', () => {
		let columns = [{ dataKey: 'id' }, { dataKey: 'name' }];
		const { result, rerender } = renderHook(() => useColumnsVisibility(columns));

		rerender();
		expect(result.current.visibleColumns).toEqual(['id', 'name']);
	});

	it('should have initial visible columns after columns set', () => {
		let columns;
		const initialVisibleColumns = ['id', 'name'];
		const { result, rerender } = renderHook(() =>
			useColumnsVisibility(columns, initialVisibleColumns),
		);
		expect(result.current.visibleColumns).toBeUndefined();
		columns = [{ dataKey: 'id' }, { dataKey: 'name' }, { dataKey: 'city' }];
		rerender();
		expect(result.current.visibleColumns).toEqual(initialVisibleColumns);
	});

	it('should not set visible columns if empty argument', () => {
		const { result } = renderHook(() => useColumnsVisibility());
		act(() => result.current.setVisibleColumns([], ['id', 'name']));
		expect(result.current.visibleColumns).toBeUndefined();
	});

	it('should not update columns if empty argument', () => {
		let columns = [{ dataKey: 'id' }, { dataKey: 'name' }];
		const { result, rerender } = renderHook(() => useColumnsVisibility(columns));
		columns = [];
		rerender();
		expect(result.current.visibleColumns).toEqual(['id', 'name']);
	});

	it('should set visible columns when none', () => {
		let columns;
		const visibleColumns = ['id', 'name'];
		const { result, rerender } = renderHook(() => useColumnsVisibility(columns));
		columns = [{ dataKey: 'id' }, { dataKey: 'name' }, { dataKey: 'city' }];
		rerender();
		act(() => result.current.setVisibleColumns(visibleColumns));
		expect(result.current.visibleColumns).toEqual(visibleColumns);
	});

	it('should update initial visible columns', () => {
		let columns;
		const { result, rerender } = renderHook(() => useColumnsVisibility(columns, ['id', 'name']));
		const nextVisibleColumns = ['id', 'name', 'city'];
		columns = [{ dataKey: 'id' }, { dataKey: 'name' }, { dataKey: 'city' }];
		rerender();
		act(() => result.current.setVisibleColumns(nextVisibleColumns));
		expect(result.current.visibleColumns).toEqual(nextVisibleColumns);
	});

	describe('with local storage config', () => {
		let storageMock;
		beforeEach(() => {
			storageMock = new StorageMock();
		});

		afterEach(() => {
			storageMock.clearAll();
		});

		it('should have undefined visible columns if no stored config', () => {
			const mock = storageMock.mockGet(jest.fn());
			const { result } = renderHook(() => useColumnsVisibility(undefined, undefined, STORAGE_KEY));
			expect(result.current.visibleColumns).toBeUndefined();
			expect(mock).toHaveBeenCalledWith(STORAGE_KEY);
		});

		it('should have visible columns from stored config', () => {
			storageMock.mockGet(() =>
				JSON.stringify([
					{ dataKey: 'id', visible: true },
					{ dataKey: 'name', visible: true },
					{ dataKey: 'city', visible: false },
				]),
			);
			const { result } = renderHook(() => useColumnsVisibility(undefined, undefined, STORAGE_KEY));
			expect(result.current.visibleColumns).toEqual(['id', 'name']);
		});

		it('should have new columns added to local visibility config ', () => {
			storageMock.mockGet(() =>
				JSON.stringify([
					{ dataKey: 'id', visible: true },
					{ dataKey: 'name', visible: true },
					{ dataKey: 'city', visible: false },
				]),
			);
			const setItemMock = storageMock.mockSet(jest.fn());
			let columns = [
				{ dataKey: 'id' },
				{ dataKey: 'name' },
				{ dataKey: 'city' },
				{ dataKey: 'country' },
			];
			const { result } = renderHook(() => useColumnsVisibility(columns, undefined, STORAGE_KEY));

			expect(result.current.visibleColumns).toEqual(['id', 'name', 'country']);
			expect(setItemMock).toHaveBeenCalledWith(
				STORAGE_KEY,
				JSON.stringify([
					{ dataKey: 'id', visible: true },
					{ dataKey: 'name', visible: true },
					{ dataKey: 'city', visible: false },
					{ dataKey: 'country', visible: true },
				]),
			);
		});
	});
});
