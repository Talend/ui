import React from 'react';
import { mount, shallow } from 'enzyme';
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
	it('should render text title', () => {
		// given
		const props = {
			id: 'title',
			className: 'my-title',
			item,
			titleProps: {
				key: 'name',
				displayModeKey: undefined, // no display mode in item
				onClick: undefined, // no click callback
			},
		};

		// when
		const wrapper = shallow(<ItemTitle {...props} />);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});

	it('should render button title', () => {
		// given
		const props = {
			id: 'title',
			className: 'my-title',
			item,
			titleProps: {
				key: 'name',
				displayModeKey: undefined, // no display mode in item
				onClick: jest.fn(), // provided click callback
			},
		};

		// when
		const wrapper = shallow(<ItemTitle {...props} />);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});

	it('should render input title', () => {
		// given
		const props = {
			id: 'title',
			className: 'my-title',
			item,
			titleProps: {
				key: 'name',
				displayModeKey: 'displayMode', // item.displayMode is the provided display mode
			},
		};

		// when
		const wrapper = shallow(<ItemTitle {...props} />);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});

	it('should render icon', () => {
		// given
		const props = {
			className: 'my-title',
			item,
			titleProps: {
				key: 'name',
				iconKey: 'icon', // item.icon is the icon name
			},
		};

		// when
		const wrapper = shallow(<ItemTitle {...props} />);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});

	it('should render text with undefined', () => {
		const props = {
			id: 'title',
			className: 'my-title',
			item: {},
			titleProps: {
				key: 'name',
				displayModeKey: undefined, // no display mode in item
				onClick: undefined, // no click callback
			},
		};
		const wrapper = shallow(<ItemTitle {...props} />);
		expect(wrapper.node).toMatchSnapshot();
	});

	it('should trigger callback on button title click (left click)', () => {
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
		wrapper.find(Button).simulate('click', { button: 0, stopPropagation: () => {} });

		// then
		expect(props.titleProps.onClick).toBeCalledWith(expect.anything(), item);
	});

	it('should trigger callback on button title mousedown (middle-click)', () => {
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
		wrapper.find(Button).simulate('mouseDown', { button: 1, stopPropagation: () => {} });

		// then
		expect(props.titleProps.onClick).toBeCalledWith(expect.anything(), item);
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
