import React from 'react';
import { mount } from 'enzyme';
import {
	useColumnChooserManager,
	changeAttribute,
	organiseEditedColumns,
} from './columnChooserManager.hook';

describe('changeColumnAttribute', () => {
	const key = 'myAttr';
	const changeMyAttr = changeAttribute(key);
	it('should change the collection index', () => {
		// given
		const value = 'myNewValue';
		const index = 0;
		const collection = [{ myAttr: 'myOldValue' }];
		// when
		changeMyAttr(value, index)(collection);
		// then
		expect(collection).toEqual([{ myAttr: 'myNewValue' }]);
	});
	it('should change the object key', () => {
		// given
		const value = 'myNewValue';
		const object = { myAttr: 'myOldValue' };
		// when
		changeMyAttr(value)(object);
		// then
		expect(object).toEqual({ myAttr: 'myNewValue' });
	});
});

describe('organiseEditedColumns', () => {
	it('should return the collection organised with correct order', () => {
		// given
		const collection = [
			{ label: 'first', order: 18 },
			{ label: 'third', order: 105 },
			{ label: 'second', order: 27 },
		];
		// when
		organiseEditedColumns(collection);
		// then
		expect(collection).toEqual([
			{ label: 'first', order: 1 },
			{ label: 'second', order: 2 },
			{ label: 'third', order: 3 },
		]);
	});
});

describe('useColumnChooserManager', () => {
	const columns = [
		{
			hidden: false,
			label: 'label1',
			locked: true,
			order: 1,
		},
		{
			hidden: true,
			label: 'label2',
			locked: false,
			order: 2,
		},
		{
			hidden: false,
			label: 'label3',
			locked: false,
			order: 3,
		},
	];
	const customSubmit = jest.fn();
	it('should call the customSubmit', () => {
		// given
		const event = {};
		const MyTestComponent = () => {
			const { onSubmitColumnChooser } = useColumnChooserManager(columns, customSubmit);
			function onClick() {
				onSubmitColumnChooser(event);
			}
			return <button onClick={onClick}>TestComponent</button>;
		};
		// when
		const wrapper = mount(<MyTestComponent />);
		wrapper.find('button').simulate('click');
		// then
		expect(customSubmit).toHaveBeenCalledWith(event, columns);
	});
	it('should have changed all columns visibility to true', () => {
		// given
		let state;
		const MyTestComponent = () => {
			const { onSelectAll, stateColumnChooser } = useColumnChooserManager(columns, customSubmit);
			state = stateColumnChooser;
			function onClick() {
				onSelectAll(!stateColumnChooser.selectAll);
			}
			return <button onClick={onClick}>TestComponent</button>;
		};
		// when
		const wrapper = mount(<MyTestComponent />);
		wrapper.find('button').simulate('click');
		// then
		expect(state.editedColumns).toEqual([
			{ hidden: false, label: 'label1', locked: true, order: 1 },
			{ hidden: true, label: 'label2', locked: false, order: 2 },
			{ hidden: true, label: 'label3', locked: false, order: 3 },
		]);
	});
	it('should have changed order of two items (onBlur)', () => {
		// given
		let state;
		const event = {};
		const MyTestComponent = () => {
			const { onBlurInputTextOrder, stateColumnChooser } = useColumnChooserManager(
				columns,
				customSubmit,
			);
			state = stateColumnChooser;
			function onClick() {
				onBlurInputTextOrder(2)(event, 2);
			}
			return <button onClick={onClick}>TestComponent</button>;
		};
		// when
		const wrapper = mount(<MyTestComponent />);
		wrapper.find('button').simulate('click');
		// then
		expect(state.editedColumns).toEqual([
			{ hidden: false, label: 'label1', locked: true, order: 1 },
			{ hidden: false, label: 'label3', locked: false, order: 2 },
			{ hidden: true, label: 'label2', locked: false, order: 3 },
		]);
	});
	it('should have changed order of two items (onKeyPress)', () => {
		// given
		let state;
		const event = {};
		const MyTestComponent = () => {
			const { onKeyPressInputTextOrder, stateColumnChooser } = useColumnChooserManager(
				columns,
				customSubmit,
			);
			state = stateColumnChooser;
			function onClick() {
				onKeyPressInputTextOrder(2)(event, 2);
			}
			return <button onClick={onClick}>TestComponent</button>;
		};
		// when
		const wrapper = mount(<MyTestComponent />);
		wrapper.find('button').simulate('click');
		// then
		expect(state.editedColumns).toEqual([
			{ hidden: false, label: 'label1', locked: true, order: 1 },
			{ hidden: false, label: 'label3', locked: false, order: 2 },
			{ hidden: true, label: 'label2', locked: false, order: 3 },
		]);
	});
	it('should have changed visibility of one item', () => {
		// given
		let state;
		const event = {};
		const MyTestComponent = () => {
			const { onChangeVisibility, stateColumnChooser } = useColumnChooserManager(
				columns,
				customSubmit,
			);
			state = stateColumnChooser;
			function onClick() {
				onChangeVisibility(2)(event, true);
			}
			return <button onClick={onClick}>TestComponent</button>;
		};
		// when
		const wrapper = mount(<MyTestComponent />);
		wrapper.find('button').simulate('click');
		// then
		expect(state.editedColumns).toEqual([
			{ hidden: false, label: 'label1', locked: true, order: 1 },
			{ hidden: true, label: 'label2', locked: false, order: 2 },
			{ hidden: true, label: 'label3', locked: false, order: 3 },
		]);
	});
});
