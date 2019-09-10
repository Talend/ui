import React from 'react';
import { shallow } from 'enzyme';

import Tabs from './Tabs.component';

describe('Tabs widget', () => {
	it('should render fieldset', () => {
		// given
		const errors = {};
		const schema = {
			title: 'My Tabs',
			items: [
				{
					title: 'User',
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
				},
				{
					title: 'Other',
					items: [
						{
							key: ['comment'],
							type: 'text',
							schema: { type: 'string' },
						},
					],
				},
			],
		};

		// when
		const wrapper = shallow(<Tabs.WrappedComponent schema={schema} errors={errors} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render invalid tab', () => {
		// given
		const errors = { 'user,firstname': 'This is wrong' };
		const schema = {
			title: 'My Tabs',
			items: [
				{
					title: 'User',
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
				},
				{
					title: 'Other',
					items: [
						{
							key: ['comment'],
							type: 'text',
							schema: { type: 'string' },
						},
					],
				},
			],
		};

		// when
		const wrapper = shallow(<Tabs.WrappedComponent schema={schema} errors={errors} />);
		const invalidItem = wrapper.prop('items')[0];

		// then
		expect(invalidItem.className).toBe('theme-has-error');
	});
});
