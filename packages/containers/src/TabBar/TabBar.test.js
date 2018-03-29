import React from 'react';
import { shallow, mount } from 'enzyme';
import { Map } from 'immutable';
import Container, { DEFAULT_STATE, DISPLAY_NAME } from './TabBar.container';
import Connected from './TabBar.connect';
import { getComponentState, getSelectedKey } from './TabBar.selectors';

describe('TabBar connected', () => {
	it('should connect TabBar', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${Container.displayName}))`);
		expect(Connected.WrappedComponent).toBe(Container);
	});
});

describe('TabBar Container', () => {
	it('should render', () => {
		const props = {
			items: [
				{ id: 'hello', label: 'Hello', key: 'awesomeKey' },
				{ id: 'world', label: 'WorLd', key: 'specialKey' },
			],
			selectedKey: 'hello',
		};
		const wrapper = shallow(<Container {...props} />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should setState when switch tab', () => {
		let state;
		const props = {
			items: [
				{ id: 'some', label: 'someTab', key: 'someTab' },
				{ id: 'someother', label: 'someOtherTab', key: 'someOtherTab' },
			],
			state: Map({ selectedKey: 'someTab' }),
			setState: jest.fn(fn => (state = fn())),
		};

		const wrapper = mount(<Container {...props} />);
		wrapper
			.find('button')
			.at(1)
			.simulate('click');

		expect(props.setState).toHaveBeenCalled();
		expect(state.selectedKey).toEqual('someOtherTab');
	});
});

describe('TabBar selectors', () => {
	let mockState;
	const componentState = Map({ selectedKey: 'hello' });
	beforeEach(() => {
		mockState = {
			cmf: { components: Map({ [DISPLAY_NAME]: Map({ thisTabBar: componentState }) }) },
		};
	});

	it('should return the state', () => {
		expect(getComponentState(mockState, 'thisTabBar')).toEqual(componentState);
	});
	it('should return the default state', () => {
		expect(getComponentState(mockState, 'idNotExist')).toEqual(DEFAULT_STATE);
	});
	it('should return selectedKey', () => {
		expect(getSelectedKey(mockState, 'thisTabBar')).toEqual('hello');
	});
	it('should return default value if pass wrong componentId', () => {
		expect(getSelectedKey(mockState, 'idNotExist')).toBe(undefined);
	});
});
