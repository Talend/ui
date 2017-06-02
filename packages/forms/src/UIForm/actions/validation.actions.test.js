import { TF_SET_ALL_ERRORS, TF_SET_PARTIAL_ERROR } from './constants';
import {
	setError,
	setErrors,
} from './validation.actions';

const formName = 'formName';
const error = 'error';
const errors = ['errors'];

describe('Validation actions', () => {
	describe('#validate action', () => {
		it('should test the action', () => {
			// given

			// when
			const resultAction = setError(formName, error);

			// then
			expect(resultAction).toEqual(
				{
					type: TF_SET_PARTIAL_ERROR,
					errors: 'error',
					formName: 'formName',
				}
			);
		});
	});

	describe('#validateAll action', () => {
		it('should test the action', () => {
			// given

			// when
			const resultAction = setErrors(formName, errors);

			// then
			expect(resultAction).toEqual(
				{
					type: TF_SET_ALL_ERRORS,
					errors: ['errors'],
					formName: 'formName',
				}
			);
		});
	});
});
