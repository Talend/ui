import React from 'react';
import { Map } from 'immutable';
import { shallow } from 'enzyme';
import Container, { DISPLAY_NAME } from './Slider.container';
import Connected from './Slider.connect';
import { getComponentState, getValue } from './Slider.selectors';

describe('Filter connected', () => {
	it('should connect filter', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${Container.displayName}))`);
		expect(Connected.WrappedComponent).toBe(Container);
	});
});

describe('Filter container', () => {
	it('should render', () => {
		const props = {
			id: 'filter',
		};
		const initialState = new Map({
			value: 15,
		});
		expect(
			shallow(<Container props={props} initialState={initialState} />).getNode(),
		).toMatchSnapshot();
	});

	it('should call dispatchActionCreator method when onAfterChange', () => {
		const onAfterChangeActionCreator = jest.fn();
		const onAfterChange = jest.fn();
		const dispatchActionCreator = jest.fn();
		const container = new Container({
			onAfterChangeActionCreator,
			onAfterChange,
			dispatchActionCreator,
		});

		container.onAfterChange(12);
		expect(onAfterChange).toHaveBeenCalled();
		expect(dispatchActionCreator).toHaveBeenCalled();
	});

	it('should not call dispatchActionCreator method when no onAfterChange', () => {
		const dispatchActionCreator = jest.fn();
		const container = new Container({ dispatchActionCreator });

		container.onAfterChange(12);
		expect(dispatchActionCreator).not.toHaveBeenCalled();
	});

	it('should call dispatchActionCreator method when onChange', () => {
		const dispatchActionCreator = jest.fn();
		const onChangeActionCreator = jest.fn();
		const onChange = jest.fn();
		const setState = jest.fn();
		const container = new Container({
			onChangeActionCreator,
			onChange,
			setState,
			dispatchActionCreator,
		});

		container.onChange(12);
		expect(dispatchActionCreator).toHaveBeenCalled();
		expect(onChange).toHaveBeenCalled();
		expect(setState).toHaveBeenCalled();
	});
});

describe('Slider Selectors', () => {
	it('should return the slider component state', () => {
		const componentState = Map({
			value: '12',
		});
		const state = {
			cmf: {
				components: Map({ [DISPLAY_NAME]: Map({ mySliderComponent: componentState }) }),
			},
		};
		expect(getComponentState(state, 'mySliderComponent')).toEqual(componentState);
	});

	it('should return the value', () => {
		const componentState = Map({
			value: 12,
		});
		const state = {
			cmf: {
				components: Map({ [DISPLAY_NAME]: Map({ mySliderComponent: componentState }) }),
			},
		};
		expect(getValue(state, 'mySliderComponent')).toEqual(12);
	});
});
