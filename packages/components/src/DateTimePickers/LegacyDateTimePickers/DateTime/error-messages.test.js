import getErrorMessage from './error-messages';

describe('test of the dateTimePickers error messages', () => {
	it('should test the getErrorMessage', () => {
		['', null, undefined, {}, [], 0].forEach(v => expect(getErrorMessage(v)).toBe(''));
		// Test random string
		expect(getErrorMessage('INVALID_HOUR_EMPTY')).toBe('Hour is required');
	});
});
