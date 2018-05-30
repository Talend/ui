import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';

import Drawer, { cancelActionComponent, combinedFooterActions } from './Drawer.component';

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

	it('render with injected TabBar or Action if provided', () => {
		function getComponent(name) {
			if (name === 'TabBar') {
				return function CustomTabBar() {
					return <p className="custom">injected tabbar</p>;
				};
			} else if (name === 'Action') {
				return function CustomAction() {
					return <button>custom</button>;
				};
			}
			return null;
		}

		const props = {
			getComponent,
			title: 'test',
			tabs: { items: [{ item: { key: 'tab1', label: 'tab1' }, onClick: jest.fn() }] },
			onCancelAction: { id: 'cacel-button-id' },
			footerActions: { actions: { left: [] } },
		};

		const wrapper = shallow(
			<Drawer {...props}>
				<p>simple drawer</p>
			</Drawer>,
		);

		expect(wrapper.find('TabBar')).toHaveLength(0);
		expect(wrapper.find('CustomTabBar')).toHaveLength(1);
		expect(
			wrapper
				.find('DrawerTitle')
				.dive()
				.find('Action'),
		).toHaveLength(0);
		expect(
			wrapper
				.find('DrawerTitle')
				.dive()
				.find('CustomAction'),
		).toHaveLength(1);
	});

	it('test combinedFooterActions with existing actions left and onCancelAction', () => {
		const onCancelAction = {
			actionId: 'drawer:closeDrawer',
		};
		const footerActions = {
			actions: {
				left: [
					{
						id: 'action-left-id',
						key: 'action-left-key',
						label: 'action-left-label',
					},
				],
			},
		};

		const result = {
			actions: {
				left: [
					{
						id: 'action-left-id',
						key: 'action-left-key',
						label: 'action-left-label',
					},
					{
						actionId: 'drawer:closeDrawer',
					},
				],
			},
		};

		expect(combinedFooterActions(onCancelAction, footerActions)).toEqual(result);
	});

	it('test combinedFooterActions with onCancelAction and without actions left', () => {
		const onCancelAction = {
			actionId: 'drawer:closeDrawer',
		};
		const footerActions = {
			actions: {
				left: [],
			},
		};

		const result = {
			actions: {
				left: [
					{
						actionId: 'drawer:closeDrawer',
					},
				],
			},
		};

		expect(combinedFooterActions(onCancelAction, footerActions)).toEqual(result);
	});

	it('test combinedFooterActions without actions left and onCancelAction', () => {
		const footerActions = {
			actions: {
				left: [
					{
						id: 'action-left-id',
						key: 'action-left-key',
						label: 'action-left-label',
					},
				],
			},
		};

		expect(combinedFooterActions(undefined, footerActions)).toEqual(footerActions);
	});

	it('test combinedFooterActions save good object references', () => {
		const onCancelAction = {
			actionId: 'drawer:closeDrawer',
		};
		const footerActions = {
			actions: {
				left: [
					{
						id: 'action-left-id',
						key: 'action-left-key',
						label: 'action-left-label',
					},
				],
			},
		};

		const result = {
			actions: {
				left: [
					{
						id: 'action-left-id',
						key: 'action-left-key',
						label: 'action-left-label',
					},
					{
						actionId: 'drawer:closeDrawer',
					},
				],
			},
		};

		expect(combinedFooterActions(onCancelAction, footerActions)).toEqual(result);
		expect(combinedFooterActions(onCancelAction, footerActions)).toEqual(result);
	});
});
