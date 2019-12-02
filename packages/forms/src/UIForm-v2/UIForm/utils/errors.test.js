import { removeError, addError, getError } from './errors';

describe('Errors utils', () => {
	describe('#removeError', () => {
		it('should remove error based on schema key', () => {
			// given
			const schema = { key: ['hakuna', 'matata'] };
			const errors = {
				other: 'this stays',
				[schema.key]: 'error message',
			};

			// when
			const newErrors = removeError(errors, schema);

			// then
			expect(newErrors).toEqual({ other: 'this stays' });
		});
	});

	describe('#addError', () => {
		it('should add error based on schema key', () => {
			// given
			const schema = { key: ['hakuna', 'matata'] };
			const errors = { other: 'this stays' };

			// when
			const newErrors = addError(errors, schema, 'error message');

			// then
			expect(newErrors).toEqual({
				other: 'this stays',
				[schema.key]: 'error message',
			});
		});
	});

	describe('#getError', () => {
		it('should add error based on schema key', () => {
			// given
			const schema = { key: ['hakuna', 'matata'] };
			const errors = { [schema.key]: 'this is it' };

			// when
			const errorMessage = getError(errors, schema);

			// then
			expect(errorMessage).toEqual('this is it');
		});
	});
});
