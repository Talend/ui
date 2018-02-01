import React from 'react';
import { shallow } from 'enzyme';
import ActionButton from './ActionButton.component';

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
		const wrapper = shallow(<ActionButton {...myAction} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should click on the button trigger the onclick props', () => {
		// given
		const wrapper = shallow(<ActionButton extra="extra" {...myAction} />);

		// when
		wrapper.simulate('click');

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
		const wrapper = shallow(<ActionButton iconTransform={'rotate-180'} {...myAction} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render action with html property name = props.name if set', () => {
		// when
		const wrapper = shallow(<ActionButton name="custom_name" {...myAction} />);

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
		function OverlayComponent() {
			return <div>OverlayComponent</div>;
		}

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
		function OverlayComponent() {
			return <div>OverlayComponent</div>;
		}

		const props = {
			...myAction,
			overlayComponent: OverlayComponent,
			overlayPlacement: 'bottom',
		};

		// when
		const wrapper = shallow(<ActionButton {...props} />);

		// then
		expect(wrapper.find('OverlayTrigger').length).toBe(1);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
