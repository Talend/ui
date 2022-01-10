import React from 'react';
import { mount } from 'enzyme';
import { mock } from '@talend/react-cmf';

import Action, { mapStateToProps, mergeProps } from './Action.connect';

describe('Action', () => {
	it('should render from name props keeping extra props', () => {
		const context = mock.store.context();
		const wrapper = mount(
			<Action actionId="menu:article" extra="foo" />,
			mock.Provider.getEnzymeOption(context),
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});

describe('Action.mapStateToProps', () => {
	it('should resolve all action props', () => {
		const state = mock.store.state();
		state.cmf.settings.actions = {
			'menu:article': {
				label: 'foo',
				icon: 'bar',
				displayMode: 'dropdown',
				loading: true,
			},
		};
		const ownProps = {
			actionId: 'menu:article',
			items: [],
		};

		const props = mapStateToProps(state, ownProps);

		expect(props).toEqual(
			expect.objectContaining({
				label: 'foo',
				icon: 'bar',
				displayMode: 'dropdown',
				loading: true,
			}),
		);
	});
});

describe('Action.mergeProps', () => {
	it('should merge all props while removing the actionId prop to avoid retrieving a second time the settings in the sub action component (dropdown, etc.)', () => {
		const ownProps = {
			actionId: 'menu:article',
			loading: false,
		};

		const stateProps = {
			label: 'my dropdown',
			displayMode: 'dropdown',
			icon: 'an icon',
			items: [
				{
					label: 'item 1',
				},
				{
					label: 'item 2',
				},
			],
		};

		const dispatchProps = {
			onToggle: () => {},
			onSelect: () => {},
		};

		const props = mergeProps(stateProps, dispatchProps, ownProps);
		expect(props).toEqual({
			loading: false,
			label: 'my dropdown',
			displayMode: 'dropdown',
			icon: 'an icon',
			items: [
				{
					label: 'item 1',
				},
				{
					label: 'item 2',
				},
			],
			onToggle: expect.any(Function),
			onSelect: expect.any(Function),
		});
	});
});
