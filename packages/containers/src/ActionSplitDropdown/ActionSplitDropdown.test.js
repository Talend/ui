import React from 'react';
import { shallow } from 'enzyme';
import mock from '@talend/react-cmf/lib/mock';
import { api } from '@talend/react-cmf';

import Connected, {
	mapStateToProps,
	ContainerActionSplitDropdown,
} from './ActionSplitDropdown.connect';

describe('Connect(CMF(Container(ActionSplitDropdown)))', () => {
	it('should connect ActionSplitDropdown', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${ContainerActionSplitDropdown.displayName}))`);
		expect(Connected.WrappedComponent).toBe(ContainerActionSplitDropdown);
	});

	it('should render splitDropdown and items from settings', () => {
		// given
		const context = mock.context();

		// when
		const wrapper = shallow(<Connected actionId="menu:article:items" />, { context });

		// then
		expect(wrapper.node).toMatchSnapshot();
	});

	it('should render splitDropdown from settings and items from expression', () => {
		// given
		const registry = api.registry.getRegistry();
		const getItems = () => [
			{
				label: 'label 1',
				actionCreator: 'item1:action',
			},
		];
		const context = mock.context();
		registry['expression:getItems'] = getItems;
		registry['actionCreator:item1:action'] = jest.fn();

		// when
		const wrapper = shallow(<Connected actionId="menu:items" />, {
			context,
		});

		// then
		expect(wrapper.node).toMatchSnapshot();
	});

	it('should render splitDropdown from settings', () => {
		// given
		const context = mock.context();

		// when
		const wrapper = shallow(<Connected actionId="menu:raw-items" />, { context });

		// then
		expect(wrapper.node).toMatchSnapshot();
	});

	it('should map state to props', () => {
		const state = mock.state();
		const actionId = 'menu:article';
		const actionIds = ['menu:items'];
		const props = mapStateToProps(state, { actionId, actionIds });
		expect(typeof props).toBe('object');
		expect(props).toMatchObject({
			name: 'My article',
			payload: {},
			items: [{ name: 'my items' }],
		});
	});
});

describe('Container(ActionSplitDropdown)', () => {
	it('should render', () => {
		const context = mock.context();
		const wrapper = shallow(
			<ContainerActionSplitDropdown
				foo="extra"
				actionId="menu:article"
				actionIds={['menu:items']}
				items={[{ foo: 'bar' }]}
			/>,
			{ context },
		);
		expect(wrapper.getNode()).toMatchSnapshot();
		const props = wrapper.props();
		expect(typeof props.items[0].onClick).toBe('function');
	});
});
