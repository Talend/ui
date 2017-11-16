import React from 'react';
import { Map } from 'immutable';
import { shallow } from 'enzyme';
import Container, { DEFAULT_STATE, DISPLAY_NAME } from './Filter.container';
import Connected from './Filter.connect';
import { getComponentState, getQuery } from './Filter.selectors';

describe('Filter connected', () => {
	it('should connect filter', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${Container.displayName}))`);
		expect(Connected.WrappedComponent).toBe(Container);
	});
});

describe('Filter container', () => {
	it('should render', () => {
		const props = {
			docked: false,
			navbar: true,
			dockable: true,
			collectionToFilter: 'myCollectionToFilter',
			onFilter: () => jest.fn(),
			t: () => jest.fn(),
		};
		const wrapper = shallow(<Container {...props} />);
		expect(wrapper).toMatchSnapshot();
	});
	it('should call setState when onFilter event trigger', () => {
		const setState = jest.fn();
		const wrapper = shallow(<Container setState={setState} />);
		const event = {};
		const query = 'foo';
		wrapper.simulate('filter', event, query);
		expect(setState).toHaveBeenCalledWith({ query });
	});
	it('should call onFilter when onFilter event trigger', () => {
		const props = {
			onFilter: jest.fn(),
			setState: jest.fn(),
		};
		const event = {};
		const query = 'foo';
		const wrapper = shallow(<Container {...props} />);
		wrapper.simulate('filter', event, query);
		expect(props.onFilter).toHaveBeenCalledWith(event, {
			query,
			props: {
				dockable: true,
				...props,
			},
		});
	});
	it('should call onFilterActionCreator when onFilter event trigger', () => {
		const props = {
			setState: jest.fn(),
			dispatchActionCreator: jest.fn(),
			onFilterActionCreator: jest.fn(),
		};
		const event = {};
		const query = 'foo';
		const wrapper = shallow(<Container {...props} />);
		wrapper.simulate('filter', event, query);
		expect(props.dispatchActionCreator).toHaveBeenCalledWith(props.onFilterActionCreator, event, {
			props: {
				dockable: true,
				...props,
			},
		});
	});
	it('should call onBlur when onBlur event trigger', () => {
		const onBlur = jest.fn();
		const event = {};
		const wrapper = shallow(<Container onBlur={onBlur} />);
		wrapper.simulate('blur', event);
		expect(onBlur).toHaveBeenCalledWith(event);
	});
	it('should call onFocus when onFocus event trigger', () => {
		const onFocus = jest.fn();
		const event = {};
		const wrapper = shallow(<Container onFocus={onFocus} />);
		wrapper.simulate('focus', event);
		expect(onFocus).toHaveBeenCalledWith(event);
	});
	it('should call setState when onToggle event trigger', () => {
		const state = Map({ docked: false });
		const prevState = { state };
		const setState = jest.fn(fn => {
			prevState.state = fn(prevState);
		});
		const props = {
			setState,
			state,
			dockable: true,
		};
		const wrapper = shallow(<Container {...props} />);
		wrapper.simulate('toggle');
		expect(props.setState).toHaveBeenCalled();
		expect(prevState.state).not.toBe(state);
		expect(prevState.state.get('docked')).toBe(true);
	});
	it('should call onToggleActionCreator when onToggle event trigger', () => {
		const props = {
			onToggleActionCreator: jest.fn(),
			dispatchActionCreator: jest.fn(),
			setState: jest.fn(),
			state: Map({ docked: false }),
		};
		const wrapper = shallow(<Container {...props} />);
		wrapper.simulate('toggle');
		expect(props.dispatchActionCreator).toHaveBeenCalledWith(props.onToggleActionCreator);
	});
	it('should call onToggleActionCreator when onToggle event trigger', () => {
		const props = {
			onToggle: jest.fn(),
			setState: jest.fn(),
			state: Map({ docked: false }),
		};
		const event = {};
		const wrapper = shallow(<Container {...props} />);
		wrapper.simulate('toggle', event);
		expect(props.onToggle).toHaveBeenCalledWith(event);
	});
});

describe('Filter Selectors', () => {
	it('should return the filter component state', () => {
		const componentState = Map({
			query: 'Toto was here',
			docked: true,
		});
		const state = {
			cmf: {
				components: Map({ [DISPLAY_NAME]: Map({ myFilterComponent: componentState }) }),
			},
		};
		const ret = getComponentState(state, 'myFilterComponent');
		expect(ret).toEqual(componentState);
	});
	it('should return the default filter component state', () => {
		const state = {
			cmf: {
				components: Map(),
			},
		};
		const ret = getComponentState(state, 'myFilterComponent');
		expect(ret).toEqual(DEFAULT_STATE);
	});
	it('should return the query', () => {
		const componentState = Map({
			query: 'Hello world',
			docked: true,
		});
		const state = {
			cmf: {
				components: Map({ [DISPLAY_NAME]: Map({ myFilterComponent: componentState }) }),
			},
		};
		const ret = getQuery(state, 'myFilterComponent');
		expect(ret).toEqual('Hello world');
	});
});
