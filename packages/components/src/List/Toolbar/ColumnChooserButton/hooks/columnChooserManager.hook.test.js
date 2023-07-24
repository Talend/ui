import { renderHook, act } from '@testing-library/react-hooks';
import { useColumnChooserManager } from './columnChooserManager.hook';

const initialColumns = [
	{ key: 'id', label: 'Id', order: 1 },
	{ key: 'name', label: 'Name', order: 2 },
	{ key: 'author', label: 'Author', order: 3 },
	{ key: 'created', label: 'Created', order: 6 },
	{
		key: 'modified',
		label: 'Modified',
		order: 4,
		header: 'icon',
		data: { iconName: 'talend-scheduler' },
	},
	{ key: 'icon', label: 'Icon', visible: true, order: 5, locked: true },
];

const lockedLeftItems = 2;

describe('useColumnChooserManager', () => {
	it('should have no columns defined', () => {
		const { result } = renderHook(() => useColumnChooserManager());
		expect(result.current.columns).toEqual([]);
	});

	it('should have some columns with the first two & icon column locked', () => {
		const { result } = renderHook(() => useColumnChooserManager(initialColumns, lockedLeftItems));

		expect(result.current.columns).toEqual([
			{ key: 'id', label: 'Id', locked: true, order: 1, visible: true },
			{ key: 'name', label: 'Name', locked: true, order: 2, visible: true },
			{ key: 'author', label: 'Author', order: 3, visible: true, locked: false },
			{ key: 'modified', label: 'Modified', order: 4, visible: true, locked: false },
			{ key: 'icon', label: 'Icon', order: 5, visible: true, locked: true },
			{ key: 'created', label: 'Created', order: 6, visible: true, locked: false },
		]);
	});

	it('should change the visible property of the third column', () => {
		const { result } = renderHook(() => useColumnChooserManager(initialColumns, lockedLeftItems));

		// when
		expect(result.current.columns[2].visible).toBe(true);
		act(() => result.current.onChangeVisibility(false, 'Author'));
		// then
		expect(result.current.columns[2].visible).toBe(false);
	});

	it('should not change the visible property of the second column which is locked', () => {
		const { result } = renderHook(() => useColumnChooserManager(initialColumns, lockedLeftItems));

		// when
		expect(result.current.columns[1].visible).toBe(true);
		act(() => result.current.onChangeVisibility(false, 'Name'));
		// then
		expect(result.current.columns[1].visible).toBe(true);
	});

	it('should change the visible value of every column except the locked ones', () => {
		const { result } = renderHook(() => useColumnChooserManager(initialColumns, lockedLeftItems));

		// when
		expect(result.current.columns[0].visible).toBe(true);
		expect(result.current.columns[1].visible).toBe(true);
		expect(result.current.columns[2].visible).toBe(true);
		expect(result.current.columns[3].visible).toBe(true);
		expect(result.current.columns[4].visible).toBe(true);
		act(() => result.current.onSelectAll(false));
		// then
		expect(result.current.columns[0].visible).toBe(true);
		expect(result.current.columns[1].visible).toBe(true);
		expect(result.current.columns[2].visible).toBe(false);
		expect(result.current.columns[3].visible).toBe(false);
		expect(result.current.columns[4].visible).toBe(true);
	});

	it('should filter the list of columns', () => {
		const { result } = renderHook(() => useColumnChooserManager(initialColumns, lockedLeftItems));
		// when
		act(() => result.current.setTextFilter('d'));

		// then
		expect(result.current.filteredColumns).toHaveLength(3);
		expect(result.current.filteredColumns[0].label).toEqual('Id');
		expect(result.current.filteredColumns[1].label).toEqual('Modified');
		expect(result.current.filteredColumns[2].label).toEqual('Created');
	});

	it('should set selectAll value according the shown columns in the chooser', () => {
		const { result } = renderHook(() => useColumnChooserManager(initialColumns, lockedLeftItems));

		// Uncheck every column
		act(() => result.current.onSelectAll(false));
		// Check "Modified" and "Created"
		act(() => result.current.onChangeVisibility(true, 'Modified'));
		act(() => result.current.onChangeVisibility(true, 'Created'));
		// Filter columns to only have previously checked ones
		act(() => result.current.setTextFilter('d'));

		// then
		expect(result.current.selectAll).toBe(true);
	});

	it('should `selectAll` be undefined if only some columns are shown', () => {
		const { result } = renderHook(() => useColumnChooserManager(initialColumns, lockedLeftItems));

		// Uncheck every column
		act(() => result.current.onSelectAll(false));
		// Check "Modified" and "Created"
		act(() => result.current.onChangeVisibility(true, 'Modified'));
		act(() => result.current.onChangeVisibility(true, 'Created'));
		// then
		expect(result.current.selectAll).toBeUndefined();
	});

	it('should only toggle the filtered items visibilities when using select all', () => {
		const { result } = renderHook(() => useColumnChooserManager(initialColumns, lockedLeftItems));

		// when
		act(() => result.current.onSelectAll(true));
		act(() => result.current.setTextFilter('d'));
		act(() => result.current.onSelectAll(false));

		// then
		expect(result.current.columns[0].visible).toBe(true);
		expect(result.current.columns[1].visible).toBe(true);
		expect(result.current.columns[2].visible).toBe(true);
		expect(result.current.columns[3].visible).toBe(false);
		expect(result.current.columns[4].visible).toBe(true);
		expect(result.current.columns[5].visible).toBe(false);
	});
});
