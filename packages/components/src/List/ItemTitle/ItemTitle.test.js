import React from 'react';
import { mount } from 'enzyme';
import { Button } from 'react-bootstrap';

import ItemTitle from './ItemTitle.component';

const item = {
	id: 1,
	name: 'Hello world',
	created: '2016-09-22',
	modified: '2016-09-22',
	author: 'Jean-Pierre DUPONT',
	icon: 'fa fa-file-excel-o',
	displayMode: 'input',
};

describe('ItemTitle', () => {
	it('should trigger callback on button title click', () => {
		// given
		const props = {
			className: 'my-title',
			item,
			titleProps: {
				key: 'name',
				displayModeKey: undefined, // no display mode in item, default 'text'
				onClick: jest.fn(), // provided click callback
			},
		};
		const titleInstance = <ItemTitle {...props} />;

		// when
		const wrapper = mount(titleInstance);
		wrapper.find(Button).simulate('click', { stopPropagation: () => {} });

		// then
		expect(props.titleProps.onClick).toBeCalled();
		const callArgs = props.titleProps.onClick.mock.calls[0];
		expect(callArgs[1]).toBe(item);
	});

	it('should trigger callback on input title blur', () => {
		// given
		const props = {
			className: 'my-title',
			item,
			titleProps: {
				key: 'name',
				displayModeKey: 'displayMode',
				onEditSubmit: jest.fn(),
				onEditCancel: jest.fn(),
			},
		};
		const titleInstance = <ItemTitle {...props} />;

		// when
		const wrapper = mount(titleInstance);
		wrapper.find('input').simulate('blur', { target: { value: 'my new title' } });

		// then
		expect(props.titleProps.onEditSubmit).toBeCalled();
		const callArgs = props.titleProps.onEditSubmit.mock.calls[0];
		expect(callArgs[1]).toEqual({ value: 'my new title', model: item });
	});

	it('should trigger callback on input title ENTER', () => {
		// given
		const props = {
			className: 'my-title',
			item,
			titleProps: {
				key: 'name',
				displayModeKey: 'displayMode',
				onEditSubmit: jest.fn(),
				onEditCancel: jest.fn(),
			},
		};
		const titleInstance = <ItemTitle {...props} />;

		// when
		const wrapper = mount(titleInstance);
		wrapper.find('input').simulate('keyUp', { keyCode: 13, target: { value: 'my new title' } });

		// then
		expect(props.titleProps.onEditSubmit).toBeCalled();
		const callArgs = props.titleProps.onEditSubmit.mock.calls[0];
		expect(callArgs[1]).toEqual({ value: 'my new title', model: item });
	});

	it('should trigger callback on input title ESC', () => {
		// given
		const props = {
			className: 'my-title',
			item,
			titleProps: {
				key: 'name',
				displayModeKey: 'displayMode',
				onEditSubmit: jest.fn(),
				onEditCancel: jest.fn(),
			},
		};
		const titleInstance = <ItemTitle {...props} />;

		// when
		const wrapper = mount(titleInstance);
		wrapper.find('input').simulate('keyUp', { keyCode: 27 });

		// then
		expect(props.titleProps.onEditCancel).toBeCalled();
		const callArgs = props.titleProps.onEditCancel.mock.calls[0];
		expect(callArgs[1]).toBe(item);
	});
});
