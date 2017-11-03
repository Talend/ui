import React from 'react';
import mock from '@talend/react-cmf/lib/mock';
import { api } from '@talend/react-cmf';
import { shallow } from 'enzyme';

import Connected, { mapStateToProps, ContainerActionDropdown } from './ActionDropdown.connect';

describe('Connected ActionDropdown', () => {
	it('should connect ActionDropdown', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${ContainerActionDropdown.displayName}))`);
		expect(Connected.WrappedComponent).toBe(ContainerActionDropdown);
	});
	it('should map state to props', () => {
		const state = {};
		const props = mapStateToProps(state);
		expect(typeof props).toBe('object');
	});

	it('should render dropdown and items from settings', () => {
		// given
		const context = mock.context();

		// when
		const wrapper = shallow(<Connected actionId="menu:article:items" />, { context });

		// then
		expect(wrapper.node).toMatchSnapshot();
	});

	it('should render dropdown from settings and items from expression', () => {
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
});
