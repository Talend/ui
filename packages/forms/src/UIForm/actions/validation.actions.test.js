import {
	setError,
	setErrors,
} from './validation.actions';

const formName = 'formName';
const error = 'error';
const errors = ['errors'];

describe('Validation actions', () => {
	describe('#validate action', () => {
		it('should create the action payload', () => {
			// when
			const resultAction = setError(formName, error);

			// then
			expect(resultAction).toMatchSnapshot();
		});
	});

	describe('#validateAll action', () => {
		it('should create the action payload', () => {
			// when
			const resultAction = setErrors(formName, errors);

			// then
			expect(resultAction).toMatchSnapshot();
		});
	});
});
