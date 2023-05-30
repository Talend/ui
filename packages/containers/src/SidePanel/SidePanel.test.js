import { screen, render } from '@testing-library/react';
import { mock } from '@talend/react-cmf';
// eslint-disable-next-line @talend/import-depth
import { prepareCMF } from '@talend/react-cmf/src/mock/rtl';
import SidePanel from './SidePanel.container';
import Connected, { mapStateToProps, mergeProps } from './SidePanel.connect';
import { ACTION_TYPE_LINK } from './constants';
import Action from '../Action';

jest.unmock('@talend/design-system');

describe('SidePanel', () => {
	it('should render', () => {
		// const context = mock.store.context();
		const { container } = render(<SidePanel />);
		expect(container.firstChild).toMatchSnapshot();
	});
	it('should render provided actions as string', async () => {
		const actions = ['menu:article', 'menu:demo'];
		render(
			await prepareCMF(<Connected actionIds={actions} />, {
				cmfModule: {
					id: 'test',
					components: {
						Action,
					},
					preloadedState: {
						cmf: {
							settings: {
								actions: {
									'menu:article': {
										label: 'Article',
										name: 'Article',
										href: '/article',
										icon: 'talend-file-xls-o',
									},
									'menu:demo': {
										label: 'Demo',
										name: 'Demo',
										href: '/demo',
										icon: 'talend-file-xls-o',
									},
								},
								props: {},
							},
						},
					},
				},
			}),
		);
		expect(screen.getByText('Article')).toBeVisible();
		expect(screen.getByText('Demo')).toBeVisible();
	});
});

