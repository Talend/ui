import React from 'react';
import { shallow } from 'enzyme';
import { api } from '@talend/react-cmf';
import mock from '@talend/react-cmf/lib/mock';
import { ActionDropdown } from '@talend/react-components';
import Connected, { mapStateToProps, ContainerActionDropdown, mergeProps } from './ActionDropdown.connect';

describe('Connect(CMF(Container(ActionDropdown)))', () => {
	it('should connect ActionDropdown', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${ContainerActionDropdown.displayName}))`);
		expect(Connected.WrappedComponent).toBe(ContainerActionDropdown);
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

	it('should render dropdown from settings', () => {
		// given
		const context = mock.context();

		// when
		const wrapper = shallow(<Connected actionId="menu:raw-items" />, { context });

		// then
		expect(wrapper.node).toMatchSnapshot();
	});

	it('should map state to props', () => {
		const state = {
			cmf: {
				settings: {
					actions: {
						foo: { id: 'foo', label: 'Foo!', actionIds: ['foosub1', 'foosub2'] },
						foosub1: { id: 'foosub1', label: 'sub 1' },
						foosub2: { id: 'foosub2', label: 'sub 2' },
					},
				},
			},
		};
		const props = mapStateToProps(state, { actionId: 'foo' });
		expect(typeof props).toBe('object');
		expect(props.label).toBe('Foo!');
		expect(props.items.length).toBe(2);
		expect(props.items[0].label).toBe('sub 1');
		expect(props.items[1].label).toBe('sub 2');
	});
	it('should mergeProps', () => {
		const props = mergeProps({ foo: 'foo' }, { bar: 'bar' }, { baz: 'baz', foo: 'owned' });
		expect(props.foo).toBe('foo');
		expect(props.bar).toBe('bar');
	});
});

describe('Container(ActionDropdown)', () => {
	it('should render', () => {
		const context = mock.context();
		const actionIds = ['menu:article'];
		const items = [{ label: 'Foo' }];
		const wrapper = shallow(
			<ContainerActionDropdown foo="extra" actionIds={actionIds} items={items} />,
			{ context },
		);
		expect(wrapper.getNode()).toMatchSnapshot();
		expect(wrapper.find(ActionDropdown).length).toBe(1);
	});
});
