import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Typeahead from '@talend/react-components/lib/Typeahead';
import MultiSelectTagWidget from './MultiSelectTagWidget';

describe('MultiSelectTagWidget', () => {
	it('should render multiSelectTagWidget without dropdown', () => {
		// given
		const options = {
			enumOptions: [{
				value: 'foo-1',
				label: 'Foo',
			}, {
				value: 'bar-1',
				label: 'Bar',
			}],
		};

		const value = ['foo-1'];

		const schema = {
			createIfNoneMatch: false,
			noAvailableMessage: 'None',
		};

		const wrapper = shallow(
			<MultiSelectTagWidget
				options={options}
				schema={schema}
				value={value}
			/>
		);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should render multiSelectTagWidget with dropdown', () => {
		// given
		const options = {
			enumOptions: [{
				value: 'foo-1',
				label: 'Foo',
			}, {
				value: 'bar-1',
				label: 'Bar',
			}],
		};

		const value = ['foo-1'];

		const schema = {
			createIfNoneMatch: false,
			noAvailableMessage: 'None',
		};

		const wrapper = mount(
			<MultiSelectTagWidget
				options={options}
				schema={schema}
				value={value}
			/>
		);

		// when
		wrapper.find('input').at(0).simulate('focus');

		// then
		expect(toJson(wrapper.update())).toMatchSnapshot();
	});

	it('should take default message when there isnt items', () => {
		// given
		const options = {
			enumOptions: [{
				value: 'foo-1',
				label: 'Foo',
			}, {
				value: 'bar-1',
				label: 'Bar',
			}],
		};

		const value = ['foo-1'];

		const schema = {
			createIfNoneMatch: false,
		};

		const wrapper = mount(
			<MultiSelectTagWidget
				options={options}
				schema={schema}
				value={value}
			/>
		);

		// when
		wrapper.find('input').at(0).simulate('focus');

		// then
		expect(toJson(wrapper.update())).toMatchSnapshot();
	});
});

describe('MultiSelectTagWidget - with category', () => {
	it('should render section title when items has category', () => {
		// given
		const options = {
			enumOptions: [{
				value: 'apple',
				label: {
					label: 'Apple',
					group: 'fruit',
				},
			}, {
				value: 'dog',
				label: {
					label: 'Puppy',
					group: 'pet',
				},
			}],
			groupBy: 'group',
		};

		const value = ['apple'];

		const schema = {
			createIfNoneMatch: false,
		};

		const wrapper = mount(
			<MultiSelectTagWidget
				options={options}
				schema={schema}
				value={value}
			/>
		);

		// when
		wrapper.find('input').simulate('focus');
		// then
		expect(wrapper.find(Typeahead).props().items).toEqual([{
			suggestions: [{ group: 'pet', label: 'Puppy', title: 'Puppy', value: 'dog' }],
			title: 'pet',
		}]);
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});
