import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Autowhatever from 'react-autowhatever';
import keycode from 'keycode';
import Datalist from './Datalist.component';

const schema = {
	autoFocus: true,
	description: 'This is my datalist',
	disabled: false,
	placeholder: 'Type here',
	readOnly: false,
	restricted: true,
	title: 'My List',
	titleMap: [
		{ name: 'foo', value: 'foo' },
		{ name: 'bar', value: 'bar' },
		{ name: 'foobar', value: 'foobar' },
		{ name: 'lol', value: 'lol' },
	],
	type: 'string',
};

describe('Datalist component', () => {
	it('should render typeahead', () => {
		// when
		const wrapper = shallow(
			<Datalist
				id={'my-datalist'}
				isValid
				errorMessage={'This should be correct'}
				onChange={jest.fn()}
				schema={schema}
				value={'foo'}
			/>
		);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});

	it('should update suggestions on value change', () => {
		// given
		const wrapper = mount(
			<Datalist
				id={'my-datalist'}
				isValid
				errorMessage={'This should be correct'}
				onChange={jest.fn()}
				schema={schema}
				value={'foo'}
			/>
		);

		// when
		wrapper.find('input').at(0).simulate('change', { target: { value: 'fo' } });

		// then
		expect(wrapper.find(Autowhatever).props().items).toEqual(['foo', 'foobar']);
	});

	it('should reset suggestions and change value on blur', () => {
		// given
		const onChange = jest.fn();
		const wrapper = mount(
			<Datalist
				id={'my-datalist'}
				isValid
				errorMessage={'This should be correct'}
				onChange={onChange}
				schema={schema}
				value={'foo'}
			/>
		);
		const input = wrapper.find('input').at(0);
		input.simulate('change', { target: { value: 'fo' } });
		expect(wrapper.find(Autowhatever).props().items.length).toBe(2);

		// when
		input.simulate('blur');

		// then
		expect(onChange).toBeCalledWith(expect.anything(), { schema, value: 'fo' });
		expect(wrapper.find(Autowhatever).props().items.length).toBe(0);
	});

	it('should update suggestions based on value on focus', () => {
		// given
		const onChange = jest.fn();
		const wrapper = mount(
			<Datalist
				id={'my-datalist'}
				isValid
				errorMessage={'This should be correct'}
				onChange={onChange}
				schema={schema}
				value={'foo'}
			/>
		);
		expect(wrapper.find(Autowhatever).props().items).toEqual([]);

		// when
		wrapper.find('input').at(0).simulate('focus');

		// then
		expect(wrapper.find(Autowhatever).props().items).toEqual([
			'foo',
			'foobar',
		]);
	});

	it('should reset previous value on ESC keydown', () => {
		// given
		const onChange = jest.fn();
		const wrapper = mount(
			<Datalist
				id={'my-datalist'}
				isValid
				errorMessage={'This should be correct'}
				onChange={onChange}
				schema={schema}
				value={'foo'}
			/>
		);
		expect(wrapper.find(Autowhatever).props().value).toBe('foo');
		wrapper.find('input').at(0).simulate('change', { target: { value: 'newValue' } });
		expect(wrapper.find(Autowhatever).props().value).toBe('newValue');

		// when
		wrapper.find('input').at(0).simulate('keydown', { which: keycode.codes.esc });

		// then
		expect(wrapper.find(Autowhatever).props().value).toBe('foo');
	});

	it('should select value on ENTER keydown with a selected suggestion', () => {
		// given

		// when

		// then
	});

	it('should change value on ENTER keydown with no selected suggestion', () => {
		// given

		// when

		// then
	});

	it('should reset suggestions on ENTER keydown', () => {
		// given

		// when

		// then
	});

	it('should display all suggestions on DOWN keydown when there are no suggestions yet', () => {
		// given

		// when

		// then
	});

	it('should select suggestion on DOWN keydown', () => {
		// given

		// when

		// then
	});

	it('should select suggestion on UP keydown', () => {
		// given

		// when

		// then
	});
});
