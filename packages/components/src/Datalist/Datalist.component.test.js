import React from 'react';
import { mount, shallow } from 'enzyme';
import keycode from 'keycode';
import Typeahead from '../Typeahead';
import Datalist from './Datalist.component';

const props = {
	autoFocus: true,
	disabled: false,
	placeholder: 'Type here',
	noResultText: 'there is nothing ...',
	readOnly: false,
	title: 'My List',
	titleMap: [
		{ name: 'foo', value: 'foo', description: 'foo description' },
		{ name: 'bar', value: 'bar' },
		{ name: 'foobar', value: 'foobar', description: 'foobar description' },
		{ name: 'mdr', value: 'lol' },
	],
};

const multiSectionMap = [
	{ title: 'cat 1', suggestions: [{ name: 'foo', value: 'foo', description: 'foo description' }] },
	{ title: 'cat 2', suggestions: [{ name: 'bar', value: 'bar' }] },
	{
		title: 'cat 3',
		suggestions: [{ name: 'foobar', value: 'foobar', description: 'foobar description' }],
	},
	{ title: 'cat 4', suggestions: [{ name: 'lol', value: 'lol' }] },
];

describe('Datalist component', () => {
	it('should render a typeahead', () => {
		// when
		const wrapper = shallow(
			<Datalist
				id="my-datalist"
				isValid
				multiSection={false}
				errorMessage="This should be correct"
				onChange={jest.fn()}
				{...props}
				value="foo"
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should show label', () => {
		// given
		const multiSectionProps = { ...props, titleMap: multiSectionMap };
		const wrapper = mount(
			<Datalist
				autoFocus
				id="my-datalist"
				isValid
				multiSection
				errorMessage="This should be correct"
				onChange={jest.fn()}
				{...multiSectionProps}
				value="toto"
			/>,
		);

		// when
		wrapper
			.find('input')
			.at(0)
			.simulate('change', { target: { value: 'foo' } });

		// then
		expect(wrapper.find(Typeahead).props().items).toEqual([
			{
				suggestions: [{ name: 'foo', value: 'foo', description: 'foo description' }],
				title: 'cat 1',
			},
			{
				suggestions: [{ name: 'foobar', value: 'foobar', description: 'foobar description' }],
				title: 'cat 3',
			},
		]);
	});

	it('should update grouped suggestions on value change', () => {
		const wrapper = mount(
			<Datalist
				autoFocus
				id="my-datalist"
				isValid
				multiSection={false}
				errorMessage="This should be correct"
				onChange={jest.fn()}
				{...props}
				titleMap={[
					{ name: 'A', value: 'a' },
					{ name: 'B', value: 'b' },
				]}
				value="a"
			/>,
		);

		function findInput() {
			return wrapper.find('input').at(0);
		}
		function findLabel() {
			return findInput().props().value;
		}

		// ensure the shown value is the label
		expect(findLabel()).toEqual('A');

		// now change the value and ensures it still show the label
		findInput().simulate('change', { target: { value: 'b' } });
		expect(findLabel()).toEqual('B');
	});

	it('should update suggestions on value change', () => {
		// given
		const wrapper = mount(
			<Datalist
				id="my-datalist"
				isValid
				multiSection={false}
				errorMessage="This should be correct"
				onChange={jest.fn()}
				{...props}
				value="toto"
			/>,
		);

		// when
		wrapper
			.find('input')
			.at(0)
			.simulate('change', { target: { value: 'foo' } });
		// then
		expect(wrapper.find(Typeahead).props().items).toEqual([
			{ name: 'foo', value: 'foo', description: 'foo description' },
			{ name: 'foobar', value: 'foobar', description: 'foobar description' },
		]);
	});

	it('should reset suggestions and change value on blur when value in suggestions', () => {
		// given
		const onChange = jest.fn();
		const wrapper = mount(
			<Datalist
				id="my-datalist"
				isValid
				multiSection={false}
				errorMessage="This should be correct"
				onChange={onChange}
				{...props}
				value="foo"
			/>,
		);
		const input = wrapper.find('input').at(0);
		input.simulate('change', { target: { value: 'foobar' } });
		expect(wrapper.find(Typeahead).props().items.length).toBe(1);

		// when
		input.simulate('blur');

		// then
		const payload = { value: 'foobar' };
		expect(onChange).toBeCalledWith(expect.anything(), payload);
	});

	it('should change the value on blur when not in restricted mode and value not in suggestions', () => {
		// given
		const onChange = jest.fn();
		const wrapper = mount(
			<Datalist
				id="my-datalist"
				isValid
				multiSection={false}
				errorMessage="This should be correct"
				onChange={onChange}
				{...props}
				value="foo"
			/>,
		);
		const input = wrapper.find('input').at(0);
		input.simulate('change', { target: { value: 'foooo' } });
		expect(wrapper.find(Typeahead).props().items.length).toBe(0);

		// when
		input.simulate('blur');

		// then
		const payload = { value: 'foooo' };
		expect(onChange).toBeCalledWith(expect.anything(), payload);
	});

	it('should not reset to old value when clearing input, in restricted mode, and then onBlur', () => {
		// given
		const onChange = jest.fn();
		const wrapper = mount(
			<Datalist
				id="my-datalist"
				isValid
				multiSection={false}
				errorMessage="This should be correct"
				onChange={onChange}
				{...props}
				value="fooo"
			/>,
		);
		const input = wrapper.find('input').at(0);
		input.simulate('change', { target: { value: '' } });
		// when
		input.simulate('blur');
		// then
		expect(input.text().length).toBe(0);
	});

	it('should clear input even if there was a previous filter', () => {
		// given
		const onChange = jest.fn();
		const wrapper = mount(
			<Datalist
				id="my-datalist"
				isValid
				multiSection={false}
				errorMessage="This should be correct"
				onChange={onChange}
				{...props}
				value="foo"
			/>,
		);
		const input = wrapper.find('input').at(0);
		input.simulate('change', { target: { value: 'foobar' } });
		expect(wrapper.find(Typeahead).props().items.length).toBe(1);

		// when
		input.simulate('change', { target: { value: '' } });
		expect(wrapper.find(Typeahead).props().items.length).toBe(4);
		input.simulate('blur');

		// then
		expect(input.text().length).toBe(0);
	});

	it('should not change the value on blur in restricted mode and value does not exist', () => {
		// given
		const onChange = jest.fn();
		const wrapper = mount(
			<Datalist
				id="my-datalist"
				isValid
				multiSection={false}
				errorMessage="This should be correct"
				onChange={onChange}
				{...props}
				value="foo"
				restricted
			/>,
		);
		const input = wrapper.find('input').at(0);
		input.simulate('change', { target: { value: 'fo' } });
		expect(wrapper.find(Typeahead).props().items.length).toBe(2);

		// when
		input.simulate('blur');

		// then
		expect(onChange).not.toHaveBeenCalled();
		expect(wrapper.find(Typeahead).props().items).toBe(null);
	});

	it('should change the value on blur in restricted mode and value matches with one suggestion', () => {
		// given
		const onChange = jest.fn();
		const wrapper = mount(
			<Datalist
				id="my-datalist"
				isValid
				multiSection={false}
				errorMessage="This should be correct"
				onChange={onChange}
				{...props}
				value="foo"
				restricted
			/>,
		);
		const input = wrapper.find('input').at(0);
		input.simulate('change', { target: { value: 'mdr' } });
		expect(wrapper.find(Typeahead).props().items.length).toBe(1);

		// when
		input.simulate('blur');

		// then
		expect(onChange).toHaveBeenCalledWith(expect.anything(), { value: 'lol' });
		expect(wrapper.find(Typeahead).props().items).toEqual([{ name: 'mdr', value: 'lol' }]);
	});

	it('should update show all suggestions on focus even if a value is selected', () => {
		// given
		const wrapper = mount(
			<Datalist
				id="my-datalist"
				isValid
				multiSection={false}
				errorMessage="This should be correct"
				onChange={jest.fn()}
				{...props}
				value="foo"
			/>,
		);
		expect(wrapper.find(Typeahead).props().items).toEqual(null);

		// when
		wrapper.find('input').at(0).simulate('focus');

		// then
		expect(wrapper.find(Typeahead).props().items).toEqual([
			{ name: 'foo', value: 'foo', description: 'foo description' },
			{ name: 'bar', value: 'bar' },
			{ name: 'foobar', value: 'foobar', description: 'foobar description' },
			{ name: 'mdr', value: 'lol' },
		]);
		expect(wrapper.find(Typeahead).props().value).toBe('foo');
	});

	it('should reset previous value on ESC keydown', () => {
		// given
		const wrapper = mount(
			<Datalist
				id="my-datalist"
				isValid
				multiSection={false}
				errorMessage="This should be correct"
				onChange={jest.fn()}
				{...props}
				value="foo"
			/>,
		);
		expect(wrapper.find(Typeahead).props().value).toBe('foo');
		wrapper
			.find('input')
			.at(0)
			.simulate('change', { target: { value: 'newValue' } });
		expect(wrapper.find(Typeahead).props().value).toBe('newValue');

		// when
		wrapper.find('input').at(0).simulate('keydown', { which: keycode.codes.esc });

		// then
		expect(wrapper.find(Typeahead).props().value).toBe('foo');
	});

	it('should display all suggestions on DOWN keydown when there are no suggestions yet', () => {
		// given
		const wrapper = mount(
			<Datalist
				id="my-datalist"
				isValid
				multiSection={false}
				errorMessage="This should be correct"
				onChange={jest.fn()}
				{...props}
				value="foo"
			/>,
		);
		expect(wrapper.find(Typeahead).props().items).toBe(null);

		// when
		wrapper.find('input').at(0).simulate('keydown', { which: keycode.codes.down });

		// then
		expect(wrapper.find(Typeahead).props().items.length).toBe(4);
	});

	it('should change value on ENTER keydown with no selected suggestion', () => {
		// given
		const onChange = jest.fn();
		const wrapper = mount(
			<Datalist
				id="my-datalist"
				isValid
				multiSection={false}
				errorMessage="This should be correct"
				onChange={onChange}
				{...props}
				value="foo"
			/>,
		);
		const input = wrapper.find('input').at(0);
		input.simulate('change', { target: { value: 'foobar' } });
		expect(onChange).not.toBeCalled();

		// when
		input.simulate('keydown', { which: keycode.codes.enter });

		// then
		const payload = { value: 'foobar' };
		expect(onChange).toBeCalledWith(expect.anything(), payload);
	});

	it('should change value on ENTER keydown when not in restricted mode and value does not exist', () => {
		// given
		const onChange = jest.fn();
		const wrapper = mount(
			<Datalist
				id="my-datalist"
				isValid
				multiSection={false}
				errorMessage="This should be correct"
				onChange={onChange}
				{...props}
				value="foo"
			/>,
		);
		const input = wrapper.find('input').at(0);
		input.simulate('change', { target: { value: 'foooo' } });
		expect(onChange).not.toBeCalled();

		// when
		input.simulate('keydown', { which: keycode.codes.enter });

		// then
		const payload = { value: 'foooo' };
		expect(onChange).toBeCalledWith(expect.anything(), payload);
	});

	it('should not change value on ENTER when value does not exist in restricted mode', () => {
		// given
		const onChange = jest.fn();
		const wrapper = mount(
			<Datalist
				id="my-datalist"
				isValid
				multiSection={false}
				errorMessage="This should be correct"
				onChange={onChange}
				restricted
				{...props}
				value="foo"
			/>,
		);
		const input = wrapper.find('input').at(0);
		input.simulate('change', { target: { value: 'fo' } });
		expect(onChange).not.toBeCalled();

		// when
		input.simulate('keydown', { which: keycode.codes.enter });

		// then
		expect(onChange).not.toHaveBeenCalled();
	});

	it('should reset suggestions on ENTER keydown', () => {
		// given
		const wrapper = mount(
			<Datalist
				id="my-datalist"
				isValid
				multiSection={false}
				errorMessage="This should be correct"
				onChange={jest.fn()}
				{...props}
				value="foo"
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
				id="my-datalist"
				isValid
				multiSection={false}
				errorMessage="This should be correct"
				onChange={jest.fn()}
				{...props}
				value="foo"
			/>,
		);
		expect(wrapper.find(Typeahead).props().value).toBe('foo');

		// when
		wrapper.setProps({ value: 'bar' });

		// then
		expect(wrapper.update().find(Typeahead).props().value).toBe('bar');
	});

	it('should set new mapping and suggestions on titleMap props change', () => {
		// given
		const wrapper = shallow(
			<Datalist
				id="my-datalist"
				isValid
				multiSection={false}
				errorMessage="This should be correct"
				onChange={jest.fn()}
				{...props}
				value="foo"
			/>,
		);
		const instance = wrapper.instance();
		instance.updateSuggestions = jest.fn();
		instance.onFocus({ target: { select() {} } });

		expect(wrapper.state().titleMapping).toEqual({
			bar: 'bar',
			foo: 'foo',
			foobar: 'foobar',
			lol: 'mdr',
		});
		wrapper.setState({ suggestions: ['foo', 'bar', 'foobar', 'lol', 'mdr'] });
		expect(instance.updateSuggestions).toHaveBeenCalledTimes(1);

		const titleMap = [
			{ name: 'other', value: 'other' },
			{ name: 'title', value: 'title' },
			{ name: 'map', value: 'map' },
		];

		// when
		wrapper.setProps({ titleMap });

		// then
		expect(wrapper.state().titleMapping).toEqual({ other: 'other', title: 'title', map: 'map' });
		expect(instance.updateSuggestions).toHaveBeenCalledTimes(2);
	});

	it('should set proper focusedItemIndex single section display', () => {
		// given
		const wrapper = mount(
			<Datalist
				id="my-datalist"
				isValid
				multiSection={false}
				errorMessage="This should be correct"
				onChange={jest.fn()}
				{...props}
				value="foobar"
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
				id="my-datalist"
				isValid
				multiSection
				errorMessage="This should be correct"
				onChange={jest.fn()}
				{...sectionProps}
				value="foobar"
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

	it('should call props.onFocus on instance focus', () => {
		const onFocus = jest.fn();
		const wrapper = shallow(<Datalist {...props} onFocus={onFocus} onChange={jest.fn()} />);

		// when
		const event = { type: 'foo', target: { select: jest.fn() } };
		const instance = wrapper.instance();
		instance.updateSuggestions = jest.fn();
		instance.updateSelectedIndexes = jest.fn();
		instance.onFocus(event);
		expect(onFocus).toHaveBeenCalledWith(event);
		expect(event.target.select).toHaveBeenCalled();
		expect(instance.updateSuggestions).toHaveBeenCalled();
		expect(instance.updateSelectedIndexes).toHaveBeenCalled();
	});

	it('should update suggestions when clicking on the datalist', () => {
		const wrapper = mount(
			<Datalist
				id="my-datalist"
				isValid
				errorMessage="This should be correct"
				onChange={jest.fn()}
				{...props}
				value="foobar"
			/>,
		);
		const instance = wrapper.instance();
		instance.updateSuggestions = jest.fn();
		instance.updateSelectedIndexes = jest.fn();

		// when
		const input = wrapper.find('input').at(0);
		input.simulate('click');

		// then
		expect(instance.updateSuggestions).toHaveBeenCalled();
		expect(instance.updateSelectedIndexes).toHaveBeenCalled();
	});

	it('should call onLiveChange when user type in the input', () => {
		// given
		const onLiveChange = jest.fn();
		const wrapper = mount(
			<Datalist id="my-datalist" isValid onLiveChange={onLiveChange} {...props} />,
		);
		const event = { target: { value: 'fo' } };

		// when
		const input = wrapper.find('input').at(0);
		input.simulate('change', event);

		// then
		expect(onLiveChange).toBeCalledWith(expect.anything(), 'fo');
	});

	it('should call onBlur when focusing out', () => {
		// given
		const onBlur = jest.fn();
		const wrapper = mount(<Datalist id="my-datalist" isValid onBlur={onBlur} {...props} />);
		const event = { target: { value: 'fo' } };

		// when
		const input = wrapper.find('input').at(0);
		input.simulate('blur', event);

		// then
		expect(onBlur).toBeCalled();
	});
});
