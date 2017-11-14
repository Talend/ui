import React from 'react';
import { shallow } from 'enzyme';
import mock from '@talend/react-cmf/lib/mock';
import Immutable from 'immutable';
import TreeView, { DEFAULT_PROPS, transform, mapStateToProps } from './TreeView.container';

describe('TreeView', () => {
	it('should use mapStateToProps', () => {
		const context = mock.context();
		const state = mock.state();
		const data = new Immutable.List([
			new Immutable.Map({ id: 1, name: 'foo', children: [] }),
			new Immutable.Map({ id: 2, name: 'bar', children: [] }),
		]);
		context.store.getState = () => state;
		const wrapper = shallow(<TreeView.WrappedComponent data={data} />, { context });
		expect(wrapper.getNode()).toMatchSnapshot();
	});
});

describe('mapStateToProps', () => {
	it('should return props', () => {
		const state = mock.state();
		const data = new Immutable.Map({
			foo: new Immutable.Map({
				bar: new Immutable.List([new Immutable.Map({ foo: 'bar' })]),
			}),
		});
		state.cmf.collections = state.cmf.collections.set('data', data);
		const props = mapStateToProps(state, { collection: 'data.foo.bar' });
		expect(props.data).toBe(data.getIn(['foo', 'bar']));
	});
});

describe('transform', () => {
	it('should return undefined if no items', () => {
		expect(transform()).toBeUndefined();
	});
	it('add selected and toggled boolean every where', () => {
		const props = {
			...DEFAULT_PROPS,
			state: Immutable.Map({
				opened: Immutable.List([1, 11, 111]),
				selectedId: 11,
			}),
		};
		const items = [
			{
				id: 1,
				name: '1',
				children: [
					{
						id: 11,
						name: '11',
						children: [{ id: 111, name: '111' }],
					},
				],
			},
			{
				id: 2,
				name: '2',
			},
		];
		const structure = transform(items, props);
		expect(structure[0].id).toBe(1);
		expect(structure[0].selected).toBe(false);
		expect(structure[0].toggled).toBe(true);
		expect(structure[0].children[0].id).toBe(11);
		expect(structure[0].children[0].selected).toBe(true);
		expect(structure[0].children[0].toggled).toBe(true);
	});
});
