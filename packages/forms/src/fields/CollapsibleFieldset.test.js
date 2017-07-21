import React from 'react';
import { shallow, mount } from 'enzyme';
import Form from '../Form';

import createCollapsibleFieldset from './CollapsibleFieldset';

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
		const wrapper = shallow(
			<Form fields={fields} data={schema}>
				<h1>Child</h1>
				<p>This is an inner child in the form</p>
			</Form>
		);
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should collapse on click on title', () => {
		const wrapper = mount(
			<Form fields={fields} data={schema}>
				<h1>Child</h1>
				<p>This is an inner child in the form</p>
			</Form>
		);
		wrapper.find('#root_filters_0__title_wrapper').simulate('click');
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should collapse on click on toggle button', () => {
		const wrapper = mount(
			<Form fields={fields} data={schema}>
				<h1>Child</h1>
				<p>This is an inner child in the form</p>
			</Form>
		);
		wrapper.find('#root_filters_0__collapse').simulate('click');
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should collapse on doubleClick on title bar', () => {
		const wrapper = mount(
			<Form fields={fields} data={schema}>
				<h1>Child</h1>
				<p>This is an inner child in the form</p>
			</Form>
		);
		wrapper.find('#root_filters_0__title_bar').simulate('doubleClick');
		expect(wrapper.html()).toMatchSnapshot();
	});
});
