import React from 'react';
import { shallow, mount } from 'enzyme';

import Drawer, { cancelActionComponent } from './Drawer.component';

const drawerProps = {
	title: 'My drawer',
};

describe('Drawer', () => {
	it('should render', () => {
		const wrapper = shallow(
			<Drawer {...drawerProps}>
				<h1>Hello world</h1>
			</Drawer>,
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render using custom styles', () => {
		const wrapper = shallow(
			<Drawer {...drawerProps} style={{ top: 45 }}>
				<h1>Hello world</h1>
			</Drawer>,
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render using custom className', () => {
		const wrapper = shallow(
			<Drawer {...drawerProps} className="my-custom-drawer">
				<h1>Hello world</h1>
			</Drawer>,
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render stacked', () => {
		const wrapper = shallow(
			<Drawer {...drawerProps} stacked>
				<h1>Hello world</h1>
			</Drawer>,
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should not render if no children', () => {
		const wrapper = shallow(<Drawer />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render with tabs', () => {
		// given
		const tabs = {
			items: [
				{
					key: '1',
					label: 'Tab 1',
				},
				{
					key: '2',
					label: 'Tab 2',
				},
			],
			onSelect: jest.fn(),
			selectedKey: '2',
		};

		// when
		const wrapper = shallow(
			<Drawer {...drawerProps} tabs={tabs}>
				<h1>Hello world</h1>
			</Drawer>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	describe('#cancelActionComponent', () => {
		it('should render cancelAction', () => {
			const wrapper = mount(cancelActionComponent({}));
			expect(wrapper.find('button')).toBeTruthy();
		});

		it('should not render anything', () => {
			expect(cancelActionComponent()).toBe(null);
		});
	});
});

describe('Drawer.Content', () => {
	it('should render', () => {
		const wrapper = shallow(
			<Drawer.Content>
				<h1>Hello world</h1>
			</Drawer.Content>,
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render content with extra className', () => {
		const wrapper = shallow(
			<Drawer.Content className="extraClass">
				<h1>Hello world</h1>
			</Drawer.Content>,
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});

describe('Drawer.Animation', () => {
	it('should wrap drawer in a CSSTransition', () => {
		// given
		const DrawerContent = () => <div>My drawer content</div>;

		// when
		const wrapper = shallow(<Drawer.Animation>{() => <DrawerContent />}</Drawer.Animation>);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should pass animation props to the drawer component', () => {
		// given
		const DrawerContent = animationProps => <div {...animationProps}>My drawer content</div>;

		// when
		const wrapper = shallow(
			<Drawer.Animation>
				{animationProps => <DrawerContent {...animationProps} />}
			</Drawer.Animation>,
		);

		// then
		const animationProps = wrapper.find(DrawerContent).props();
		expect(animationProps.active).toBe(true);
		expect(animationProps.transitioned).toBe(false);
		expect(animationProps.close).toBeDefined();
	});

	it('should call onClose() function after close transition', () => {
		// given
		const DrawerContent = animationProps => <div {...animationProps}>My drawer content</div>;
		const onClose = jest.fn();

		const wrapper = mount(
			<Drawer.Animation onClose={onClose}>
				{animationProps => <DrawerContent {...animationProps} />}
			</Drawer.Animation>,
		);

		// when
		const close = wrapper.find(DrawerContent).props().close;
		expect(onClose).not.toBeCalled();
		close();

		// then
		expect(onClose).toBeCalled();
	});
});