describe('SidePanel.mapStateToProps', () => {
	const { location } = window;
	let state;

	beforeEach(() => {
		state = mock.store.state();

		delete window.location;
		window.location = { pathname: '/test' };
	});

	afterAll(() => {
		window.location = location;
	});

	it('should check for each action if one goes to the current route', () => {
		const props = mapStateToProps(state, {
			actionIds: ['menu:routerReplace'],
		});
		expect(props.actions[0].active).toBe(true);

		const notactive = mapStateToProps(state, {
			actionIds: ['menu:routerPush'],
		});
		expect(notactive.actions[0].active).toBeUndefined();

		window.location.pathname = '/push';
		const push = mapStateToProps(state, {
			actionIds: ['menu:routerPush'],
		});
		expect(push.actions[0].active).toBe(true);

		window.location.pathname = '/href';
		const href = mapStateToProps(state, {
			actionIds: ['menu:href'],
		});
		expect(href.actions[0].active).toBe(true);
	});

	xit('should handle actionCreator with href', () => {
		window.location.pathname = '/href';
		const href = mapStateToProps(state, {
			actionIds: ['menu:href'],
		});
		expect(href.actions[0]).toBe();
		expect(href.actions[0].href).toBe('/href');
	});

	describe('integrated menu item routing with "actions" prop', () => {
		it('should do nothing if prop does not exist', () => {
			const props = mapStateToProps(state, {});
			expect(props.actions).toBeUndefined();
		});

		it('should construct the actions based on the props given in "actions" elements', () => {
			window.location.pathname = '/whatever/current/path';
			const ownProps = {
				componentId: 'compId',
				actions: [
					{
						whateverAction: 'prop',
					},
					{
						anotherRandomSpecificActionProp: 'other prop',
					},
				],
			};
			const props = mapStateToProps(state, ownProps);
			expect(props.actions).not.toBe(ownProps.actions);
			expect(props.actions.length).toBe(ownProps.actions.length);
			expect(props.actions[0]).toBe(ownProps.actions[0]);
			expect(props.actions[1]).toBe(ownProps.actions[1]);
		});

		it('should define the routing onClick for each "actions" item if "path" is specified', () => {
			window.location.pathname = '/whatever/current/path';
			const props = mapStateToProps(state, {
				componentId: 'compId',
				actions: [
					{
						whateverAction: 'prop',
						href: 'whatever/path/to/route',
					},
					{
						anotherRandomSpecificActionProp: 'other prop',
					},
				],
			});
			expect(props.actions[0]).toMatchObject({
				href: 'whatever/path/to/route',
				onClick: expect.anything(),
				onClickDispatch: {
					type: ACTION_TYPE_LINK,
					cmf: {
						routerPush: 'whatever/path/to/route',
					},
				},
			});
			expect(props.actions[1].onClick).toBeUndefined();
		});

		test.each([
			{
				name: 'Usual simple path',
				currentRoute: '/a/usual/path',
				itemRoute: '/a/usual/path',
				isMatching: true,
			},
			{
				name: 'Usual simple path with trailing /',
				currentRoute: '/a/usual/path/',
				itemRoute: '/a/usual/path',
				isMatching: true,
			},
			{
				name: 'Usual simple path with trailing / on match',
				currentRoute: '/a/usual/path',
				itemRoute: '/a/usual/path/',
				isMatching: true,
			},
			{
				name: 'Subset path starting at the beginning',
				currentRoute: '/a/usual/path',
				itemRoute: '/a/usual',
				isMatching: true,
			},
			{
				name: 'Subset path starting at the beginning but without the exact last segment (currentRoute longer)',
				currentRoute: '/a/usual/path',
				itemRoute: '/a/usual/pat',
				isMatching: false,
			},
			{
				name: 'Subset path starting at the beginning but without the exact last segment (currentRoute shorter)',
				currentRoute: '/a/usual/pat',
				itemRoute: '/a/usual/path',
				isMatching: false,
			},
			{
				name: 'Subset path but not starting at the beginning',
				currentRoute: '/a/usual/path',
				itemRoute: '/usual/path',
				isMatching: false,
			},
			{
				name: 'Subset path starting with hash',
				currentRoute: '/a/usual#lol',
				itemRoute: '/a/usual',
				isMatching: true,
			},
			{
				name: 'Matching hash based route',
				currentRoute: '#hashBasedRoute',
				itemRoute: '#hashBasedRoute',
				isMatching: true,
			},
			{
				name: 'Non Matching hash based route',
				currentRoute: '#hashBasedRoute',
				itemRoute: '#hashBasedRouta',
				isMatching: false,
			},
		])('$name', ({ currentRoute, itemRoute, isMatching }) => {
			window.location.pathname = currentRoute;
			const actionSelectable = {
				identity: 'The one',
				href: itemRoute,
			};

			const props = mapStateToProps(state, {
				componentId: 'compId',
				actions: [
					{
						anotherRandomSpecificActionProp: 'other prop',
						href: 'whatever/path/to/route',
					},
					actionSelectable,
				],
			});

			if (isMatching) {
				expect(props.selected).toMatchObject(actionSelectable);
			} else {
				expect(props.selected).toBeUndefined();
			}
		});

		it('should memoized "actions" and "selected" computed', () => {
			const actions = [
				{
					href: 'whatever/path/to/route',
				},
				{
					href: 'whatever/other/path/to/route',
				},
			];

			window.location.pathname = 'whatever/path/to/route/somewhere';
			const componentId = 'compId';
			const propsStep1 = mapStateToProps(state, {
				componentId,
				actions,
			});

			const propsStep2 = mapStateToProps(state, {
				componentId,
				actions,
			});

			expect(propsStep1.actions).toBe(propsStep2.actions);
			expect(propsStep1.selected).toBe(propsStep2.selected);
		});
	});
});

describe('SidePanel.mergeProps', () => {
	it('should delete actionIds', () => {
		const props = mergeProps({}, {}, { actionIds: [] });
		expect(props.actionIds).toBeUndefined();
	});
	it('should merge', () => {
		const props = mergeProps({ foo: 'foo' }, { bar: 'bar' }, { baz: 'baz' });
		expect(props.bar).toBe('bar');
		expect(props.baz).toBe('baz');
		expect(props.foo).toBe('foo');
	});
});
