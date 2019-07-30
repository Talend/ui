import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { useColumnChooserManager } from './columnChooserManager.hook';

const initialColumns = [
	{
		key: 'id',
		label: 'Id',
		order: 1,
	},
	{
		key: 'name',
		label: 'Name',
		order: 2,
	},
	{
		key: 'author',
		label: 'Author',
		order: 3,
	},
	{
		key: 'created',
		label: 'Created',
		order: 6,
	},
	{
		key: 'modified',
		label: 'Modified',
		order: 4,
		header: 'icon',
		data: {
			iconName: 'talend-scheduler',
		},
	},
	{
		key: 'icon',
		label: 'Icon',
		hidden: true,
		order: 5,
	},
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
		testHook(() => (columnChooserHook = useColumnChooserManager(initialColumns, lockedLeftItems))),
	);
	it('should have no columns defined', () => {
		// given nothing
		let hookWithNoValue;
		// when mounting component
		testHook(() => (hookWithNoValue = useColumnChooserManager()));
		expect(hookWithNoValue.columnsChooser).toEqual([]);
	});
	it('should have columns with some the first two left locked', () => {
		// given before each
		// when mounting before each
		// then
		expect(columnChooserHook.columnsChooser).toEqual([
			{ hidden: undefined, label: 'Id', locked: true, order: 1 },
			{ hidden: undefined, label: 'Name', locked: true, order: 2 },
			{ hidden: undefined, label: 'Author', order: 3 },
			{ hidden: undefined, label: 'Modified', order: 4 },
			{ hidden: true, label: 'Icon', order: 5 },
			{ hidden: undefined, label: 'Created', order: 6 },
		]);
	});
	it('should change the hidden property of the third column', () => {
		// given before each
		// when
		expect(columnChooserHook.columnsChooser[2].hidden).toBe(undefined);
		act(() => columnChooserHook.onChangeVisibility(2, true));
		// then
		expect(columnChooserHook.columnsChooser[2].hidden).toBe(true);
	});
	it('should not change the hidden property of the second column which is locked', () => {
		// given before each
		// when
		expect(columnChooserHook.columnsChooser[1].hidden).toBe(undefined);
		act(() => columnChooserHook.onChangeVisibility(1, true));
		// then
		expect(columnChooserHook.columnsChooser[1].hidden).toBe(undefined);
	});
	it('should change the hidden value of every column except the locked ones', () => {
		// given before each
		// when
		expect(columnChooserHook.columnsChooser[0].hidden).toBe(undefined);
		expect(columnChooserHook.columnsChooser[1].hidden).toBe(undefined);
		expect(columnChooserHook.columnsChooser[2].hidden).toBe(undefined);
		expect(columnChooserHook.columnsChooser[3].hidden).toBe(undefined);
		expect(columnChooserHook.columnsChooser[4].hidden).toBe(true);
		act(() => columnChooserHook.onSelectAll(false));
		// then
		expect(columnChooserHook.columnsChooser[0].hidden).toBe(undefined);
		expect(columnChooserHook.columnsChooser[1].hidden).toBe(undefined);
		expect(columnChooserHook.columnsChooser[2].hidden).toBe(true);
		expect(columnChooserHook.columnsChooser[3].hidden).toBe(true);
		expect(columnChooserHook.columnsChooser[4].hidden).toBe(true);
	});
});
