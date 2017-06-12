import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import DatalistWidget, { escapeRegexCharacters, getMatchingSuggestions } from './DatalistWidget';

describe('escapeRegexCharacters', () => {
	it('should escape all regex chars', () => {
		// given
		const unescapedString = 'wxc.*+?^${}()|[]\\aze';
		const expectedString = 'wxc\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\aze';

		// when
		const escapedString = escapeRegexCharacters(unescapedString);

		// then
		expect(escapedString).toBe(expectedString);
	});
});

describe('getMatchingSuggestions', () => {
	it('should filter in case insensitive mode', () => {
		// given
		const value = 'aze';
		const suggestions = [
			'aze',
			'banane',
			'bananAze',
			'   AzErTy   ',
			'Toto',
		];

		// when
		const filteredSuggestions = getMatchingSuggestions(suggestions, value);

		// then
		expect(filteredSuggestions).toEqual([
			'aze',
			'bananAze',
			'   AzErTy   ',
		]);
	});

	it('should filter with special chars', () => {
		// given
		const value = 'az[e';
		const suggestions = [
			'aze',
			'banane',
			'bananaz[e',
			'   az[erty   ',
		];

		// when
		const filteredSuggestions = getMatchingSuggestions(suggestions, value);

		// then
		expect(filteredSuggestions).toEqual([
			'bananaz[e',
			'   az[erty   ',
		]);
	});
});

describe('DatalistWidget', () => {
	const schema = {
		enum: [
			'aze',
			'banane',
			'bananAze',
			'   AzErTy   ',
			'Toto',
		],
	};

	it('should render input', () => {
		// when
		const wrapper = renderer.create(
			<DatalistWidget
				id="myWidget"
				required
				schema={{}}
				onChange={jest.fn()}
			/>
		).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render "no match" message', () => {
		// given
		const wrapper = mount(
			<DatalistWidget
				id="myWidget"
				required
				schema={schema}
				onChange={jest.fn()}
			/>
		);

		// when
		wrapper.find('input').at(0).simulate('change', { target: { value: 'noMatchingValue' } });

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should render all suggestions on focus', () => {
		// given
		const wrapper = mount(
			<DatalistWidget
				id="myWidget"
				required
				schema={schema}
				onChange={jest.fn()}
			/>
		);

		// when
		wrapper.find('input').at(0).simulate('focus');

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should render hightlighted matching suggestions on value change', () => {
		// given
		const wrapper = mount(
			<DatalistWidget
				id="myWidget"
				required
				schema={schema}
				onChange={jest.fn()}
			/>
		);

		// when
		wrapper.find('input').at(0).simulate('change', { target: { value: 'aze' } });

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should set value and reset suggestions on suggestion selection', () => {
		// given
		const onChange = jest.fn();
		const wrapper = mount(
			<DatalistWidget
				id="myWidget"
				required
				schema={schema}
				onChange={onChange}
			/>
		);
		wrapper.find('input').at(0).simulate('focus'); // to display suggestions

		// when
		wrapper.find('#react-autowhatever-myWidget--item-0').simulate('mouseDown');

		// then
		expect(onChange).toBeCalledWith('aze');
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should reset value on unknown value input blur', () => {
		// given
		const onChange = jest.fn();
		const wrapper = mount(
			<DatalistWidget
				id="myWidget"
				required
				schema={schema}
				onChange={onChange}
				options={{ restricted: true }}
			/>
		);
		const input = wrapper.find('input').at(0);
		input.simulate('change', { target: { value: 'unknown' } });

		// when
		input.simulate('blur');

		// then
		expect(onChange).not.toBeCalled();
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should handle arbitrary input if not restricted', () => {
		const onChange = jest.fn();
		const wrapper = mount(
			<DatalistWidget
				id="myWidget"
				required
				schema={{}}
				onChange={onChange}
				options={{ restricted: false }}
			/>
		);
		const input = wrapper.find('input').at(0);
		input.simulate('change', { target: { value: 'unknown' } });

		// when
		input.simulate('blur');

		// then
		expect(onChange).toBeCalled();
		expect(onChange.mock.calls[0][0]).toBe('unknown');
		expect(wrapper.find('Autowhatever').props().inputProps.value).toBe('unknown');
	});
});
