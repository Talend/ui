import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import ActionFile from './ActionFile.component';

jest.mock('react-dom');

const myAction = {
	label: 'Click me',
	icon: 'talend-caret-down',
	onChange: jest.fn(),
};

describe('ActionFile', () => {
	it('should render a div with a input[type="file"] and a label to mimic a button', () => {
		// when
		const wrapper = renderer.create(<ActionFile {...myAction} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('change file value on the button trigger the onChange props', () => {
		// given
		const wrapper = renderer.create(<ActionFile extra="extra" {...myAction} />).toJSON();

		// when
		wrapper.props.onChange();

		// then
		expect(myAction.onChange).toHaveBeenCalled();
		expect(myAction.onChange.mock.calls.length).toBe(1);
		const args = myAction.onChange.mock.calls[0];
		expect(args.length).toBe(2);
		expect(args[0]).toBe();
		expect(args[1].action.extra).toBe('extra');
	});

	it('should pass all props to the Button', () => {
		// when
		const wrapper = renderer
			.create(<ActionFile className="navbar-btn" notExisting {...myAction} />)
			.toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should display a Progress indicator if set', () => {
		// when
		const wrapper = renderer
			.create(<ActionFile className="navbar-btn" inProgress {...myAction} />)
			.toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should display a disabled Icon', () => {
		// when
		const wrapper = renderer
			.create(<ActionFile className="navbar-btn" disabled {...myAction} />)
			.toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should reverse icon/label', () => {
		// when
		const wrapper = renderer.create(<ActionFile iconPosition="right" {...myAction} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should apply transformation on icon', () => {
		// when
		const wrapper = renderer
			.create(<ActionFile iconTransform={'rotate-180'} {...myAction} />)
			.toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render action with html property name = props.name if set', () => {
		// when
		const wrapper = renderer.create(<ActionFile name="custom_name" {...myAction} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should not render action if props.available=false', () => {
		const wrapper = shallow(<ActionFile available={false} />);
		expect(wrapper.type()).toBe(null);
	});
});
