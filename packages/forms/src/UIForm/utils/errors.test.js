import {
	removeError,
	addError,
	getError,
	reconciliateAllErrors,
	reconciliateSingleErrors,
} from './errors';

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

		it("should not change errors ref if values don't change", () => {
			// given
			const schema = { key: ['not', 'in', 'error'] };
			const errors = {
				other: 'this stays',
			};

			// when
			const newErrors = removeError(errors, schema);

			// then
			expect(newErrors).toBe(errors);
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

		it('should add error based on schema key', () => {
			// given
			const schema = { key: ['hakuna', 'matata'] };
			const errors = {
				other: 'this stays',
				[schema.key]: 'error message',
			};

			// when
			const newErrors = addError(errors, schema, 'error message');

			// then
			expect(newErrors).toBe(errors);
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

	describe('#reconciliateAllErrors', () => {
		it('should report related old errors and add new ones', () => {
			// given
			const oldErrors = { first: 'this is it', second: 'lol', third: 'coucou' };
			const newErrors = {
				second: undefined,
				third: 'new coucou, should be overridden',
				fourth: 'completely new',
			};

			// when
			const errors = reconciliateAllErrors(oldErrors, newErrors);

			// then
			expect(errors).toEqual({
				second: 'lol',
				third: 'coucou',
				fourth: 'completely new',
			});
		});
	});

	describe('#reconciliateSingleErrors', () => {
		it('should report related old errors and add new ones', () => {
			// given
			const oldErrors = { first: 'this is it', second: 'lol', third: 'coucou' };
			const newErrors = {
				second: undefined,
				fourth: 'completely new',
			};

			// when
			const errors = reconciliateSingleErrors(oldErrors, newErrors);

			// then
			expect(errors).toEqual({
				first: 'this is it',
				third: 'coucou',
				fourth: 'completely new',
			});
		});
	});
});
