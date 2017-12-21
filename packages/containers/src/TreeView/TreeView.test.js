import React from 'react';
import { shallow } from 'enzyme';
import mock from '@talend/react-cmf/lib/mock';
import Immutable from 'immutable';
import TreeView, {
	DEFAULT_STATE,
	DEFAULT_PROPS,
	transform,
	mapStateToProps,
} from './TreeView.container';

describe('TreeView', () => {
	let context;
	let state;
	let data;
	beforeEach(() => {
		context = mock.context();
		state = mock.state();
		data = new Immutable.List([
			new Immutable.Map({ id: 1, name: 'foo', children: [] }),
			new Immutable.Map({ id: 2, name: 'bar', children: [] }),
		]);
		context.store.getState = () => state;
	});
	it('should render the data', () => {
		const wrapper = shallow(<TreeView.WrappedComponent data={data} />, { context });
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should setState onClick', () => {
		const prevState = {
			state: DEFAULT_STATE,
		};
		const setState = jest.fn(fn => {
			prevState.state = fn(prevState);
		});
		const dispatchActionCreator = jest.fn();
		const onClick = jest.fn();
		const onClickActionCreator = 'my:action';
		const props = {
			setState,
			dispatchActionCreator,
			data,
			onClick,
			onClickActionCreator,
		};
		const wrapper = shallow(<TreeView.WrappedComponent {...props} />, { context });
		wrapper.simulate('click', data.get(0).toJS());
		expect(setState).toHaveBeenCalled();
		expect(prevState.state).not.toBe(DEFAULT_STATE);
		expect(prevState.state.get('opened').toJS()).toEqual([1]);
		expect(onClick).toHaveBeenCalledWith(data.get(0).toJS());
		expect(dispatchActionCreator).toHaveBeenCalled();
		expect(dispatchActionCreator.mock.calls[0][0]).toBe(onClickActionCreator);
		expect(dispatchActionCreator.mock.calls[0][1].props).toMatchObject(props);
		expect(dispatchActionCreator.mock.calls[0][2]).toEqual(data.get(0).toJS());
	});
	it('should close if re onClick', () => {
		const prevState = {
			state: DEFAULT_STATE,
		};
		const setState = jest.fn(fn => {
			prevState.state = fn(prevState);
		});
		const props = { setState, data };
		const wrapper = shallow(<TreeView.WrappedComponent {...props} />, { context });
		wrapper.simulate('click', data.get(0).toJS());
		expect(setState).toHaveBeenCalled();
		expect(prevState.state).not.toBe(DEFAULT_STATE);
		expect(prevState.state.get('opened').toJS()).toEqual([1]);
		wrapper.simulate('click', data.get(0).toJS());
		expect(setState.mock.calls.length).toBe(2);
		expect(prevState.state.get('opened').toJS()).toEqual([]);
	});

	it('should setState onSelect', () => {
		const prevState = {
			state: DEFAULT_STATE,
		};
		const setState = jest.fn(fn => {
			prevState.state = fn(prevState);
		});
		const dispatchActionCreator = jest.fn();
		const onSelect = jest.fn();
		const onSelectActionCreator = 'my:action';
		const props = {
			setState,
			dispatchActionCreator,
			data,
			onSelect,
			onSelectActionCreator,
		};
		const wrapper = shallow(<TreeView.WrappedComponent {...props} />, { context });
		wrapper.simulate('select', data.get(0).toJS());
		expect(setState).toHaveBeenCalled();
		expect(prevState.state).not.toBe(DEFAULT_STATE);
		expect(prevState.state.get('selectedId')).toEqual(1);
		expect(onSelect).toHaveBeenCalledWith(data.get(0).toJS());
		expect(dispatchActionCreator).toHaveBeenCalled();
		expect(dispatchActionCreator.mock.calls[0][0]).toBe(onSelectActionCreator);
		expect(dispatchActionCreator.mock.calls[0][1].props).toMatchObject(props);
		expect(dispatchActionCreator.mock.calls[0][2]).toEqual(data.get(0).toJS());
	});
	it('should unselect onSelect twice', () => {
		const prevState = {
			state: DEFAULT_STATE,
		};
		const setState = jest.fn(fn => {
			prevState.state = fn(prevState);
		});
		const onSelect = jest.fn();
		const props = { setState, data, onSelect };
		const wrapper = shallow(<TreeView.WrappedComponent {...props} />, { context });
		wrapper.simulate('select', data.get(0).toJS());
		expect(setState).toHaveBeenCalled();
		expect(prevState.state).not.toBe(DEFAULT_STATE);
		expect(prevState.state.get('selectedId')).toEqual(1);
		expect(onSelect).toHaveBeenCalledWith(data.get(0).toJS());
		wrapper.simulate('select', data.get(0).toJS());
		expect(prevState.state.get('selectedId')).toBe();
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
