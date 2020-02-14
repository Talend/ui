import React from 'react';
import cases from 'jest-in-case';
import { shallow, mount } from 'enzyme';
import CollapsiblePanel, { TYPE_ACTION } from '@talend/react-components/lib/CollapsiblePanel';
import createCollapsibleFieldset, { defaultTitle } from './CollapsibleFieldset.component';

function customTitle(value, schema) {
	return `${schema.title}: ${value.firstname} ${value.lastname}`;
}

const schema = {
	title: 'Basic',
	items: [
		{
			key: ['firstname'],
			title: 'FirstName',
			schema: { type: 'string' },
			type: 'string',
		},
		{
			key: ['lastname'],
			title: 'FirstName',
			schema: { type: 'string' },
			type: 'string',
		},
	],
};

const value = {
	firstname: 'Jimmy',
	lastname: 'Somsanith',
};

describe('CollapsibleFieldset', () => {
	cases(
		'should render',
		opts => {
			// given
			const CollapsibleFieldset = createCollapsibleFieldset(opts.titleFn);

			// when
			const wrapper = shallow(
				<CollapsibleFieldset
					id={'my-fieldset'}
					schema={schema}
					value={{ ...(opts.empty ? {} : value), isClosed: opts.isClosed }}
				/>,
			);

			// then
			expect(wrapper.getElement()).toMatchSnapshot();
		},
		{
			'a full fieldset (header and body)': { isClosed: false },
			'a collapsed fieldset (header only)': { isClosed: true },
			'a custom title': { isClosed: false, titleFn: customTitle },
			'without value': { empty: true },
		},
	);

	it('should toggle', () => {
		// given
		const CollapsibleFieldset = createCollapsibleFieldset();
		const onChange = jest.fn();
		const event = {
			stopPropagation: jest.fn(),
			preventDefault: jest.fn(),
		};

		const wrapper = shallow(
			<CollapsibleFieldset
				id={'my-fieldset'}
				onChange={onChange}
				schema={schema}
				value={{ ...value, isClosed: true }}
			/>,
		);
		// when
		wrapper
			.find(CollapsiblePanel)
			.getElement()
			.props.onToggle(event);

		// then
		expect(event.stopPropagation).toBeCalled();
		expect(event.preventDefault).toBeCalled();
		expect(onChange).toBeCalledWith(event, {
			schema,
			value: { ...value, isClosed: false },
		});
	});

	it('should render Actions component if actions are provided', () => {
		const CollapsibleFieldset = createCollapsibleFieldset();
		const onChange = jest.fn();
		const actions = [{ id: 'action1' }, { id: 'action2' }];

		const wrapper = shallow(
			<CollapsibleFieldset
				id={'my-fieldset'}
				onChange={onChange}
				schema={schema}
				value={value}
				actions={actions}
			/>,
		);
		const header = wrapper
			.find(CollapsiblePanel)
			.dive()
			.getElement().props.header;
		expect(header.length).toBe(2);
		expect(header[1].length).toBe(2);
		expect(header[1][0].id).toBe('action1');
		expect(header[1][0].displayMode).toBe(TYPE_ACTION);
		expect(header[1][1].id).toBe('action2');
		expect(header[1][1].displayMode).toBe(TYPE_ACTION);
	});

	it('should not render Actions component if actions are not provided', () => {
		const CollapsibleFieldset = createCollapsibleFieldset();
		const onChange = jest.fn();

		const wrapper = shallow(
			<CollapsibleFieldset id={'my-fieldset'} onChange={onChange} schema={schema} value={value} />,
		);

		expect(wrapper.exists('Actions')).toEqual(false);
	});
	it('should concat values in case it is used in array', () => {
		const CollapsibleFieldset = createCollapsibleFieldset();
		const onChange = jest.fn();

		const wrapper = mount(
			<CollapsibleFieldset id={'my-fieldset'} onChange={onChange} schema={schema} value={value} />,
		);
		const panel = wrapper.find('CollapsiblePanel');

		expect(panel.props().header[0].label).toEqual(`${value.firstname}, ${value.lastname}`);
	});
});

describe('defaultTitle', () => {
	it('should return schema.title by default', () => {
		// given not used in an array you have the schema.title
		expect(defaultTitle({}, { title: 'Comment' })).toBe('Comment');
		// given no value, you have the schema.title
		expect(defaultTitle({}, schema)).toBe(schema.title);
	});
	it('should return concat values if used in an array', () => {
		expect(defaultTitle(value, schema)).toBe(`${value.firstname}, ${value.lastname}`);
	});
	it('should support option in an array', () => {
		expect(defaultTitle(value, schema, { separator: ' -- || -- ' })).toBe(
			`${value.firstname} -- || -- ${value.lastname}`,
		);
		expect(defaultTitle(value, { ...schema, options: { separator: ' || ' } })).toBe(
			`${value.firstname} || ${value.lastname}`,
		);
	});
});
