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
});
