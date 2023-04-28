import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';

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
		render(cancelActionComponent({ id: 'test' }));
		expect(screen.getByRole('link')).toBeInTheDocument();
	});
	it('should not render cancelActionComponent', () => {
		render(cancelActionComponent());
		expect(screen.queryByRole('link')).not.toBeInTheDocument();
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
		render(
			<Drawer tabs={tabs} selectedTabKey="2">
				<h1>Hello world</h1>
			</Drawer>,
		);

		expect(screen.getByText('Tab 1')).toBeInTheDocument();
		expect(screen.getByText('Tab 2')).toBeInTheDocument();
		expect(screen.getByText('Tab 3')).toBeInTheDocument();

		expect(screen.getByText('Hello world')).toBeInTheDocument();
		expect(screen.getByText('ActionCenter-tab-2')).toBeInTheDocument();

		expect(screen.queryByText('ActionLeft-tab-1')).not.toBeInTheDocument();
		expect(screen.queryByText('ActionCenter-tab-3')).not.toBeInTheDocument();
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

		render(
			<Drawer {...props}>
				<p>simple drawer</p>
			</Drawer>,
		);

		expect(screen.getByText('injected tabbar')).toBeInTheDocument();
		expect(screen.getByText('custom')).toBeInTheDocument();
	});

	it('render children even if there is no title', () => {
		function getComponent(name) {
			if (name === 'EditableText') {
				return function EditableText() {
					return <input />;
				};
			} else if (name === 'TabBar') {
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
			tabs: { items: [{ item: { key: 'tab1', label: 'tab1' }, onClick: jest.fn() }] },
		};

		render(
			<Drawer {...props}>
				<p>simple drawer</p>
			</Drawer>,
		);

		expect(screen.getByText('simple drawer')).toBeInTheDocument();
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
});

function getComponent(name) {
	if (name === 'EditableText') {
		return function EditableText() {
			return <input />;
		};
	}
	return null;
}

const tagTitleProps = {
	getComponent,
	title: 'test',
	subtitle: 'subtitle test',
	subtitleTag: {
		label: 'BETA',
		tooltip: 'This is a BETA tag',
		variant: 'beta',
	},
};

describe('Drawer title', () => {
	it('should render drawer title with a tag', () => {
		render(<Drawer.Title {...tagTitleProps} />);
		expect(screen.getByText('test')).toBeInTheDocument();
	});
	it('should render drawer title with a tag and a tooltip', () => {
		const tooltipAndTagTitleProps = {
			...tagTitleProps,
			subtitleTagTooltip: 'It might work :D',
		};

		render(<Drawer.Title {...tooltipAndTagTitleProps} />);

		expect(screen.getByText('test')).toBeInTheDocument();
		expect(screen.getByText('BETA')).toBeInTheDocument();
	});
});
