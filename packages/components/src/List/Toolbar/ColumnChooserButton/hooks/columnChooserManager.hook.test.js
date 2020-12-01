import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { useColumnChooserManager } from './columnChooserManager.hook';

const initialColumns = [
	{ key: 'id', label: 'Id', order: 1 },
	{ key: 'name', label: 'Name', order: 2 },
	{ key: 'author', label: 'Author', order: 3 },
	{ key: 'created', label: 'Created', order: 6 },
	{ key: 'modified', label: 'Modified', order: 4, header: 'icon', data: { iconName: 'talend-scheduler' } },
	{ key: 'icon', label: 'Icon', visible: true, order: 5 },
];

const lockedLeftItems = 2;

const TestHook = ({ hook }) => {
	hook();
	return null;
};

const testHook = hook => {
	mount(<TestHook hook={hook} />);
};

describe('useColumnChooserManager', () => {
	let columnChooserHook;

	beforeEach(() =>
		testHook(() => {
			columnChooserHook = useColumnChooserManager(initialColumns, lockedLeftItems);
		}),
	);

	it('should have no columns defined', () => {
		// given nothing
		let hookWithNoValue;
		// when mounting component
		testHook(() => {
			hookWithNoValue = useColumnChooserManager();
		});
		expect(hookWithNoValue.columns).toEqual([]);
	});

	it('should have some columns with the first two left locked', () => {
		// given before each
		// when mounting before each
		// then
		expect(columnChooserHook.columns).toEqual([
			{ key: 'id', label: 'Id', locked: true, order: 1, visible: true },
			{ key: 'name', label: 'Name', locked: true, order: 2, visible: true },
			{ key: 'author', label: 'Author', order: 3, visible: true },
			{ key: 'modified', label: 'Modified', order: 4, visible: true },
			{ key: 'icon', label: 'Icon', order: 5, visible: true },
			{ key: 'created', label: 'Created', order: 6, visible: true },
		]);
	});

	it('should change the visible property of the third column', () => {
		// given before each
		// when
		expect(columnChooserHook.columns[2].visible).toBe(true);
		act(() => columnChooserHook.onChangeVisibility(false, 'Author'));
		// then
		expect(columnChooserHook.columns[2].visible).toBe(false);
	});

	it('should not change the visible property of the second column which is locked', () => {
		// given before each
		// when
		expect(columnChooserHook.columns[1].visible).toBe(true);
		act(() => columnChooserHook.onChangeVisibility(false, 'Name'));
		// then
		expect(columnChooserHook.columns[1].visible).toBe(true);
	});

	it('should change the visible value of every column except the locked ones', () => {
		// given before each
		// when
		expect(columnChooserHook.columns[0].visible).toBe(true);
		expect(columnChooserHook.columns[1].visible).toBe(true);
		expect(columnChooserHook.columns[2].visible).toBe(true);
		expect(columnChooserHook.columns[3].visible).toBe(true);
		expect(columnChooserHook.columns[4].visible).toBe(true);
		act(() => columnChooserHook.onSelectAll(false));
		// then
		expect(columnChooserHook.columns[0].visible).toBe(true);
		expect(columnChooserHook.columns[1].visible).toBe(true);
		expect(columnChooserHook.columns[2].visible).toBe(false);
		expect(columnChooserHook.columns[3].visible).toBe(false);
		expect(columnChooserHook.columns[4].visible).toBe(false);
	});

	it('should filter the list of columns', () => {
		// given before each
		// when
		act(() => columnChooserHook.setTextFilter('d'));

		// then
		expect(columnChooserHook.filteredColumns).toHaveLength(3);
		expect(columnChooserHook.filteredColumns[0].label).toEqual('Id');
		expect(columnChooserHook.filteredColumns[1].label).toEqual('Modified');
		expect(columnChooserHook.filteredColumns[2].label).toEqual('Created');
	});

	it('should set selectAll value according the shown columns in the chooser', () => {
		// given before each
		// Uncheck every column
		act(() => columnChooserHook.onSelectAll(false));
		// Check "Modified" and "Created"
		act(() => columnChooserHook.onChangeVisibility(true, 'Modified'));
		act(() => columnChooserHook.onChangeVisibility(true, 'Created'));
		// Filter columns to only have previously checked ones
		act(() => columnChooserHook.setTextFilter('d'));

		// then
		expect(columnChooserHook.selectAll).toBe(true);
	});

	it('should only toggle the filtered items visibilities when using select all', () => {
		// given before each
		// when
		act(() => columnChooserHook.onSelectAll(true));
		act(() => columnChooserHook.setTextFilter('d'));
		act(() => columnChooserHook.onSelectAll(false));

		// then
		expect(columnChooserHook.columns[0].visible).toBe(true);
		expect(columnChooserHook.columns[1].visible).toBe(true);
		expect(columnChooserHook.columns[2].visible).toBe(true);
		expect(columnChooserHook.columns[3].visible).toBe(false);
		expect(columnChooserHook.columns[4].visible).toBe(true);
		expect(columnChooserHook.columns[5].visible).toBe(false);
	});
});
