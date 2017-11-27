import React from 'react';
import { shallow } from 'enzyme';
import mock from '@talend/react-cmf/lib/mock';
import Immutable from 'immutable';

import Component from './SelectObject.component';
import Container, { getById, filter } from './SelectObject.container';
import Connected, { mapStateToProps } from './SelectObject.connect';

describe('Component SelectObject', () => {
	it('should render', () => {
		const context = mock.context();
		const wrapper = shallow(<Component name="Hello world" />, { context });
		expect(wrapper.getNode()).toMatchSnapshot();
	});
});

describe('Container SelectObject', () => {
	it('should render', () => {
		const context = mock.context();
		const wrapper = shallow(<Container />, { context });
		expect(wrapper.getNode()).toMatchSnapshot();
	});
	it('should support extra props', () => {
		const context = mock.context();
		const wrapper = shallow(<Container extra="foo" />, { context });
		expect(wrapper.props().extra).toBe('foo');
	});
	it('should call filter and getById', () => {
		const props = {
			sourceData: [],
			query: 'query',
			selectedId: 1,
		};
		const instance = new Container(props);
		instance.filter = jest.fn();
		instance.getById = jest.fn();
		instance.render();
		expect(instance.filter).toHaveBeenCalled();
		expect(instance.getById).toHaveBeenCalled();
	});

	describe('getById', () => {
		it('should return nothing if not found and POO if found', () => {
			const subfirst = new Immutable.Map({ id: 11 });
			const first = new Immutable.Map({ id: 1, children: new Immutable.List([subfirst]) });
			const second = new Immutable.Map({ id: 2 });
			const items = new Immutable.List([first, second]);
			expect(getById(items, 11)).toEqual({ id: 11 });
			expect(getById(items, 3)).toBe();
		});
		it('should return be able to support some options', () => {
			const subfirst = new Immutable.Map({ myid: 11 });
			const first = new Immutable.Map({ myid: 1, mychild: new Immutable.List([subfirst]) });
			const second = new Immutable.Map({ myid: 2 });
			const items = new Immutable.List([first, second]);
			expect(getById(items, 11, { idAttr: 'myid', childrenAttr: 'mychild' })).toEqual({ myid: 11 });
			expect(getById(items, 3)).toBe();
		});
	});
	describe('filter', () => {
		it('does not match on non leaf element (non leaf element have children)', () => {
			// given
			const subfirst = new Immutable.Map({ id: 11, name: 'sub' });
			const first = new Immutable.Map({
				id: 1,
				name: 'abc',
				children: new Immutable.List([subfirst]),
			});
			const second = new Immutable.Map({ id: 2, name: 'foo' });
			const items = new Immutable.List([first, second]);

			// when
			const results = filter(items, 'ab');

			// then
			expect(results.size).toBe(0);
		});
		it('does match only on leaf element', () => {
			// given
			const subfirst = new Immutable.Map({ id: 11, name: 'sub' });
			const first = new Immutable.Map({
				id: 1,
				name: 'abc',
				children: new Immutable.List([subfirst]),
			});
			const second = new Immutable.Map({ id: 2, name: 'foo' });
			const items = new Immutable.List([first, second]);

			// when
			const results = filter(items, 'sub');

			// then
			expect(results.size).toBe(1);
			expect(results.get(0).get('name')).toBe('sub');
			expect(results.get(0).get('toggled')).toBeFalsy();
			expect(results.get(0).get('currentPosition')).toBe('root > abc');
			expect(results.get(0).get('children')).toBeFalsy();
		});
		it('does match on multiple leaf elements of different depth, result is list', () => {
			// given
			const subfirst = new Immutable.Map({ id: 11, name: 'sub' });
			const first = new Immutable.Map({
				id: 1,
				name: 'abc',
				children: new Immutable.List([subfirst]),
			});
			const second = new Immutable.Map({ id: 2, name: 'sub' });
			const items = new Immutable.List([first, second]);

			// when
			const results = filter(items, 'sub');

			// then
			expect(results.size).toBe(2);
			expect(results.get(0).get('name')).toBe('sub');
			expect(results.get(0).get('currentPosition')).toBe('root > abc');
			expect(results.get(1).get('name')).toBe('sub');
			expect(results.get(1).get('currentPosition')).toBe('root');
			expect(results.get(0).get('toggled')).toBeFalsy();
			expect(results.get(0).get('children')).toBeFalsy();
			expect(results.get(1).get('children')).toBeFalsy();
		});

		it('does match on multiple leaf children of a node', () => {
			// given
			const subfirst = new Immutable.Map({ id: 11, name: 'sub1' });
			const subsecond = new Immutable.Map({
				id: 12,
				name: 'sub2',
				children: new Immutable.List([Immutable.Map()]),
			});
			const subthird = new Immutable.Map({ id: 13, name: 'sub3' });
			const first = new Immutable.Map({
				id: 1,
				name: 'abc',
				children: new Immutable.List([subfirst, subsecond, subthird]),
			});
			const second = new Immutable.Map({ id: 2, name: 'sub' });
			const items = new Immutable.List([first, second]);

			// when
			const results = filter(items, 'sub');

			// then
			expect(results.size).toBe(3);
			expect(results.get(0).get('name')).toBe('sub1');
			expect(results.get(0).get('currentPosition')).toBe('root > abc');
			expect(results.get(1).get('name')).toBe('sub3');
			expect(results.get(1).get('currentPosition')).toBe('root > abc');
			expect(results.get(2).get('name')).toBe('sub');
			expect(results.get(2).get('currentPosition')).toBe('root');
			expect(results.get(0).get('toggled')).toBeFalsy();
			expect(results.get(0).get('children')).toBeFalsy();
			expect(results.get(1).get('children')).toBeFalsy();
			expect(results.get(2).get('children')).toBeFalsy();
		});

		it('does match on multiple leaf children of differents node', () => {
			// given
			const subfirst = new Immutable.Map({ id: 11, name: 'sub1' });
			const subsecond = new Immutable.Map({ id: 13, name: 'sub2' });
			const first = new Immutable.Map({
				id: 1,
				name: 'abc',
				children: new Immutable.List([subfirst]),
			});
			const second = new Immutable.Map({
				id: 2,
				name: 'sub',
				children: new Immutable.List([subsecond]),
			});
			const items = new Immutable.List([first, second]);

			// when
			const results = filter(items, 'sub');

			// then
			expect(results.size).toBe(2);
			expect(results.get(0).get('name')).toBe('sub1');
			expect(results.get(0).get('currentPosition')).toBe('root > abc');
			expect(results.get(1).get('name')).toBe('sub2');
			expect(results.get(1).get('currentPosition')).toBe('root > sub');
			expect(results.get(0).get('toggled')).toBeFalsy();
			expect(results.get(0).get('children')).toBeFalsy();
			expect(results.get(1).get('children')).toBeFalsy();
		});

		it('return the original struct if no query or empty query is provided', () => {
			// given
			const subfirst = new Immutable.Map({ id: 11, name: 'sub1' });
			const subsecond = new Immutable.Map({
				id: 12,
				name: 'sub2',
				children: new Immutable.List([Immutable.Map()]),
			});
			const subthird = new Immutable.Map({ id: 13, name: 'sub3' });
			const first = new Immutable.Map({
				id: 1,
				name: 'abc',
				children: new Immutable.List([subfirst, subsecond, subthird]),
			});
			const second = new Immutable.Map({ id: 2, name: 'sub' });
			const items = new Immutable.List([first, second]);

			// when
			const results = filter(items, '');
			const results2 = filter(items);

			// then
			expect(results).toBe(items);
			expect(results2).toBe(items);
		});
	});
});

describe('Connected SelectObject', () => {
	it('should connect SelectObject', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${Container.displayName}))`);
		expect(Connected.WrappedComponent).toBe(Container);
	});
	it('should map state to props', () => {
		const state = mock.state();
		const data = new Immutable.List([
			new Immutable.Map({ label: 'foo' }),
			new Immutable.Map({ label: 'bar' }),
		]);
		state.cmf.collections = new Immutable.Map({
			width: new Immutable.Map({ data }),
		});
		state.cmf.components = new Immutable.Map({
			'Container(FilterBar)': new Immutable.Map({
				test: new Immutable.Map({ query: 'foo' }),
			}),
			'Container(Tree)': new Immutable.Map({
				test: new Immutable.Map({ selectedId: '27' }),
			}),
		});
		const props = mapStateToProps(state, {
			id: 'test',
			nameAttr: 'label',
			source: 'width.data',
			tree: { extra: true },
		});
		expect(typeof props).toBe('object');
		expect(props).toEqual({
			query: 'foo',
			sourceData: data,
			tree: {
				extra: true,
				nameAttr: 'label',
			},
		});
	});
});
