import React from 'react';
import { mount } from 'enzyme';
import { Button } from 'react-bootstrap';

import ItemEdit from './ItemEdit.component';

const item = {
	id: 1,
	values: ['toto'],
	index: 0,
};

describe('Item', () => {
	it('should display value with two buttons and trigger callback on button title click', () => {
		// given
		const props = {
			item: item,
			itemProps: {
				key: 'values',
				onSubmitItem: jest.fn(), // provided click callback
				onAbortItem: jest.fn(), // provided click callback
				actions: [{
					label: 'Validate',
					id: 'validate',
					onClick: jest.fn(), // provided click callback
				}, {
					label: 'Cancel',
					id: 'cancel',
					onClick: jest.fn(), // provided click callback
				}]
			},
		};
		const itemInstance = <ItemEdit {...props} />;

		// when
		const wrapper = mount(itemInstance);
		const buttons = wrapper.find(Button);

		buttons.at(1).simulate('click', { stopPropagation: () => {} });

		// then
		expect(buttons.length).toBe(2);
		expect(props.itemProps.actions[1].onClick).toBeCalled();
	});

	it('should trigger callback on input title blur', () => {
		// given
		const props = {
			item: item,
			itemProps: {
				key: 'values',
				onSubmitItem: jest.fn(), // provided click callback
				onAbortItem: jest.fn(), // provided click callback
				actions: [{
					label: 'Validate',
					id: 'validate',
					onClick: jest.fn(), // provided click callback
				}, {
					label: 'Cancel',
					id: 'cancel',
					onClick: jest.fn(), // provided click callback
				}]
			},
		};

		const itemEditInstance = <ItemEdit {...props} />;

		// when
		const wrapper = mount(itemEditInstance);
		wrapper.find('input').simulate('blur', { target: { value: 'my new title' } });

		// then
		expect(props.itemProps.onSubmitItem).toBeCalled();
		const callArgs = props.itemProps.onSubmitItem.mock.calls[0];
		expect(callArgs[1]).toEqual({ value: 'my new title', model: props.item, index: 0 });
	});

	it('should trigger callback on input title ENTER', () => {
		// given
		const props = {
			item: item,
			itemProps: {
				key: 'values',
				onSubmitItem: jest.fn(), // provided click callback
				onAbortItem: jest.fn(), // provided click callback
				actions: [{
					label: 'Validate',
					id: 'validate',
					onClick: jest.fn(), // provided click callback
				}, {
					label: 'Cancel',
					id: 'cancel',
					onClick: jest.fn(), // provided click callback
				}]
			},
		};

		const itemEditInstance = <ItemEdit {...props} />;

		// when
		const wrapper = mount(itemEditInstance);
		wrapper.find('input').simulate('keyUp', { keyCode: 13, target: { value: 'my new title' } });

		// then
		expect(props.itemProps.onSubmitItem).toBeCalled();
		const callArgs = props.itemProps.onSubmitItem.mock.calls[0];
		expect(callArgs[1]).toEqual({ value: 'my new title', model: props.item, index: 0  });
	});

	it('should trigger callback on input title ESC', () => {
		// given
		const props = {
			item: item,
			itemProps: {
				key: 'values',
				onSubmitItem: jest.fn(), // provided click callback
				onAbortItem: jest.fn(), // provided click callback
				actions: [{
					label: 'Validate',
					id: 'validate',
					onClick: jest.fn(), // provided click callback
				}, {
					label: 'Cancel',
					id: 'cancel',
					onClick: jest.fn(), // provided click callback
				}]
			},
		};

		const itemEditInstance = <ItemEdit {...props} />;

		// when
		const wrapper = mount(itemEditInstance);
		wrapper.find('input').simulate('keyUp', { keyCode: 27 });

		// then
		expect(props.itemProps.onAbortItem).toBeCalled();
		const callArgs = props.itemProps.onAbortItem.mock.calls[0];
		expect(callArgs[1]).toEqual({ value: 'toto', model: props.item, index: 0  });
	});
});
