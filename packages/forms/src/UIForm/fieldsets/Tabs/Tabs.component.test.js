import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import Tabs from './Tabs.component';
import widgets from '../../utils/widgets';
import { UIFormContext } from '../../context';

// eslint-disable-next-line react/prop-types
const ContextProvider = ({ errors, children }) => (
	<UIFormContext.Provider
		value={{ id: 'my-form', onFinish: jest.fn(), onChange: jest.fn(), state: { errors }, widgets }}
	>
		{children}
	</UIFormContext.Provider>
);

describe('Tabs widget', () => {
	it('should render fieldset', () => {
		// given
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
		const wrapper = mount(
			<ContextProvider errors={{}}>
				<Tabs.WrappedComponent schema={schema} />
			</ContextProvider>,
		);

		// then
		expect(toJson(wrapper.find('.tc-tab-bar'))).toMatchSnapshot();
		expect(
			wrapper
				.find('fieldset')
				.at(0)
				.find('input#my-form_user_firstname').length,
		).toBe(1);
		expect(
			wrapper
				.find('fieldset')
				.at(0)
				.find('input#my-form_user_lastname').length,
		).toBe(1);
		expect(
			wrapper
				.find('fieldset')
				.at(1)
				.find('input#my-form_user_comment').length,
		).toBe(0);
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
		const wrapper = mount(
			<ContextProvider errors={errors}>
				<Tabs.WrappedComponent schema={schema} />
			</ContextProvider>,
		);
		const invalidItem = wrapper.find('li').at(0);

		// then
		expect(invalidItem.prop('className')).toBe('theme-has-error active');
	});
});
