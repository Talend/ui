import React from 'react';
import { shallow } from 'enzyme';
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
		const wrapper = shallow(titleInstance);
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
				displayModeKey: 'displayMode', // input display mode
				onChange: jest.fn(), // provided change callback
				onCancel: jest.fn(), // provided cancel callback
			},
		};
		const titleInstance = <ItemTitle {...props} />;

		// when
		const wrapper = shallow(titleInstance);
		wrapper.find('input').simulate('blur');

		// then
		expect(props.titleProps.onChange).toBeCalled();
		const callArgs = props.titleProps.onChange.mock.calls[0];
		expect(callArgs[1]).toBe(item);
	});

	it('should trigger callback on input title ENTER', () => {
		// given
		const props = {
			className: 'my-title',
			item,
			titleProps: {
				key: 'name',
				displayModeKey: 'displayMode', // input display mode
				onChange: jest.fn(), // provided change callback
				onCancel: jest.fn(), // provided cancel callback
			},
		};
		const titleInstance = <ItemTitle {...props} />;

		// when
		const wrapper = shallow(titleInstance);
		wrapper.find('input').simulate('keyUp', { keyCode: 13 });

		// then
		expect(props.titleProps.onChange).toBeCalled();
		const callArgs = props.titleProps.onChange.mock.calls[0];
		expect(callArgs[1]).toBe(item);
	});

	it('should trigger callback on input title ESC', () => {
		// given
		const props = {
			className: 'my-title',
			item,
			titleProps: {
				key: 'name',
				displayModeKey: 'displayMode', // input display mode
				onChange: jest.fn(), // provided change callback
				onCancel: jest.fn(), // provided cancel callback
			},
		};
		const titleInstance = <ItemTitle {...props} />;

		// when
		const wrapper = shallow(titleInstance);
		wrapper.find('input').simulate('keyUp', { keyCode: 27 });

		// then
		expect(props.titleProps.onCancel).toBeCalled();
		const callArgs = props.titleProps.onCancel.mock.calls[0];
		expect(callArgs[1]).toBe(item);
	});
});
