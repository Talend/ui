import React from 'react';
import { shallow } from 'enzyme';
import cases from 'jest-in-case';
import mock from '@talend/react-cmf/lib/mock';
import SidePanel from './SidePanel.container';
import { mapStateToProps, mergeProps } from './SidePanel.connect';

describe('SidePanel', () => {
	it('should render', () => {
		const context = mock.context();
		const sidepanel = shallow(<SidePanel />, { context });
		expect(sidepanel.getElement()).toMatchSnapshot();
	});
	it('should render provided actions as string', () => {
		const actions = ['menu:article', 'menu:demo'];
		const context = mock.context();
		const sidepanel = shallow(<SidePanel actions={actions} />, { context });
		expect(sidepanel.getElement()).toMatchSnapshot();
	});
});

describe('SidePanel.mapStateToProps', () => {
	it('should check for each action if one goes to the current route', () => {
		const state = mock.state();
		const props = mapStateToProps(state, {
			location: { pathname: '/test' },
			actionIds: ['menu:routerReplace'],
		});
		expect(props.actions[0].active).toBe(true);

		const notactive = mapStateToProps(state, {
			location: { pathname: '/different' },
			actionIds: ['menu:routerReplace'],
		});
		expect(notactive.actions[0].active).toBeUndefined();

		const push = mapStateToProps(state, {
			location: { pathname: '/push' },
			actionIds: ['menu:routerPush'],
		});
		expect(push.actions[0].active).toBe(true);

		const href = mapStateToProps(state, {
			location: { pathname: '/href' },
			actionIds: ['menu:href'],
		});
		expect(href.actions[0].active).toBe(true);
	});

	xit('should handle actionCreator with href', () => {
		const state = mock.state();
		const href = mapStateToProps(state, {
			location: { pathname: '/href' },
			actionIds: ['menu:href'],
		});
		expect(href.actions[0]).toBe();
		expect(href.actions[0].href).toBe('/href');
	});

	describe('integrated menu item routing with "menuActions" prop', () => {
		it('should do nothing if prop not exists', () => {
			const state = mock.state();
			const props = mapStateToProps(state, {});
			expect(props.actions).toBeUndefined();
		});

		it('should construct the actions based on the props given in "menuActions" elements', () => {
			const state = mock.state();
			const props = mapStateToProps(state, {
				location: { pathname: '/whatever/current/path' },
				menuActions: [
					{
						whateverAction: 'prop',
					},
					{
						anotherRandomSpecificActionProp: 'other prop',
					},
				],
			});
			expect(props.actions[0].whateverAction).toBe('prop');
			expect(props.actions[1].anotherRandomSpecificActionProp).toBe('other prop');
		});

		it('should define the routing onClick for each "menuActions" item if "path" is specified', () => {
			const state = mock.state();
			const props = mapStateToProps(state, {
				location: { pathname: '/whatever/current/path' },
				menuActions: [
					{
						whateverAction: 'prop',
						path: 'whatever/path/to/route',
					},
					{
						anotherRandomSpecificActionProp: 'other prop',
					},
				],
			});
			expect(props.actions[0].onClickDispatch).toEqual({
				type: 'MENU_LINK',
				cmf: {
					routerReplace: 'whatever/path/to/route',
				},
			});
			expect(props.actions[1].onClick).toBeUndefined();
		});

		cases(
			'should define "selected" action based on the same "menuActions" item "path"',
			({ currentRoute, itemRoute, isMatching }) => {
				const state = mock.state();
				const actionSelectable = {
					identity: 'The one',
					path: itemRoute,
				};

				const props = mapStateToProps(state, {
					location: { pathname: currentRoute },
					menuActions: [
						{
							anotherRandomSpecificActionProp: 'other prop',
							path: 'whatever/path/to/route',
						},
						actionSelectable,
					],
				});

				if (isMatching) {
					expect(props.selected.identity).toBe('The one');
				} else {
					expect(props.selected).toBeUndefined();
				}
			},
			[
				{
					name: 'Usual simple path',
					currentRoute: '/a/usual/path',
					itemRoute: '/a/usual/path',
					isMatching: true,
				},
				{
					name: 'Subset path starting at the beginning',
					currentRoute: '/a/usual/path',
					itemRoute: '/a/usual',
					isMatching: true,
				},
				{
					name: 'Complex subset path starting at the beginning',
					currentRoute: '/some/path/not/super/really/usual/but/which/can/occur',
					itemRoute: '/some/path/not/super/really/usual',
					isMatching: true,
				},
				{
					name:
						'Subset path starting at the beginning but without the exact last segment (currentRoute longer)',
					currentRoute: '/a/usual/path',
					itemRoute: '/a/usual/pat',
					isMatching: false,
				},
				{
					name:
						'Subset path starting at the beginning but without the exact last segment (currentRoute shorter)',
					currentRoute: '/a/usual/pat',
					itemRoute: '/a/usual/path',
					isMatching: false,
				},
				{
					name:
						'Subset path starting at the beginning but without the last item path segment matching (currentRoute with more segments)',
					currentRoute: '/a/usual/path/with/some/others/paths',
					itemRoute: '/a/usual/pat',
					isMatching: false,
				},
				{
					name: 'Subset path but not starting at the beginning',
					currentRoute: '/a/usual/path',
					itemRoute: '/usual/path',
					isMatching: false,
				},
				{
					name: 'Just a total other path',
					currentRoute: '/a/usual/path',
					itemRoute: '/this/path/has/nothing/in/common',
					isMatching: false,
				},
				{
					name: 'More specific path than the current route',
					currentRoute: '/a/usual',
					itemRoute: '/a/usual/path',
					isMatching: false,
				},
			],
		);

		it('should memoized "actions" and "selected" computed', () => {
			const state = mock.state();

			const menuActions = [
				{
					path: 'whatever/path/to/route',
				},
				{
					path: 'whatever/other/path/to/route',
				},
			];

			const currentRoute = 'whatever/path/to/route/somewhere';

			const propsStep1 = mapStateToProps(state, {
				location: { pathname: currentRoute },
				menuActions,
			});

			const propsStep2 = mapStateToProps(state, {
				location: { pathname: currentRoute },
				menuActions,
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
	it('should delete "menuActions"', () => {
		const props = mergeProps({}, {}, { menuActions: [] });
		expect(props.menuActions).toBeUndefined();
	});
});
