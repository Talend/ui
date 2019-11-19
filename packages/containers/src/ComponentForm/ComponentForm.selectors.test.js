import Immutable from 'immutable';
import { isComponentFormDirty } from './ComponentForm.selectors';
import { TCompForm } from './ComponentForm.component';

describe('ComponentForm selectors', () => {
	const componentName = 'comp';
	describe('isComponentFormDirty', () => {
		it('should return false if there is no dirty state', () => {
			// given
			const state = {
				cmf: {
					components: Immutable.fromJS({
						[TCompForm.displayName]: {
							[componentName]: {},
						},
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
					components: Immutable.fromJS({
						[TCompForm.displayName]: {
							[componentName]: { dirty: false },
						},
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
					components: Immutable.fromJS({
						[TCompForm.displayName]: {
							[componentName]: { dirty: true },
						},
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
