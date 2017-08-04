import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Action from './Action.component';

jest.mock('react-dom');

const myAction = {
	label: 'Click me',
	icon: 'talend-caret-down',
	onClick: jest.fn(),
};

const mouseDownAction = {
	label: 'Click me',
	icon: 'talend-caret-down',
	onMouseDown: jest.fn(),
};

describe('Action', () => {
	it('should render a button', () => {
		// when
		const wrapper = renderer.create(<Action {...myAction} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should click on the button trigger the onclick props', () => {
		// given
		const wrapper = renderer.create(<Action extra="extra" {...myAction} />).toJSON();

		// when
		wrapper.props.onClick();

		// then
		expect(myAction.onClick).toHaveBeenCalled();
		expect(myAction.onClick.mock.calls.length).toBe(1);
		const args = myAction.onClick.mock.calls[0];
		expect(args.length).toBe(2);
		expect(args[0]).toBe();
		expect(args[1].action.extra).toBe('extra');
	});

	it('should pass all props to the Button', () => {
		// when
		const wrapper = renderer.create(
			<Action
				className="navbar-btn"
				notExisting
				{...myAction}
			/>).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should display a Progress indicator if set', () => {
		// when
		const wrapper = renderer.create(
			<Action
				className="navbar-btn"
				inProgress
				{...myAction}
			/>).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should display a disabled Icon', () => {
		// when
		const wrapper = renderer.create(
			<Action
				className="navbar-btn"
				disabled
				{...myAction}
			/>).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should reverse icon/label', () => {
		// when
		const wrapper = renderer.create(
			<Action
				iconPosition="right"
				{...myAction}
			/>).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should apply transformation on icon', () => {
		// when
		const wrapper = renderer.create(
			<Action
				iconTransform={'rotate-180'}
				{...myAction}
			/>).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render action with html property name = props.name if set', () => {
		// when
		const wrapper = renderer.create(
			<Action
				name="custom_name"
				{...myAction}
			/>).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should trigger action if set up onMouseDown event', () => {
		// given
		const wrapper = renderer.create(<Action extra="extra" {...mouseDownAction} />).toJSON();

		// when
		wrapper.props.onMouseDown();

		// then
		expect(mouseDownAction.onMouseDown).toHaveBeenCalled();
		expect(mouseDownAction.onMouseDown.mock.calls.length).toBe(1);
		const args = mouseDownAction.onMouseDown.mock.calls[0];
		expect(args.length).toBe(2);
		expect(args[0]).toBe();
		expect(args[1].action.extra).toBe('extra');
	});

	it('should not render action if props.available=false', () => {
		const wrapper = shallow(
			<Action available={false} />
		);
		expect(wrapper.type()).toBe(null);
	});
});
