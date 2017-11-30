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
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});

describe('Container SelectObject', () => {
	it('should render', () => {
		const context = mock.context();
		const wrapper = shallow(<Container />, { context });
		expect(wrapper.getElement()).toMatchSnapshot();
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
		it('should return a tree with only the item match', () => {
			// given
			const subfirst = new Immutable.Map({ id: 11, name: 'sub abc' });
			const first = new Immutable.Map({
				id: 1,
				name: 'abc',
				children: new Immutable.List([subfirst]),
			});
			const second = new Immutable.Map({ id: 2, name: 'foo' });
			const items = new Immutable.List([first, second]);

			// when
			const results = filter(items, 's');

			// then
			expect(results.size).toBe(1);
			expect(results.get(0).get('name')).toBe('abc');
			expect(
				results
					.get(0)
					.get('children')
					.get(0)
					.get('name'),
			).toBe('sub abc');
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
