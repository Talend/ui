import React from 'react';
import { shallow, mount } from 'enzyme';
import ActionFile from './ActionFile.component';

// jest.mock('react-dom');

const myAction = {
	label: 'Click me',
	icon: 'talend-caret-down',
	onChange: jest.fn(),
};

describe('ActionFile', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should render a div with a input[type="file"] and a label to mimic a button', () => {
		// when
		const wrapper = shallow(<ActionFile {...myAction} />);

		// then
		expect(wrapper.getNode()).toMatchSnapshot();
	});

	it('change file value on the button trigger the onChange props', () => {
		// given
		const wrapper = mount(<ActionFile extra="extra" {...myAction} />);
		const mockEvent = { preventDefault: jest.fn(), target: { files: [] } };

		// when
		// when
		wrapper
			.find('input')
			.first()
			.simulate('change', mockEvent);

		// then
		expect(myAction.onChange).toHaveBeenCalled();
		expect(myAction.onChange.mock.calls.length).toBe(1);
		const args = myAction.onChange.mock.calls[0];
		expect(args[0].target).toBe(mockEvent.target);
	});

	it('after change props being trigered, clear the input value', () => {
		// given
		const wrapper = mount(<ActionFile extra="extra" {...myAction} />);
		const mockEvent = { preventDefault: jest.fn(), target: { files: [] } };

		// when
		const input = wrapper.find('input').first();
		input.simulate('change', mockEvent);

		// then
		expect(input.value).toEqual();
	});

	it('should pass all props to the Button', () => {
		// when
		const wrapper = shallow(<ActionFile className="navbar-btn" notExisting {...myAction} />);

		// then
		expect(wrapper.getNode()).toMatchSnapshot();
	});

	it('should display a Progress indicator if set', () => {
		// when
		const wrapper = shallow(<ActionFile className="navbar-btn" inProgress {...myAction} />);

		// then
		expect(wrapper.getNode()).toMatchSnapshot();
	});

	it('should display a disabled Icon', () => {
		// when
		const wrapper = shallow(<ActionFile className="navbar-btn" disabled {...myAction} />);

		// then
		expect(wrapper.getNode()).toMatchSnapshot();
	});

	it('should reverse icon/label', () => {
		// when
		const wrapper = shallow(<ActionFile iconPosition="right" {...myAction} />);

		// then
		expect(wrapper.getNode()).toMatchSnapshot();
	});

	it('should apply transformation on icon', () => {
		// when
		const wrapper = shallow(<ActionFile iconTransform={'rotate-180'} {...myAction} />);

		// then
		expect(wrapper.getNode()).toMatchSnapshot();
	});

	it('should render action with html property name = props.name if set', () => {
		// when
		const wrapper = shallow(<ActionFile name="custom_name" {...myAction} />);

		// then
		expect(wrapper.getNode()).toMatchSnapshot();
	});

	it('should not render action if props.available=false', () => {
		const wrapper = shallow(<ActionFile available={false} />);
		expect(wrapper.type()).toBe(null);
	});
});
