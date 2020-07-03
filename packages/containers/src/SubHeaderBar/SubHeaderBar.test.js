import React from 'react';
import { shallow } from 'enzyme';
import { Map } from 'immutable';
import Container, { DEFAULT_STATE, DISPLAY_NAME } from './SubHeaderBar.container';
import Connect from './SubHeaderBar.connect';
import { getComponentState } from './SubHeaderBar.selectors';

describe('Connect', () => {
	it('should connect SubHeaderBar', () => {
		expect(Connect.displayName).toBe(`Connect(CMF(${Container.displayName}))`);
		expect(Connect.WrappedComponent).toBe(Container);
	});
});

describe('SubHeaderBar container', () => {
	it('should render', () => {
		const wrapper = shallow(<Container onGoBack={jest.fn()} />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should call onGoBack event when goBack event trigger', () => {
		// Given
		const event = {};
		const props = {
			onGoBack: jest.fn(),
		};
		// When
		shallow(<Container {...props} />).simulate('goBack', event);
		// Then
		expect(props.onGoBack).toHaveBeenCalledWith(event);
	});
	it('should call actionCreatorGoBack event when goBack event trigger', () => {
		// Given
		const event = {};
		const props = {
			actionCreatorGoBack: 'myGoBackActionCreator',
			dispatchActionCreator: jest.fn(),
		};
		// When
		shallow(<Container {...props} />).simulate('goBack', event);
		// Then
		expect(props.dispatchActionCreator).toHaveBeenCalledWith(props.actionCreatorGoBack, event, {
			props,
		});
	});
});

describe('SubHeaderBar selectors', () => {
	let mockState;
	const componentState = Map({});
	beforeEach(() => {
		mockState = {
			cmf: {
				components: Map({ [DISPLAY_NAME]: Map({ mySubHeaderBar: componentState }) }),
			},
		};
	});
	it('should return the state', () => {
		expect(getComponentState(mockState, 'mySubHeaderBar')).toEqual(componentState);
	});
	it('should return the default state', () => {
		expect(getComponentState(mockState, 'wrongComponentId')).toEqual(DEFAULT_STATE);
	});
});
