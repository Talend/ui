import React from 'react';
import { mount, shallow } from 'enzyme';
import Typeahead from 'react-talend-components/lib/Typeahead';
import keycode from 'keycode';
import MultiSelectTag from './MultiSelectTag.component';

describe('MultiSelectTag field', () => {
	const props = {
		id: 'my-select-tag',
		isValid: true,
		errorMessage: 'This is wrong',
		onChange: jest.fn(),
		onFinish: jest.fn(),
		schema: {
			autoFocus: true,
			description: 'This is the MultiSelectTag field',
			disabled: false,
			placeholder: 'Type here',
			readOnly: false,
			restricted: false,
			title: 'Tags',
			titleMap: [{ name: 'toto', value: 'titi' }, { name: 'tata', value: 'tutu' }],
		},
		value: ['aze', 'tutu'],
	};

	it('should render MultiSelectTag', () => {
		// when
		const wrapper = shallow(<MultiSelectTag {...props} />);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});

	it('should update suggestion', () => {
		// given
		const wrapper = mount(<MultiSelectTag {...props} />);

		// when
		wrapper.find('input').at(0).simulate('change', { target: { value: 'ti' } });

		// then
		expect(wrapper.find(Typeahead).props().items).toEqual(['titi']);
	});

	it('should suggest new item creation when widget is not restricted', () => {
		// given
		const wrapper = mount(<MultiSelectTag {...props} />);

		// when
		wrapper.find('input').at(0).simulate('change', { target: { value: 'az' } });

		// then
		expect(wrapper.find(Typeahead).props().items).toEqual(['az (new)']);
	});

	it('should NOT suggestion new item creation when widget is restricted', () => {
		// given
		const restrictedSchema = { ...props.schema, restricted: true };
		const wrapper = mount(<MultiSelectTag {...props} schema={restrictedSchema} />);

		// when
		wrapper.find('input').at(0).simulate('change', { target: { value: 'az' } });

		// then
		expect(wrapper.find(Typeahead).props().items).toEqual([]);
	});

	it('should add tag', () => {
		// given
		const onChange = jest.fn();
		const onFinish = jest.fn();
		const wrapper = mount(<MultiSelectTag
			{...props}
			onChange={onChange}
			onFinish={onFinish}
		/>);
		const input = wrapper.find('input').at(0);

		// when
		input.simulate('change', { target: { value: 'ti' } });
		input.simulate('keydown', { which: keycode.codes.enter });

		// then
		const payload = { schema: props.schema, value: props.value.concat('titi') };
		expect(onChange).toBeCalledWith(expect.anything(), payload);
		expect(onFinish).toBeCalledWith(expect.anything(), payload);
	});

	it('should remove tag', () => {
		// given
		const onChange = jest.fn();
		const onFinish = jest.fn();
		const wrapper = mount(<MultiSelectTag
			{...props}
			onChange={onChange}
			onFinish={onFinish}
		/>);

		// when
		wrapper.find('.tc-badge-delete-icon').at(0).simulate('click');

		// then
		const payload = { schema: props.schema, value: props.value.slice(1) };
		expect(onChange).toBeCalledWith(expect.anything(), payload);
		expect(onFinish).toBeCalledWith(expect.anything(), payload);
	});
});
