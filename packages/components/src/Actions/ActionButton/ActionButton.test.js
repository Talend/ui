import React from 'react';
import { shallow, mount } from 'enzyme';
import ActionButton from './ActionButton.component';

const myAction = {
	label: 'Click me',
	title: 'Title to describe click me button',
	icon: 'talend-caret-down',
	'data-feature': 'action.feature',
};

const mouseDownAction = {
	label: 'Click me',
	icon: 'talend-caret-down',
	onMouseDown: jest.fn(),
};

function OverlayComponent() {
	return <div>OverlayComponent</div>;
}

describe('Action', () => {
	it('should render a button', () => {
		// when
		const wrapper = shallow(<ActionButton {...myAction} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render a button with loading state', () => {
		// when
		const wrapper = shallow(<ActionButton loading />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render a link button with loading state', () => {
		// when
		const wrapper = shallow(<ActionButton link loading />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should trigger the onclick props', () => {
		// given
		const onClick = jest.fn();
		const props = { ...myAction, onClick };
		const wrapper = shallow(<ActionButton extra="extra" {...props} />);

		// when
		wrapper.simulate('click', {});

		// then
		expect(onClick.mock.calls.length).toBe(1);
		expect(onClick).toHaveBeenCalledWith(
			{},
			{
				action: {
					'data-feature': 'action.feature',
					extra: 'extra',
					icon: 'talend-caret-down',
					label: 'Click me',
					title: 'Title to describe click me button',
				},
				model: undefined,
			},
		);
	});

	it('should trigger the onmouseenter and onmouseleave props', () => {
		const onMouseEnter = jest.fn();
		const onMouseLeave = jest.fn();
		const props = { ...myAction, onMouseEnter, onMouseLeave };
		const wrapper = shallow(<ActionButton extra="extra" {...props} />);

		wrapper.simulate('mouseenter', {});

		expect(onMouseEnter.mock.calls.length).toBe(1);
		expect(onMouseEnter).toHaveBeenCalledWith(
			{},
			{
				action: {
					'data-feature': 'action.feature',
					extra: 'extra',
					icon: 'talend-caret-down',
					label: 'Click me',
					title: 'Title to describe click me button',
				},
				model: undefined,
			},
		);

		wrapper.simulate('mouseleave', {});

		expect(onMouseLeave.mock.calls.length).toBe(1);
		expect(onMouseLeave).toHaveBeenCalledWith(
			{},
			{
				action: {
					'data-feature': 'action.feature',
					extra: 'extra',
					icon: 'talend-caret-down',
					label: 'Click me',
					title: 'Title to describe click me button',
				},
				model: undefined,
			},
		);
	});

	it('should trigger the onclick props when action has an overlay', () => {
		// given
		const onClick = jest.fn();
		const props = { ...myAction, overlayComponent: OverlayComponent, onClick };
		const wrapper = shallow(<ActionButton extra="extra" {...props} />);

		// when
		wrapper.simulate('click', {});

		// then
		expect(onClick.mock.calls.length).toBe(1);
		expect(onClick).toHaveBeenCalledWith(
			{},
			{
				action: {
					'data-feature': 'action.feature',
					extra: 'extra',
					icon: 'talend-caret-down',
					label: 'Click me',
					title: 'Title to describe click me button',
				},
				model: undefined,
			},
		);
	});

	it('should trigger the onmouseenter and onmouseleave props when action has an overlay', () => {
		const onMouseEnter = jest.fn();
		const onMouseLeave = jest.fn();
		const props = { ...myAction, overlayComponent: OverlayComponent, onMouseEnter, onMouseLeave };
		const wrapper = shallow(<ActionButton extra="extra" {...props} />);

		wrapper.simulate('mouseenter', {});

		expect(onMouseEnter.mock.calls.length).toBe(1);
		expect(onMouseEnter).toHaveBeenCalledWith(
			{},
			{
				action: {
					'data-feature': 'action.feature',
					extra: 'extra',
					icon: 'talend-caret-down',
					label: 'Click me',
					title: 'Title to describe click me button',
				},
				model: undefined,
			},
		);

		wrapper.simulate('mouseleave', {});

		expect(onMouseLeave.mock.calls.length).toBe(1);
		expect(onMouseLeave).toHaveBeenCalledWith(
			{},
			{
				action: {
					'data-feature': 'action.feature',
					extra: 'extra',
					icon: 'talend-caret-down',
					label: 'Click me',
					title: 'Title to describe click me button',
				},
				model: undefined,
			},
		);
	});

	it('should pass all props to the Button', () => {
		// when
		const wrapper = shallow(<ActionButton className="navbar-btn" notExisting {...myAction} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should display a Progress indicator if set', () => {
		// when
		const wrapper = shallow(<ActionButton className="navbar-btn" inProgress {...myAction} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should display a disabled Icon', () => {
		// when
		const wrapper = shallow(<ActionButton className="navbar-btn" disabled {...myAction} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should reverse icon/label', () => {
		// when
		const wrapper = shallow(<ActionButton iconPosition="right" {...myAction} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should apply transformation on icon', () => {
		// when
		const wrapper = shallow(<ActionButton iconTransform="rotate-180" {...myAction} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render action with html property name = props.name if set', () => {
		// when
		const wrapper = shallow(<ActionButton name="custom_name" {...myAction} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render tooltip when there is a label with hideLabel property', () => {
		// when
		const wrapper = shallow(<ActionButton name="custom_name" label="a label" hideLabel />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should NOT render tooltip when there is an empty label with hideLabel property', () => {
		// when
		const wrapper = shallow(<ActionButton name="custom_name" label="" hideLabel />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should trigger action if set up onMouseDown event', () => {
		// given
		const wrapper = shallow(<ActionButton extra="extra" {...mouseDownAction} />);

		// when
		wrapper.simulate('mouseDown');

		// then
		expect(mouseDownAction.onMouseDown).toHaveBeenCalled();
		expect(mouseDownAction.onMouseDown.mock.calls.length).toBe(1);
		const args = mouseDownAction.onMouseDown.mock.calls[0];
		expect(args.length).toBe(2);
		expect(args[0]).toBe();
		expect(args[1].action.extra).toBe('extra');
	});

	it('should not render action if props.available=false', () => {
		const wrapper = shallow(<ActionButton available={false} />);
		expect(wrapper.type()).toBe(null);
	});

	it('should render a button without an overlay component if inProgress is true', () => {
		const props = {
			...myAction,
			inProgress: true,
			overlayComponent: OverlayComponent,
			overlayPlacement: 'bottom',
		};

		// when
		const wrapper = shallow(<ActionButton {...props} />);

		// then
		expect(wrapper.find('OverlayTrigger').length).toBe(0);
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render a button with a overlay component', () => {
		const props = {
			...myAction,
			overlayComponent: OverlayComponent,
			overlayPlacement: 'bottom',
			overlayId: 'myOverlayId',
		};

		// when
		const wrapper = shallow(<ActionButton {...props} />);

		// then
		expect(wrapper.find('OverlayTrigger').length).toBe(1);
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should called ref method on overlay', () => {
		// given
		const myRefFunc = jest.fn();
		const props = {
			...myAction,
			overlayComponent: OverlayComponent,
			overlayPlacement: 'bottom',
			overlayRef: myRefFunc,
			overlayId: 'myOverlayId',
		};
		// when
		mount(<ActionButton {...props} />);

		// then
		expect(myRefFunc).toHaveBeenCalled();
	});

	it('should called ref method on button', () => {
		// Given
		const myRefFunc = jest.fn();
		// when
		mount(<ActionButton {...myAction} buttonRef={myRefFunc} />);

		// then
		expect(myRefFunc).toHaveBeenCalled();
	});
});
