import React from 'react';
import { shallow } from 'enzyme';
import createCollapsibleFieldset from './CollapsibleFieldset.component';

function customTitle(value, schema) {
	return `${schema.title}: ${value.firstname} ${value.lastname}`;
}

const schema = {
	title: 'Basic',
	items: [
		{
			key: ['age'],
			title: 'Age',
			schema: { type: 'number' },
			type: 'number',
		},
		{
			key: ['address'],
			title: 'Adress',
			schema: { type: 'string' },
			type: 'text',
		},
	],
};

const value = {
	firstname: 'Jimmy',
	lastname: 'Somsanith',
	isClosed: false,
};

describe('CollapsibleFieldset', () => {
	it('should render a full fieldset (header and body)', () => {
		// given
		const CollapsibleFieldset = createCollapsibleFieldset();

		// when
		const wrapper = shallow(<CollapsibleFieldset
			id={'my-fieldset'}
			schema={schema}
			value={value}
		/>);

		// then
		expect(wrapper.getNode()).toMatchSnapshot();
	});

	it('should render a collapsed fieldset (header only)', () => {
		// given
		const CollapsibleFieldset = createCollapsibleFieldset();

		// when
		const wrapper = shallow(<CollapsibleFieldset
			id={'my-fieldset'}
			schema={schema}
			value={{ ...value, isClosed: true }}
		/>);

		// then
		expect(wrapper.getNode()).toMatchSnapshot();
	});

	it('should render a custom title', () => {
		// given
		const CollapsibleFieldset = createCollapsibleFieldset(customTitle);

		// when
		const wrapper = shallow(<CollapsibleFieldset
			id={'my-fieldset'}
			schema={schema}
			value={{ ...value, isClosed: true }}
		/>);

		// then
		expect(wrapper.getNode()).toMatchSnapshot();
	});

	it('should toggle on title click', () => {
		// given
		const CollapsibleFieldset = createCollapsibleFieldset();
		const onChange = jest.fn();
		const event = {
			stopPropagation: jest.fn(),
			preventDefault: jest.fn(),
		};

		const wrapper = shallow(<CollapsibleFieldset
			id={'my-fieldset'}
			onChange={onChange}
			schema={schema}
			value={{ ...value, isClosed: true }}
		/>);

		// when
		wrapper.find('#my-fieldset__title_wrapper').simulate('click', event);

		// then
		expect(event.stopPropagation).toBeCalled();
		expect(event.preventDefault).toBeCalled();
		expect(onChange).toBeCalledWith(event, {
			schema,
			value: { ...value, isClosed: false },
		});
	});

	it('should toggle on header double click', () => {
		// given
		const CollapsibleFieldset = createCollapsibleFieldset();
		const onChange = jest.fn();
		const event = {
			stopPropagation: jest.fn(),
			preventDefault: jest.fn(),
		};

		const wrapper = shallow(<CollapsibleFieldset
			id={'my-fieldset'}
			onChange={onChange}
			schema={schema}
			value={{ ...value, isClosed: true }}
		/>);

		// when
		wrapper.find('#my-fieldset__title_bar').simulate('dblclick', event);

		// then
		expect(event.stopPropagation).toBeCalled();
		expect(event.preventDefault).toBeCalled();
		expect(onChange).toBeCalledWith(event, {
			schema,
			value: { ...value, isClosed: false },
		});
	});

	it('should toggle on icon click', () => {
		// given
		const CollapsibleFieldset = createCollapsibleFieldset();
		const onChange = jest.fn();
		const event = {
			stopPropagation: jest.fn(),
			preventDefault: jest.fn(),
		};

		const wrapper = shallow(<CollapsibleFieldset
			id={'my-fieldset'}
			onChange={onChange}
			schema={schema}
			value={{ ...value, isClosed: true }}
		/>);

		// when
		wrapper.find('#my-fieldset__collapse').simulate('click', event);

		// then
		expect(event.stopPropagation).toBeCalled();
		expect(event.preventDefault).toBeCalled();
		expect(onChange).toBeCalledWith(event, {
			schema,
			value: { ...value, isClosed: false },
		});
	});
});
