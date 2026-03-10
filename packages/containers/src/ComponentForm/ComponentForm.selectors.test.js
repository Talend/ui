import { isComponentFormDirty } from './ComponentForm.selectors';
import { TCompForm } from './ComponentForm.component';

/** Plain-object shim implementing .get(key, def) for component state. */
const makeCompState = (data = {}) => ({ get: (k, def) => (k in data ? data[k] : def) });
/** Plain-object shim implementing .getIn([outer, inner], def) for state.cmf.components. */
const makeComponents = (data = {}) => ({
	getIn([outer, inner], def) {
		const outerVal = data[outer];
		if (outerVal == null) return def;
		const innerVal = outerVal[inner];
		return innerVal !== undefined ? innerVal : def;
	},
});

describe('ComponentForm selectors', () => {
	const componentName = 'comp';
	describe('isComponentFormDirty', () => {
		it('should return false if there is no dirty state', () => {
			// given
			const state = {
				cmf: {
					components: makeComponents({
						[TCompForm.displayName]: { [componentName]: makeCompState({}) },
					}),
				},
			};
			// when
			const result = isComponentFormDirty(state, componentName);
			// then
			expect(result).toBeFalsy();
		});

		it('should return false if there is dirty state to false', () => {
			// given
			const state = {
				cmf: {
					components: makeComponents({
						[TCompForm.displayName]: { [componentName]: makeCompState({ dirty: false }) },
					}),
				},
			};
			// when
			const result = isComponentFormDirty(state, componentName);
			// then
			expect(result).toBeFalsy();
		});

		it('should return true if there is dirty state to true', () => {
			// given
			const state = {
				cmf: {
					components: makeComponents({
						[TCompForm.displayName]: { [componentName]: makeCompState({ dirty: true }) },
					}),
				},
			};
			// when
			const result = isComponentFormDirty(state, componentName);
			// then
			expect(result).toBeTruthy();
		});
	});
});
