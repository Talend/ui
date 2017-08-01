import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Action from './Action.component';

jest.mock('react-dom');
const onClickFn = jest.fn();
const onMouseDownFn = jest.fn();
const myAction = {
	label: 'Click me',
	icon: 'talend-caret-down',
	onClick: onClickFn,
	onMouseDown: onMouseDownFn,
};

describe('Action', () => {
	it('should render a button', () => {
		// when
		const wrapper = shallow(<Action {...myAction} />);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should trigger the onclick props when left-click on the button ', () => {
		// given
		const wrapper = shallow(<Action extra="extra" {...myAction} />);
		const buttonWrapper = wrapper.find('Button').at(0);

		// when
		buttonWrapper.simulate('click', { button: 0 });

		// then
		expect(onClickFn).toHaveBeenCalledWith(
			{ button: 0 },
			{ action: {
				extra: 'extra',
				icon: 'talend-caret-down',
				label: 'Click me',
			},
				model: undefined,
			});
	});

	it('should trigger the onclick props when middle-click on the button', () => {
		// given
		const wrapper = shallow(<Action extra="extra" {...myAction} />);
		const buttonWrapper = wrapper.find('Button').at(0);

		// when
		buttonWrapper.simulate('mouseDown', { button: 1 });

		// then
		expect(onClickFn).toHaveBeenCalledWith(
			{ button: 1 },
			{ action: {
				extra: 'extra',
				icon: 'talend-caret-down',
				label: 'Click me',
			},
				model: undefined,
			});
	});

	it('should trigger the onMouseDown props when mousedown (not middle-click) on the button', () => {
		// given
		const wrapper = shallow(<Action extra="extra" {...myAction} />);
		const buttonWrapper = wrapper.find('Button').at(0);

		// when
		buttonWrapper.simulate('mouseDown', { button: 0 });

		// then
		expect(onMouseDownFn).toHaveBeenCalledWith(
			{ button: 0 },
			{ action: {
				extra: 'extra',
				icon: 'talend-caret-down',
				label: 'Click me',
			},
				model: undefined,
			});
	});

	it('should pass all props to the Button', () => {
		// when
		const wrapper = shallow(
			<Action
				className="navbar-btn"
				notExisting
				{...myAction}
			/>);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should display a Progress indicator if set', () => {
		// when
		const wrapper = shallow(
			<Action
				className="navbar-btn"
				inProgress
				{...myAction}
			/>);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should display a disabled Icon', () => {
		// when
		const wrapper = shallow(
			<Action
				className="navbar-btn"
				disabled
				{...myAction}
			/>);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should reverse icon/label', () => {
		// when
		const wrapper = shallow(
			<Action
				iconPosition="right"
				{...myAction}
			/>);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should apply transformation on icon', () => {
		// when
		const wrapper = shallow(
			<Action
				iconTransform={'rotate-180'}
				{...myAction}
			/>);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should render action with html property name = props.name if set', () => {
		// when
		const wrapper = shallow(
			<Action
				name="custom_name"
				{...myAction}
			/>);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should not render action if props.available=false', () => {
		const wrapper = shallow(
			<Action available={false} />
		);
		expect(wrapper.type()).toBe(null);
	});
});
