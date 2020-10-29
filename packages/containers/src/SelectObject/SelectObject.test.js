import React from 'react';
import { shallow } from 'enzyme';
import { mock } from '@talend/react-cmf';
import Immutable from 'immutable';

import Component from './SelectObject.component';
import Container, { getById, filter, filterAll } from './SelectObject.container';
import Connected, { mapStateToProps } from './SelectObject.connect';

describe('Component SelectObject', () => {
	it('should render', () => {
		const context = mock.store.context();
		const item = new Immutable.Map({ id: '1', name: 'foo' });
		const props = {
			id: 'my-tree',
			schema: {
				jsonSchema: {},
			},
			sourceData: new Immutable.List([item]),
			filter: {
				className: 'my-custom-filter',
			},
			tree: {},
			selected: {
				id: '1',
				name: 'foo',
			},
		};
		const wrapper = shallow(<Component {...props} />, { context });
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});

describe('Container SelectObject', () => {
	it('should render', () => {
		const context = mock.store.context();
		const wrapper = shallow(<Container />, { context });
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should propagate extra props', () => {
		const context = mock.store.context();
		const wrapper = shallow(<Container extra="foo" />, { context });
		expect(wrapper.props().extra).toBe('foo');
	});
	it('should default props with Tree map the selectedId and onTreeClick', () => {
		const context = mock.store.context();
		const tree = {};
		const item = new Immutable.Map({ id: '1', name: 'foo' });
		const sourceData = new Immutable.List([item]);
		const wrapper = shallow(<Container tree={tree} selectedId="1" sourceData={sourceData} />, {
			context,
		});

		const props = wrapper.props();
		expect(props).toEqual({
			breadCrumbsRootLabel: 'root',
			idAttr: 'id',
			nameAttr: 'name',
			preview: undefined,
			selected: item.toJS(),
			selectedId: '1',
			sourceData: new Immutable.List([item]),
			tree: {
				onSelect: wrapper.instance().onTreeClick,
				selectedId: '1',
			},
		});
	});
	it('should set selectedId props to the only matched item if nothing selected', () => {
		const context = mock.store.context();
		const tree = {};
		const item1 = new Immutable.Map({ id: '1', name: 'foo' });
		const item2 = new Immutable.Map({ id: '2', name: 'bar' });
		const sourceData = new Immutable.List([item1, item2]);
		const filteredData = new Immutable.List([item1.set('currentPosition', 'root')]);

		const wrapper = shallow(<Container tree={tree} sourceData={sourceData} query="f" />, {
			context,
		});

		const props = wrapper.props();
		expect(props).toEqual({
			breadCrumbsRootLabel: 'root',
			idAttr: 'id',
			nameAttr: 'name',
			query: 'f',
			selected: item1.toJS(),
			sourceData,
			filteredData,
			results: {
				idAttr: 'id',
				nameAttr: 'name',
				onClick: wrapper.instance().onResultsClick,
				selectedId: '1',
			},
		});
	});
	it('should call props.setState when onTreeClick is called', () => {
		const props = { idAttr: 'id', setState: jest.fn() };
		const instance = new Container(props);
		const data = { id: '1', name: 'foo' };
		instance.onTreeClick(data);
		expect(props.setState).toHaveBeenCalledWith({ selectedId: '1' });
	});
	it('should call props.setState when onTreeClick is called', () => {
		const props = { idAttr: 'id', setState: jest.fn() };
		const instance = new Container(props);
		const data = { id: '1', name: 'foo' };
		instance.onTreeClick(data);
		expect(props.setState).toHaveBeenCalledWith({ selectedId: '1' });
	});
	it('should call filter and getById', () => {
		const props = {
			sourceData: new Immutable.List(),
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
			const first = new Immutable.Map({ myid: 1, children: new Immutable.List([subfirst]) });
			const second = new Immutable.Map({ myid: 2 });
			const items = new Immutable.List([first, second]);
			expect(getById(items, 11, { idAttr: 'myid' })).toEqual({ myid: 11 });
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

		it('does match on multiple leaf children of different node', () => {
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

	describe('filterAll', () => {
		it('does match on non leaf element (non leaf element have children)', () => {
			const tree = [
				{
					id: 1,
					name: 'abc',
					children: [
						{
							id: 2,
							name: 'sub abc',
							children: [
								{
									id: 3,
									name: 'sub sub abc',
								},
							],
						},
					],
				},
				{
					id: 1,
					name: 'def',
				},
			];

			const items = Immutable.fromJS(tree);
			const results = filterAll(items, 'ab');

			expect(results.size).toBe(3);
			expect(results.get(0).get('name')).toBe('abc');
			expect(results.get(0).get('currentPosition')).toBe('root');

			expect(results.get(1).get('name')).toBe('sub abc');
			expect(results.get(1).get('currentPosition')).toBe('root > abc');

			expect(results.get(2).get('name')).toBe('sub sub abc');
			expect(results.get(2).get('currentPosition')).toBe('root > abc > sub abc');
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
	});
});

describe('Connected SelectObject', () => {
	it('should connect SelectObject', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${Container.displayName}))`);
		expect(Connected.WrappedComponent).toBe(Container);
	});
	it('should map state to props', () => {
		const state = mock.store.state();
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
