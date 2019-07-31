import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { MultiSelectTagWidgetComponent, transformOptions } from './MultiSelectTagWidget';

describe('MultiSelectTagWidget', () => {
	it('should render multiSelectTagWidget', () => {
		// given
		const options = {
			enumOptions: [
				{
					value: 'foo-1',
					label: 'Foo',
				},
				{
					value: 'bar-1',
					label: 'Bar',
				},
			],
		};

		const value = ['foo-1'];

		const schema = {
			createIfNoneMatch: false,
			noAvailableMessage: 'None',
		};

		const wrapper = shallow(
			<MultiSelectTagWidgetComponent options={options} schema={schema} value={value} />,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render multiSelectTagWidget dropdown', () => {
		// given
		const options = {
			enumOptions: [
				{
					value: 'foo-1',
					label: 'Foo',
				},
				{
					value: 'bar-1',
					label: 'Bar',
				},
			],
		};

		const value = ['foo-1'];

		const schema = {
			createIfNoneMatch: false,
			noAvailableMessage: 'None',
		};

		const wrapper = mount(
			<MultiSelectTagWidgetComponent options={options} schema={schema} value={value} />,
		);

		// when
		wrapper
			.find('input')
			.at(0)
			.simulate('click');
		wrapper
			.find('input')
			.at(0)
			.simulate('change', { target: { value: '' } });

		// then
		expect(toJson(wrapper.find('.items-container'), { mode: 'deep' })).toMatchSnapshot();
	});

	it('should take default message when there isnt items', () => {
		// given
		const options = {
			enumOptions: [
				{
					value: 'foo-1',
					label: 'Foo',
				},
				{
					value: 'bar-1',
					label: 'Bar',
				},
			],
		};

		const value = ['foo-1'];

		const schema = {
			createIfNoneMatch: false,
		};

		const wrapper = mount(
			<MultiSelectTagWidgetComponent options={options} schema={schema} value={value} />,
		);

		// when
		wrapper
			.find('input')
			.at(0)
			.simulate('focus');
		wrapper
			.find('input')
			.at(0)
			.simulate('change', { target: { value: 'lol' } });

		// then
		expect(toJson(wrapper.find('.items-container'), { mode: 'deep' })).toMatchSnapshot();
	});

	it('should render section title when items has category', () => {
		// given
		const options = {
			enumOptions: [
				{
					value: 'apple',
					label: {
						label: 'Apple',
						group: 'fruit',
					},
				},
				{
					value: 'dog',
					label: {
						label: 'Puppy',
						group: 'pet',
					},
				},
			],
			groupBy: 'group',
		};

		const value = ['apple'];

		const schema = {
			createIfNoneMatch: false,
		};

		const wrapper = mount(
			<MultiSelectTagWidgetComponent options={options} schema={schema} value={value} />,
		);

		// when
		wrapper.find('input').simulate('focus');

		// then
		expect(toJson(wrapper.find('.items-container'), { mode: 'deep' })).toMatchSnapshot();
	});

	it('should return a default value', () => {
		expect(transformOptions({})).toEqual([]);
	});
});
