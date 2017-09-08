import React from 'react';
import { shallow, mount } from 'enzyme';
import Tags from './Tags.component';

describe('MultiSelectTag field > Tags', () => {
	const props = {
		onRemoveTag: jest.fn(),
		readonly: false,
		titleMap: [{ name: 'toto', value: 'titi' }, { name: 'tata', value: 'tutu' }],
		value: ['titi', 'lol', 'tutu'],
	};

	it('should display tags list', () => {
		// when
		const wrapper = shallow(<Tags {...props} />);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});

	it('should display readOnly tags list', () => {
		// given
		const roProps = {
			...props,
			readonly: true,
		};

		// when
		const wrapper = shallow(<Tags {...roProps} />);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});

	it('should call onTagsMount', () => {
		// given
		const onTagsMount = jest.fn();
		const mountProps = {
			...props,
			onTagsMount,
		};

		// when
		mount(<Tags {...mountProps} />);

		// then
		expect(onTagsMount).toBeCalled();
	});

	it('should call onRemoveTag', () => {
		// given
		const onRemoveTag = jest.fn();
		const removeProps = {
			...props,
			onRemoveTag,
		};
		const wrapper = mount(<Tags {...removeProps} />);

		// when
		wrapper.find('button.tc-badge-delete-icon').at(1).simulate('click');

		// then
		expect(onRemoveTag).toBeCalledWith(expect.anything(), 1);
	});
});
