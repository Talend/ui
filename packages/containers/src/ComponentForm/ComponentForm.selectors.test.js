import Immutable from 'immutable';
import { getComponentFormState } from './ComponentForm.selectors';
import { TCompForm } from './ComponentForm.component';

describe('ComponentForm selectors', () => {
	describe('getComponentFormState', () => {
		it('should return an empty map if there is not the componentid in the store', () => {
			// given
			const state = {
				cmf: {
					components: Immutable.fromJS({
						[TCompForm.displayName]: {
							notTheGoodOne: { lotOfStuff: 'lot' },
						},
					}),
				},
			};
			// when
			const result = getComponentFormState(state, 'aGoodOne');
			// then
			expect(result).toEqual(Immutable.Map());
		});

		it('should return an empty map if there is no component form in the store', () => {
			// given
			const state = {
				cmf: {
					components: Immutable.fromJS({
						notTheGoodOne: { lotOfStuff: 'lot' },
					}),
				},
			};
			// when
			const result = getComponentFormState(state, 'aGoodOne');
			// then
			expect(result).toEqual(Immutable.Map());
		});

		it('should return the state if there is the good component form in the store', () => {
			// given
			const state = {
				cmf: {
					components: Immutable.fromJS({
						[TCompForm.displayName]: {
							aGoodOne: { lotOfStuff: 'lot' },
						},
					}),
				},
			};
			// when
			const result = getComponentFormState(state, 'aGoodOne');
			// then
			expect(result).toEqual(Immutable.Map({ lotOfStuff: 'lot' }));
		});
	});
});
