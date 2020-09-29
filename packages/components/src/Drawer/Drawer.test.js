import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import toJsonWithoutI18n from '../../test/props-without-i18n';

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
		const wrapper = mount(cancelActionComponent({ id: 'test' }));
		expect(wrapper.find('button')).toBeTruthy();
	});
	it('should not render cancelActionComponent', () => {
		expect(cancelActionComponent()).toBe(null);
	});
	it('should render with tabs', () => {
		const tabs = {
			id: 'my-tabs',
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

	it('should render with tabs specific actions by tab with selectedTabKey', () => {
		const tabs = {
			id: 'my-tabs',
			items: [
				{
					key: '1',
					label: 'Tab 1',
					footerActions: {
						actions: {
							left: [
								{
									id: 'view-left-tab-1',
									key: 'view-left-tab-1',
									label: 'ActionLeft-tab-1',
								},
							],
							center: [
								{
									id: 'view-center',
									key: 'view-center',
									label: 'ActionCenter',
								},
							],
							right: [
								{
									id: 'view-right',
									key: 'view-right',
									label: 'ActionRight',
								},
							],
						},
					},
				},
				{
					key: '2',
					label: 'Tab 2',
					footerActions: {
						actions: {
							center: [
								{
									id: 'view-center-tab-2',
									key: 'view-center-tab-2',
									label: 'ActionCenter-tab-2',
								},
							],
						},
					},
				},
				{
					key: '3',
					label: 'Tab 3',
					footerActions: {
						actions: {
							center: [
								{
									id: 'view-center-tab-3',
									key: 'view-center-tab-3',
									label: 'ActionCenter-tab-3',
								},
							],
						},
					},
				},
			],
			onSelect: jest.fn(),
		};
		const wrapper = mount(
			<Drawer tabs={tabs} selectedTabKey="2">
				<h1>Hello world</h1>
			</Drawer>,
		);

		expect(wrapper.find('ActionBar')).toHaveLength(1);
		expect(toJsonWithoutI18n(wrapper.find('ActionBar'))).toMatchSnapshot();
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
		expect(wrapper.find('DrawerTitle').dive().find('Action')).toHaveLength(0);
		expect(wrapper.find('DrawerTitle').dive().find('CustomAction')).toHaveLength(1);
	});

	it('render children event if there is no title', () => {
		function getComponent(name) {
			if (name === 'EditableText') {
				return function EditableText() {
					return <input />;
				};
			}
			return null;
		}

		const props = {
			getComponent,
			tabs: { items: [{ item: { key: 'tab1', label: 'tab1' }, onClick: jest.fn() }] },
		};

		const wrapper = shallow(
			<Drawer {...props}>
				<p>simple drawer</p>
			</Drawer>,
		);

		expect(wrapper.find('DrawerTitle')).toHaveLength(1);
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
						actionId: 'drawer:closeDrawer',
					},
					{
						id: 'action-left-id',
						key: 'action-left-key',
						label: 'action-left-label',
					},
				],
				center: [],
				right: [],
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
				center: [],
				right: [],
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
				center: [],
				right: [],
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
						actionId: 'drawer:closeDrawer',
					},
					{
						id: 'action-left-id',
						key: 'action-left-key',
						label: 'action-left-label',
					},
				],
				center: [],
				right: [],
			},
		};

		expect(combinedFooterActions(onCancelAction, footerActions)).toEqual(result);
		expect(combinedFooterActions(onCancelAction, footerActions)).toEqual(result);
	});

	it('should render cancelActionComponent with passed in className', () => {
		const wrapper = mount(cancelActionComponent({ className: 'btn-inverse' }));
		expect(wrapper.find('Action').prop('className')).toEqual(
			'tc-drawer-close-action theme-tc-drawer-close-action btn-inverse',
		);
	});
});
