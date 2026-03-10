/* eslint-disable testing-library/no-container */
import { render } from '@testing-library/react';
import Container, { DISPLAY_NAME } from './Slider.container';

/** Plain-object shim implementing .get(key, def) for component state. */
const makeCompState = (data = {}) => ({ ...data, get: (k, def) => (k in data ? data[k] : def) });
/** Plain-object shim implementing .getIn([outer, inner], def) for state.cmf.components. */
const makeComponents = (data = {}) => ({
	getIn([outer, inner], def) {
		const outerVal = data[outer];
		if (outerVal == null) return def;
		const innerVal = outerVal[inner];
		return innerVal !== undefined ? innerVal : def;
	},
});
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
		const initialState = { value: 15 };
		const { container } = render(<Container props={props} initialState={initialState} />);
		expect(container.firstChild).toMatchSnapshot();
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
		const componentState = makeCompState({ value: '12' });
		const state = {
			cmf: {
				components: makeComponents({ [DISPLAY_NAME]: { mySliderComponent: componentState } }),
			},
		};
		expect(getComponentState(state, 'mySliderComponent')).toEqual(componentState);
	});

	it('should return the value', () => {
		const componentState = makeCompState({ value: 12 });
		const state = {
			cmf: {
				components: makeComponents({ [DISPLAY_NAME]: { mySliderComponent: componentState } }),
			},
		};
		expect(getValue(state, 'mySliderComponent')).toEqual(12);
	});
});
