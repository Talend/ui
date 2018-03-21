import React from 'react';
import { mount, shallow } from 'enzyme';
import keycode from 'keycode';
import Typeahead from '../Typeahead';
import Datalist from './Datalist.component';

const props = {
	autoFocus: true,
	disabled: false,
	placeholder: 'Type here',
	readOnly: false,
	title: 'My List',
	titleMap: [
		{ name: 'foo', value: 'foo' },
		{ name: 'bar', value: 'bar' },
		{ name: 'foobar', value: 'foobar' },
		{ name: 'lol', value: 'lol' },
	],
};

const multiSectionMap = [
	{ title: 'cat 1', suggestions: [{ name: 'foo', value: 'foo' }] },
	{ title: 'cat 2', suggestions: [{ name: 'bar', value: 'bar' }] },
	{ title: 'cat 3', suggestions: [{ name: 'foobar', value: 'foobar' }] },
	{ title: 'cat 4', suggestions: [{ name: 'lol', value: 'lol' }] },
];

describe('Datalist component', () => {
	it('should render a typeahead', () => {
		// when
		const wrapper = shallow(
			<Datalist
				id={'my-datalist'}
				isValid
				multiSection={false}
				errorMessage={'This should be correct'}
				onChange={jest.fn()}
				{...props}
				value={'foo'}
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should update grouped suggestions on value change', () => {
		// given
		const multiSectionProps = { ...props, titleMap: multiSectionMap };
		const wrapper = mount(
			<Datalist
				autoFocus
				id={'my-datalist'}
				isValid
				multiSection
				errorMessage={'This should be correct'}
				onChange={jest.fn()}
				{...multiSectionProps}
				value={'toto'}
			/>,
		);

		// when
		wrapper
			.find('input')
			.at(0)
			.simulate('change', { target: { value: 'foo' } });

		// then
		expect(wrapper.find(Typeahead).props().items).toEqual([
			{ suggestions: [{ title: 'foo' }], title: 'cat 1' },
			{ suggestions: [{ title: 'foobar' }], title: 'cat 3' },
		]);
	});

	it('should update suggestions on value change', () => {
		// given
		const wrapper = mount(
			<Datalist
				id={'my-datalist'}
				isValid
				multiSection={false}
				errorMessage={'This should be correct'}
				onChange={jest.fn()}
				{...props}
				value={'toto'}
			/>,
		);

		// when
		wrapper
			.find('input')
			.at(0)
			.simulate('change', { target: { value: 'foo' } });
		// then
		expect(wrapper.find(Typeahead).props().items).toEqual(['foo', 'foobar']);
	});

	it('should reset suggestions and change value on blur', () => {
		// given
		const onChange = jest.fn();
		const wrapper = mount(
			<Datalist
				id={'my-datalist'}
				isValid
				multiSection={false}
				errorMessage={'This should be correct'}
				onChange={onChange}
				{...props}
				value={'foo'}
			/>,
		);
		const input = wrapper.find('input').at(0);
		input.simulate('change', { target: { value: 'fo' } });
		expect(wrapper.find(Typeahead).props().items.length).toBe(2);

		// when
		input.simulate('blur');

		// then
		const payload = { value: 'fo' };
		expect(onChange).toBeCalledWith(expect.anything(), payload);
		expect(wrapper.find(Typeahead).props().items).toBe(null);
	});

	it('should update show all suggestions on focus even if a value is selected', () => {
		// given
		const wrapper = mount(
			<Datalist
				id={'my-datalist'}
				isValid
				multiSection={false}
				errorMessage={'This should be correct'}
				onChange={jest.fn()}
				{...props}
				value={'foo'}
			/>,
		);
		expect(wrapper.find(Typeahead).props().items).toEqual(null);

		// when
		wrapper
			.find('input')
			.at(0)
			.simulate('focus');

		// then
		expect(wrapper.find(Typeahead).props().items).toEqual(['foo', 'bar', 'foobar', 'lol']);
		expect(wrapper.find(Typeahead).props().value).toBe('foo');
	});

	it('should reset previous value on ESC keydown', () => {
		// given
		const wrapper = mount(
			<Datalist
				id={'my-datalist'}
				isValid
				multiSection={false}
				errorMessage={'This should be correct'}
				onChange={jest.fn()}
				{...props}
				value={'foo'}
			/>,
		);
		expect(wrapper.find(Typeahead).props().value).toBe('foo');
		wrapper
			.find('input')
			.at(0)
			.simulate('change', { target: { value: 'newValue' } });
		expect(wrapper.find(Typeahead).props().value).toBe('newValue');

		// when
		wrapper
			.find('input')
			.at(0)
			.simulate('keydown', { which: keycode.codes.esc });

		// then
		expect(wrapper.find(Typeahead).props().value).toBe('foo');
	});

	it('should display all suggestions on DOWN keydown when there are no suggestions yet', () => {
		// given
		const wrapper = mount(
			<Datalist
				id={'my-datalist'}
				isValid
				multiSection={false}
				errorMessage={'This should be correct'}
				onChange={jest.fn()}
				{...props}
				value={'foo'}
			/>,
		);
		expect(wrapper.find(Typeahead).props().items).toBe(null);

		// when
		wrapper
			.find('input')
			.at(0)
			.simulate('keydown', { which: keycode.codes.down });

		// then
		expect(wrapper.find(Typeahead).props().items.length).toBe(4);
	});

	it('should change value on ENTER keydown with no selected suggestion', () => {
		// given
		const onChange = jest.fn();
		const wrapper = mount(
			<Datalist
				id={'my-datalist'}
				isValid
				multiSection={false}
				errorMessage={'This should be correct'}
				onChange={onChange}
				{...props}
				value={'foo'}
			/>,
		);
		const input = wrapper.find('input').at(0);
		input.simulate('change', { target: { value: 'fo' } });
		expect(onChange).not.toBeCalled();

		// when
		input.simulate('keydown', { which: keycode.codes.enter });

		// then
		const payload = { value: 'fo' };
		expect(onChange).toBeCalledWith(expect.anything(), payload);
	});

	it('should reset suggestions on ENTER keydown', () => {
		// given
		const wrapper = mount(
			<Datalist
				id={'my-datalist'}
				isValid
				multiSection={false}
				errorMessage={'This should be correct'}
				onChange={jest.fn()}
				{...props}
				value={'foo'}
			/>,
		);
		const input = wrapper.find('input').at(0);
		input.simulate('change', { target: { value: 'fo' } });
		expect(wrapper.find(Typeahead).props().items.length).not.toBe(0);

		// when
		input.simulate('keydown', { which: keycode.codes.enter });

		// then
		expect(wrapper.find(Typeahead).props().items).toBe(null);
	});

	it('should set value on props value update', () => {
		// given
		const wrapper = shallow(
			<Datalist
				id={'my-datalist'}
				isValid
				multiSection={false}
				errorMessage={'This should be correct'}
				onChange={jest.fn()}
				{...props}
				value={'foo'}
			/>,
		);
		expect(wrapper.find(Typeahead).props().value).toBe('foo');

		// when
		wrapper.setProps({ value: 'bar' });

		// then
		expect(
			wrapper
				.update()
				.find(Typeahead)
				.props().value,
		).toBe('bar');
	});

	it('should set proper focusedItemIndex single section display', () => {
		// given
		const wrapper = mount(
			<Datalist
				id={'my-datalist'}
				isValid
				multiSection={false}
				errorMessage={'This should be correct'}
				onChange={jest.fn()}
				{...props}
				value={'foobar'}
			/>,
		);

		// when
		const input = wrapper.find('input').at(0);
		input.simulate('focus');

		// then
		expect(wrapper.find(Typeahead).props().value).toBe('foobar');
		expect(wrapper.find(Typeahead).props().focusedItemIndex).toBe(2);
	});

	it('should set proper focusedItemIndex and focusedSectionIndex on multi section', () => {
		// given
		const sectionProps = { ...props, titleMap: multiSectionMap };
		const wrapper = mount(
			<Datalist
				id={'my-datalist'}
				isValid
				multiSection
				errorMessage={'This should be correct'}
				onChange={jest.fn()}
				{...sectionProps}
				value={'foobar'}
			/>,
		);

		// when
		const input = wrapper.find('input').at(0);
		input.simulate('focus');

		// then
		expect(wrapper.find(Typeahead).props().value).toBe('foobar');
		expect(wrapper.find(Typeahead).props().focusedSectionIndex).toBe(2);
		expect(wrapper.find(Typeahead).props().focusedItemIndex).toBe(0);
	});
});
