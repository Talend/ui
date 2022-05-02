import React from 'react';
import { shallow } from 'enzyme';

import Fieldset from './Fieldset.component';

describe('Fieldset widget', () => {
	it('should render fieldset', () => {
		// given
		const schema = {
			title: 'My fieldset',
			items: [
				{
					key: ['user', 'firstname'],
					type: 'text',
					schema: { type: 'string' },
				},
				{
					key: ['user', 'lastname'],
					type: 'text',
					schema: { type: 'string' },
				},
			],
		};

		// when
		const wrapper = shallow(<Fieldset schema={schema} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render fieldset with nested condition', () => {
		// given
		const schema = {
			items: [
				{
					key: ['configuration', 'fields', 0, 'type'],
					placeholder: 'Select a field type',
					required: true,
					restricted: true,
					title: 'Type',
					titleMap: [
						{ name: 'Age', value: 'AGE' },
						{ name: 'Free text', value: 'FREETEXT' },
					],
					widget: 'datalist',
					schema: { default: 'FULLNAME', enum: ['AGE', 'FREETEXT'], title: 'Type', type: 'string' },
					ngModelOptions: {},
					type: 'select',
				},
				{
					condition: { '===': [{ var: 'configuration.fields[].type' }, 'AGE'] },
					key: ['configuration', 'fields', 0, 'max'],
					placeholder: 'max',
					required: true,
					title: 'Max',
					widget: 'text',
					schema: { default: 100, title: 'Max', type: 'number' },
					ngModelOptions: {},
					type: 'number',
				},
				{
					condition: { '===': [{ var: 'configuration.fields[].type' }, 'FREETEXT'] },
					key: ['configuration', 'fields', 0, 'freetext'],
					placeholder: 'Enter any dummy text',
					title: 'Free text',
					widget: 'textarea',
					schema: { default: '', title: 'Free text', type: 'string' },
					ngModelOptions: {},
					type: 'text',
				},
			],
			key: ['configuration', 'fields', 0],
			placeholder: 'fields',
			required: true,
			title: 'fields',
			schema: {
				properties: {
					freetext: { default: '', title: 'Free text', type: 'string' },
					max: { default: 100, title: 'Max', type: 'number' },
					type: { default: 'FULLNAME', enum: ['AGE', 'FREETEXT'], title: 'Type', type: 'string' },
				},
				type: 'object',
			},
			ngModelOptions: {},
			type: 'fieldset',
		};
		const properties = { configuration: { fields: [{ type: 'FREETEXT' }] } };
		// when
		const wrapper = shallow(<Fieldset schema={schema} properties={properties} />);
		const widgets = wrapper.find('Widget');

		// then
		expect(widgets.length).toBe(2);
		expect(widgets.at(1).props().schema.title).toBe('Free text');
	});

	it('should not render fieldset legend without any title', () => {
		// given
		const schema = {
			items: [
				{
					key: ['user', 'firstname'],
					type: 'text',
					schema: { type: 'string' },
				},
				{
					key: ['user', 'lastname'],
					type: 'text',
					schema: { type: 'string' },
				},
			],
		};

		// when
		const wrapper = shallow(<Fieldset schema={schema} />);

		// then
		expect(wrapper.find('legend').length).toBe(0);
	});

	it('should hide title', () => {
		// given
		const schema = {
			title: 'My fieldset',
			items: [
				{
					key: ['user', 'firstname'],
					type: 'text',
					schema: { type: 'string' },
				},
			],
			options: { hideTitle: true },
		};

		// when
		const wrapper = shallow(<Fieldset schema={schema} />);

		// then
		expect(wrapper.find('legend').prop('className')).toBe('sr-only');
	});

	it('should not render if empty', () => {
		// given
		const schema = {
			title: 'My fieldset',
			items: [
				{
					key: ['user', 'firstname'],
					type: 'text',
					schema: { type: 'string' },
					condition: {
						'===': [{ var: 'entity.kind' }, 'human'],
					},
				},
			],
		};

		// when
		const wrapper = shallow(<Fieldset schema={schema} />);

		// then
		expect(wrapper.find('fieldset')).toHaveLength(0);
	});
});
