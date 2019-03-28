import React from 'react';
import cases from 'jest-in-case';
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
					value={{ ...value, isClosed: opts.isClosed }}
				/>,
			);

			// then
			expect(wrapper.getElement()).toMatchSnapshot();
		},
		{
			'a full fieldset (header and body)': { isClosed: false },
			'a collapsed fieldset (header only)': { isClosed: true },
			'a custom title': { isClosed: false, titleFn: customTitle },
		},
	);

	cases(
		'should toggle',
		opts => {
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
			wrapper.find(opts.selector).simulate(opts.actionType, event);

			// then
			expect(event.stopPropagation).toBeCalled();
			expect(event.preventDefault).toBeCalled();
			expect(onChange).toBeCalledWith(event, {
				schema,
				value: { ...value, isClosed: false },
			});
		},
		{
			'on title click': { selector: '#my-fieldset__title_wrapper', actionType: 'click' },
			'on header double click': { selector: '#my-fieldset__title_bar', actionType: 'dblclick' },
			'on icon click': { selector: '#my-fieldset__collapse', actionType: 'click' },
		},
	);

	it('should not render Actions component if no actions are provided', () => {
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

		expect(wrapper.exists('Actions')).toEqual(true);
		expect(wrapper.find('Actions').prop('actions')).toEqual(actions);
	});

	it('should render Actions component if actions are provided', () => {
		const CollapsibleFieldset = createCollapsibleFieldset();
		const onChange = jest.fn();

		const wrapper = shallow(
			<CollapsibleFieldset id={'my-fieldset'} onChange={onChange} schema={schema} value={value} />,
		);

		expect(wrapper.exists('Actions')).toEqual(false);
	});
});
