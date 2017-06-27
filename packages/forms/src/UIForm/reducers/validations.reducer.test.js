import validationsReducer from './validations.reducer';
import {
	TF_SET_ALL_ERRORS,
	TF_SET_PARTIAL_ERROR,
} from '../actions';

const oldState = {
	field: 'oldError',
};

describe('Validations reducers', () => {
	describe('#TF_SET_ALL_ERRORS', () => {
		it('should replace all errors', () => {
			// given
			const action = {
				type: TF_SET_ALL_ERRORS,
				errors: {
					field1: 'new error 1',
					field2: 'new error 2',
				},
			};

			// when
			const state = validationsReducer(oldState, action);

			// then
			expect(state).toMatchSnapshot();
		});
	});

	describe('#TF_SET_PARTIAL_ERROR', () => {
		it('should set errors', () => {
			// given
			const action = {
				type: TF_SET_PARTIAL_ERROR,
				errors: {
					field1: 'new error 1',
					field2: 'new error 2',
				},
			};

			// when
			const state = validationsReducer(oldState, action);

			// then
			expect(state).toMatchSnapshot();
		});
	});
});
