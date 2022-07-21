import React from 'react';
import { useColumnsVisibility } from './useColumnsVisibility.hook';
import { renderHook, act } from '@testing-library/react-hooks';
import { StorageMock } from '../../../../../test/storageMock';

const STORAGE_KEY = 'storage-key';

describe('useColumnsVisibility', () => {
	it('should have undefined visible columns if no initial value', () => {
		const { result } = renderHook(() => useColumnsVisibility());
		expect(result.current.visibleColumns).toBeUndefined();
	});

	it('should have initial visible columns after columns set', () => {
		const initialVisibleColumns = ['id', 'name'];
		const { result } = renderHook(() => useColumnsVisibility(undefined, initialVisibleColumns));
		act(() =>
			result.current.updateColumns([{ dataKey: 'id' }, { dataKey: 'name' }, { dataKey: 'city' }]),
		);
		expect(result.current.visibleColumns).toEqual(initialVisibleColumns);
	});

	it('should set new columns visible by default', () => {
		const { result } = renderHook(() => useColumnsVisibility());
		act(() => result.current.updateColumns([{ dataKey: 'id' }, { dataKey: 'name' }]));
		expect(result.current.visibleColumns).toEqual(['id', 'name']);
	});

	it('should not set visible columns if empty argument', () => {
		const { result } = renderHook(() => useColumnsVisibility());
		act(() => result.current.setVisibleColumns([], ['id', 'name']));
		expect(result.current.visibleColumns).toBeUndefined();
	});

	it('should not update columns if empty argument', () => {
		const { result } = renderHook(() => useColumnsVisibility());
		act(() => result.current.updateColumns([]));
		expect(result.current.visibleColumns).toBeUndefined();
	});

	it('should set visible columns when none', () => {
		const visibleColumns = ['id', 'name'];
		const { result } = renderHook(() => useColumnsVisibility());
		act(() =>
			result.current.setVisibleColumns([{ dataKey: 'id' }, { dataKey: 'name' }], visibleColumns),
		);
		expect(result.current.visibleColumns).toEqual(visibleColumns);
	});

	it('should update initial visible columns', () => {
		const { result } = renderHook(() => useColumnsVisibility(undefined, ['id', 'name']));
		const nextVisibleColumns = ['id', 'name', 'city'];
		act(() =>
			result.current.setVisibleColumns(
				[{ dataKey: 'id' }, { dataKey: 'name' }, { dataKey: 'city' }],
				nextVisibleColumns,
			),
		);
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

		it('should have undefined visible columns if not stored config', () => {
			const mock = storageMock.mockGet(jest.fn());
			const { result } = renderHook(() => useColumnsVisibility(STORAGE_KEY));
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
			const { result } = renderHook(() => useColumnsVisibility(STORAGE_KEY));
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
			const { result } = renderHook(() => useColumnsVisibility(STORAGE_KEY));
			act(() =>
				result.current.updateColumns([
					{ dataKey: 'id' },
					{ dataKey: 'name' },
					{ dataKey: 'city' },
					{ dataKey: 'country' },
				]),
			);
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
