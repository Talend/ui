import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';

import Drawer, { cancelActionComponent } from './Drawer.component';

describe('Drawer', () => {
	it('should render', () => {
		const wrapper = renderer
			.create(
				<Drawer>
					<h1>Hello world</h1>
				</Drawer>,
			)
			.toJSON();
		expect(wrapper).toMatchSnapshot();
	});
	it('should render without tc-drawer-transition class', () => {
		const wrapper = renderer
			.create(
				<Drawer withTransition={false}>
					<h1>Hello world</h1>
				</Drawer>,
			)
			.toJSON();
		expect(wrapper).toMatchSnapshot();
	});
	it('should render using custom styles', () => {
		const wrapper = renderer
			.create(
				<Drawer style={{ top: 45 }}>
					<h1>Hello world</h1>
				</Drawer>,
			)
			.toJSON();
		expect(wrapper).toMatchSnapshot();
	});
	it('should render using custom className', () => {
		const wrapper = renderer
			.create(
				<Drawer className="my-custom-drawer">
					<h1>Hello world</h1>
				</Drawer>,
			)
			.toJSON();
		expect(wrapper).toMatchSnapshot();
	});
	it('should render stacked', () => {
		const wrapper = renderer
			.create(
				<Drawer stacked>
					<h1>Hello world</h1>
				</Drawer>,
			)
			.toJSON();
		expect(wrapper).toMatchSnapshot();
	});
	it('should not render if no children', () => {
		const wrapper = renderer.create(<Drawer />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
	it('should render cancelActionComponent', () => {
		const wrapper = mount(cancelActionComponent({}));
		expect(wrapper.find('button')).toBeTruthy();
	});
	it('should not render cancelActionComponent', () => {
		expect(cancelActionComponent()).toBe(null);
	});
	it('should render with tabs', () => {
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
		const wrapper = renderer
			.create(
				<Drawer tabs={tabs}>
					<h1>Hello world</h1>
				</Drawer>,
			)
			.toJSON();
		expect(wrapper).toMatchSnapshot();
	});

	it('render drawer content without extra className', () => {
		const wrapper = renderer
			.create(
				<Drawer.Content>
					<h1>Hello world</h1>
				</Drawer.Content>,
			)
			.toJSON();
		expect(wrapper).toMatchSnapshot();
	});

	it('render drawer content with extra className', () => {
		const wrapper = renderer
			.create(
				<Drawer.Content className="extraClass">
					<h1>Hello world</h1>
				</Drawer.Content>,
			)
			.toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});

describe('Drawer.Animation', () => {
	it('should wrap drawer in a CSSTransition', () => {
		// given
		const DrawerContent = () => (<div>My drawer content</div>);

		// when
		const wrapper = shallow(
			<Drawer.Animation>
				{() => <DrawerContent />}
			</Drawer.Animation>
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should pass animation props to the drawer component', () => {
		// given
		const DrawerContent = animationProps => (<div {...animationProps}>My drawer content</div>);

		// when
		const wrapper = shallow(
			<Drawer.Animation>
				{animationProps => (<DrawerContent {...animationProps} />)}
			</Drawer.Animation>
		);

		// then
		const animationProps = wrapper.find(DrawerContent).props();
		expect(animationProps.active).toBe(true);
		expect(animationProps.transitioned).toBe(false);
		expect(animationProps.close).toBeDefined();
	});

	it('should call onClose() function after close transition', () => { // TODO
		// given

		// when

		// then
	});
});
