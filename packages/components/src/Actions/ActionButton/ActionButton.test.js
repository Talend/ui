import React from 'react';
import { shallow, mount } from 'enzyme';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ActionButton from './ActionButton.component';

jest.unmock('@talend/design-system');

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
		render(<ActionButton {...myAction} />);

		// then
		expect(screen.getByRole('button')).toBeInTheDocument();
	});

	it('should render a skeleton if not a link and loading', () => {
		// when
		render(<ActionButton loading {...myAction} />);
		// then
		expect(screen.getByLabelText('button Loading...')).toHaveClass('tc-skeleton');
	});

	it('should render a loading skeleton', () => {
		// when
		render(<ActionButton link loading label="me a link" />);
		const btn = screen.getByRole('link');
		// then
		expect(btn.childNodes[0]).toHaveClass('tc-skeleton');
	});

	it('should trigger the onclick props', () => {
		// given
		const onClick = jest.fn();
		const props = { ...myAction, onClick };
		render(<ActionButton {...props} extra="extra" />);

		// when
		userEvent.click(screen.getByRole('button'));

		// then
		expect(onClick.mock.calls.length).toBe(1);
		expect(onClick).toHaveBeenCalledWith(expect.anything(), {
			action: {
				'data-feature': 'action.feature',
				extra: 'extra',
				icon: 'talend-caret-down',
				label: 'Click me',
				title: 'Title to describe click me button',
			},
			model: undefined,
		});
	});

	it('should trigger the onmouseenter and onmouseleave props', () => {
		const onMouseEnter = jest.fn();
		const onMouseLeave = jest.fn();
		const props = { ...myAction, onMouseEnter, onMouseLeave };
		render(<ActionButton {...props} extra="extra" />);
		fireEvent.mouseEnter(screen.getByRole('button'));

		expect(onMouseEnter.mock.calls.length).toBe(1);
		expect(onMouseEnter).toHaveBeenCalledWith(expect.anything(), {
			action: {
				'data-feature': 'action.feature',
				extra: 'extra',
				icon: 'talend-caret-down',
				label: 'Click me',
				title: 'Title to describe click me button',
			},
			model: undefined,
		});

		fireEvent.mouseLeave(screen.getByRole('button'));

		expect(onMouseLeave.mock.calls.length).toBe(1);
		expect(onMouseLeave).toHaveBeenCalledWith(expect.anything(), {
			action: {
				'data-feature': 'action.feature',
				extra: 'extra',
				icon: 'talend-caret-down',
				label: 'Click me',
				title: 'Title to describe click me button',
			},
			model: undefined,
		});
	});

	it('should trigger the onclick props when action has an overlay', () => {
		// given
		const onClick = jest.fn();
		const props = { ...myAction, overlayComponent: OverlayComponent, onClick };
		render(<ActionButton {...props} extra="extra" />);

		// when
		userEvent.click(screen.getByRole('button'));

		// then
		expect(onClick.mock.calls.length).toBe(1);
		expect(onClick).toHaveBeenCalledWith(expect.anything(), {
			action: {
				'data-feature': 'action.feature',
				extra: 'extra',
				icon: 'talend-caret-down',
				label: 'Click me',
				title: 'Title to describe click me button',
			},
			model: undefined,
		});
	});

	xit('should trigger the onmouseenter and onmouseleave props when action has an overlay', () => {
		// Given
		const onMouseEnter = jest.fn();
		const onMouseLeave = jest.fn();
		const props = { ...myAction, overlayComponent: OverlayComponent, onMouseEnter, onMouseLeave };
		// when
		render(<ActionButton {...props} />);

		// then
		expect(screen.getByRole('button')).toHaveAttribute('aria-haspopup', 'true');

		// When
		// this do not work as overlay do not manage on mouse enter/leave from the outside
		fireEvent.mouseEnter(screen.getByRole('button'));

		expect(onMouseEnter).toHaveBeenCalled();
		expect(onMouseEnter).toHaveBeenCalledWith(expect.anything(), {
			action: {
				'data-feature': 'action.feature',
				extra: 'extra',
				icon: 'talend-caret-down',
				label: 'Click me',
				title: 'Title to describe click me button',
			},
			model: undefined,
		});
		fireEvent.mouseLeave(screen.getByRole('button'));

		expect(onMouseLeave.mock.calls.length).toBe(1);
		expect(onMouseLeave).toHaveBeenCalledWith(expect.anything(), {
			action: {
				'data-feature': 'action.feature',
				extra: 'extra',
				icon: 'talend-caret-down',
				label: 'Click me',
				title: 'Title to describe click me button',
			},
			model: undefined,
		});
	});

	it('should pass all props to the Button', () => {
		// when
		render(<ActionButton {...myAction} className="navbar-btn" />);

		// then
		expect(screen.getByRole('button')).toHaveClass('navbar-btn');
	});

	it('should display a Progress indicator if set', () => {
		// when
		render(<ActionButton inProgress {...myAction} />);

		// then
		expect(screen.getByLabelText('Loading...')).toBeInTheDocument();
	});

	it('should display a disabled Icon', () => {
		// when
		render(<ActionButton disabled {...myAction} />);

		// then
		expect(screen.getByLabelText('Click me')).toHaveClass('theme-btn-disabled');
		expect(screen.getByLabelText('Click me')).toBeDisabled();
	});

	it('should reverse icon/label', () => {
		// when
		render(<ActionButton iconPosition="right" {...myAction} />);

		// then
		expect(screen.getByText('Click me').nextSibling).toHaveClass('tc-svg-icon');
	});

	it('should apply transformation on icon', () => {
		// when
		render(<ActionButton iconTransform="rotate-180" {...myAction} />);

		// then
		expect(screen.getByText('Click me').previousSibling).toHaveClass('theme-rotate-180');
	});

	it('should render action with html property name = props.name if set', () => {
		// when
		render(<ActionButton name="custom_name" {...myAction} />);

		// then
		expect(screen.getByRole('button')).toHaveAttribute('name', 'custom_name');
	});

	it('should render tooltip when hideLabel property is set', () => {
		// when
		render(<ActionButton {...myAction} hideLabel />);

		// then
		expect(screen.queryByText('Click me')).not.toBeInTheDocument();
		expect(screen.getByRole('button')).toHaveAttribute(
			'title',
			'Title to describe click me button',
		);
	});

	it('should render tooltip when tooltip property is set', () => {
		// when
		render(<ActionButton {...myAction} tooltip />);

		// then
		const btn = screen.getByRole('button');
		expect(btn).toBeInTheDocument();
		expect(screen.getByRole('button')).toHaveAttribute('aria-describedby', '42');
	});

	it('should NOT render tooltip when tooltip property is set to false', () => {
		// when
		const wrapper = shallow(<ActionButton {...myAction} tooltip={false} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should NOT render tooltip when tooltip property is set to false with hideLabel property', () => {
		// when
		const wrapper = shallow(<ActionButton {...myAction} hideLabel tooltip={false} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render tooltip with tooltipLabel when the tooltip property is not set', () => {
		// when
		const wrapper = shallow(<ActionButton {...myAction} tooltipLabel="My tooltip label" />);

		// then
		expect(wrapper.find('TooltipTrigger')).toHaveLength(1);
		expect(wrapper.find('TooltipTrigger').prop('label')).toBe('My tooltip label');
	});

	it('should not render tooltip with tooltipLabel when the tooltip property is set to false', () => {
		// when
		const wrapper = shallow(
			<ActionButton {...myAction} tooltip={false} tooltipLabel="My tooltip label" />,
		);

		// then
		expect(wrapper.find('TooltipTrigger')).toHaveLength(0);
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
