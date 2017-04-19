import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
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

		const wrapper = shallow(
			<MultiSelectTagWidget
				options={options}
				schema={schema}
				value={value}
			/>
		);

		// when
		wrapper.instance().toggleDropDownOptions(true);

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

		const wrapper = shallow(
			<MultiSelectTagWidget
				options={options}
				schema={schema}
				value={value}
			/>
		);

		// when
		wrapper.instance().toggleDropDownOptions(true);

		// then
		expect(toJson(wrapper.update())).toMatchSnapshot();
	});
});
