import React from 'react';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Form from '../Form';

import createCollapsibleFieldset from './CollapsibleFieldset';
import ArrayFieldTemplate from '../templates/ArrayFieldTemplate';

describe('<CollapsibleFieldset />', () => {
	const fields = {
		CollapsibleFieldset: createCollapsibleFieldset(() => <h1>Titre</h1>),
	};
	const schema = {
		jsonSchema: {
			title: 'A filter form',
			description: '',
			type: 'object',
			properties: {
				filters: {
					type: 'array',
					title: 'A list of strings',
					minItems: 1,
					maxItems: 2,
					items: {
						type: 'object',
						properties: {
							isClosed: {
								type: 'boolean',
							},
							function: {
								type: 'string',
								enum: ['upperCase', 'lowerCase'],
							},
						},
					},
				},
			},
		},
		uiSchema: {
			filters: {
				items: {
					'ui:field': 'CollapsibleFieldset',
				},
			},
		},
		properties: {
			filters: [
				{
					isClosed: false,
					function: 'upperCase',
				},
			],
		},
	};

	it('should render', () => {
		const wrapper = mount(
			<Form fields={fields} data={schema}>
				<h1>Child</h1>
				<p>This is an inner child in the form</p>
			</Form>,
		);
		expect(toJSON(wrapper.find('CollapsibleFieldset'))).toMatchSnapshot();
	});

	it('should collapse on click on title', () => {
		const wrapper = mount(
			<Form fields={fields} data={schema}>
				<h1>Child</h1>
				<p>This is an inner child in the form</p>
			</Form>,
		);
		wrapper.find('#root_filters_0__title_wrapper').simulate('click');
		expect(toJSON(wrapper.find('CollapsibleFieldset'))).toMatchSnapshot();
	});

	it('should collapse on click on toggle button', () => {
		const wrapper = mount(
			<Form fields={fields} data={schema}>
				<h1>Child</h1>
				<p>This is an inner child in the form</p>
			</Form>,
		);
		wrapper.find('#root_filters_0__collapse').simulate('click');
		expect(toJSON(wrapper.find('CollapsibleFieldset'))).toMatchSnapshot();
	});

	it('should collapse on doubleClick on title bar', () => {
		const wrapper = mount(
			<Form fields={fields} data={schema}>
				<h1>Child</h1>
				<p>This is an inner child in the form</p>
			</Form>,
		);
		wrapper.find('#root_filters_0__title_bar').simulate('doubleClick');
		expect(toJSON(wrapper.find('CollapsibleFieldset'))).toMatchSnapshot();
	});

	it('should handle minItems', () => {
		const wrapper = mount(
			<Form fields={fields} data={schema} ArrayFieldTemplate={ArrayFieldTemplate}>
				<h1>Child</h1>
				<p>This is an inner child in the form</p>
			</Form>,
		);
		expect(wrapper.find("button[name='btn-delete-element-0']").prop('disabled')).toBeTruthy();
	});

	it('should handle maxItems', () => {
		schema.properties.filters = [
			{
				isClosed: false,
				function: 'upperCase',
			},
			{
				isClosed: false,
				function: 'upperCase',
			},
		];
		const wrapper = mount(
			<Form fields={fields} data={schema} ArrayFieldTemplate={ArrayFieldTemplate}>
				<h1>Child</h1>
				<p>This is an inner child in the form</p>
			</Form>,
		);
		expect(wrapper.find("button[name='btn-new-element']").prop('disabled')).toBeTruthy();
	});
});
