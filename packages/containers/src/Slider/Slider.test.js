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
			shallow(<Container props={props} initialState={initialState} />).getElement(),
		).toMatchSnapshot();
	});

	describe('onAfterChange', () => {
		it('should call onAfterChange props method when onAfterChange', () => {
			const onAfterChange = jest.fn();
			const container = new Container({
				onAfterChange,
			});

			container.onAfterChange(12);
			expect(onAfterChange).toHaveBeenCalled();
		});
	});

	describe('onChange', () => {
		let setState;

		beforeEach(() => {
			setState = jest.fn();
		});

		it('should call onChange props method when onChange', () => {
			const onChange = jest.fn();
			const container = new Container({
				onChange,
				setState,
			});

			container.onChange(12);
			expect(onChange).toHaveBeenCalled();
		});
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
