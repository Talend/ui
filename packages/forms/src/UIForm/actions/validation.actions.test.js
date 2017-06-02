import { TF_VALIDATE_ALL, TF_VALIDATE_PARTIAL } from './constants';
import {
	validate,
	validateAll,
} from './validation.actions';

const formName = 'formName';
const error = 'error';
const errors = ['errors'];

describe('Validation actions', () => {
	describe('#validate action', () => {
		it('should test the action', () => {
			// given

			// when
			const resultAction = validate(formName, error);

			// then
			expect(resultAction).toEqual(
				{
					type: TF_VALIDATE_PARTIAL,
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
			const resultAction = validateAll(formName, errors);

			// then
			expect(resultAction).toEqual(
				{
					type: TF_VALIDATE_ALL,
					errors: ['errors'],
					formName: 'formName',
				}
			);
		});
	});
});
