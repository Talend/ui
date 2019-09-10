import { testHTTPCode } from '../../src/middlewares/http/constants';

describe('testHTTPCode', () => {
	it('information', () => {
		// given
		const minCode = 100;
		const maxCode = 102;
		// then
		expect(testHTTPCode.isInformational(minCode)).toBe(true);
		expect(testHTTPCode.isInformational(maxCode)).toBe(true);
		expect(testHTTPCode.isSuccess(minCode)).toBe(false);
		expect(testHTTPCode.isSuccess(maxCode)).toBe(false);
		expect(testHTTPCode.isRedirection(minCode)).toBe(false);
		expect(testHTTPCode.isRedirection(maxCode)).toBe(false);
		expect(testHTTPCode.isClientError(minCode)).toBe(false);
		expect(testHTTPCode.isClientError(maxCode)).toBe(false);
		expect(testHTTPCode.isServerError(minCode)).toBe(false);
		expect(testHTTPCode.isServerError(maxCode)).toBe(false);
	});

	it('success', () => {
		// given
		const minCode = 200;
		const maxCode = 226;
		// then
		expect(testHTTPCode.isInformational(minCode)).toBe(false);
		expect(testHTTPCode.isInformational(maxCode)).toBe(false);
		expect(testHTTPCode.isSuccess(minCode)).toBe(true);
		expect(testHTTPCode.isSuccess(maxCode)).toBe(true);
		expect(testHTTPCode.isRedirection(minCode)).toBe(false);
		expect(testHTTPCode.isRedirection(maxCode)).toBe(false);
		expect(testHTTPCode.isClientError(minCode)).toBe(false);
		expect(testHTTPCode.isClientError(maxCode)).toBe(false);
		expect(testHTTPCode.isServerError(minCode)).toBe(false);
		expect(testHTTPCode.isServerError(maxCode)).toBe(false);
	});

	it('redirection', () => {
		// given
		const minCode = 300;
		const maxCode = 308;
		// then
		expect(testHTTPCode.isInformational(minCode)).toBe(false);
		expect(testHTTPCode.isInformational(maxCode)).toBe(false);
		expect(testHTTPCode.isSuccess(minCode)).toBe(false);
		expect(testHTTPCode.isSuccess(maxCode)).toBe(false);
		expect(testHTTPCode.isRedirection(minCode)).toBe(true);
		expect(testHTTPCode.isRedirection(maxCode)).toBe(true);
		expect(testHTTPCode.isClientError(minCode)).toBe(false);
		expect(testHTTPCode.isClientError(maxCode)).toBe(false);
		expect(testHTTPCode.isServerError(minCode)).toBe(false);
		expect(testHTTPCode.isServerError(maxCode)).toBe(false);
	});

	it('client errors', () => {
		// given
		const minCode = 400;
		const maxCode = 451;
		// then
		expect(testHTTPCode.isInformational(minCode)).toBe(false);
		expect(testHTTPCode.isInformational(maxCode)).toBe(false);
		expect(testHTTPCode.isSuccess(minCode)).toBe(false);
		expect(testHTTPCode.isSuccess(maxCode)).toBe(false);
		expect(testHTTPCode.isRedirection(minCode)).toBe(false);
		expect(testHTTPCode.isRedirection(maxCode)).toBe(false);
		expect(testHTTPCode.isClientError(minCode)).toBe(true);
		expect(testHTTPCode.isClientError(maxCode)).toBe(true);
		expect(testHTTPCode.isServerError(minCode)).toBe(false);
		expect(testHTTPCode.isServerError(maxCode)).toBe(false);
	});

	it('server errors', () => {
		// given
		const minCode = 500;
		const maxCode = 511;
		// then
		expect(testHTTPCode.isInformational(minCode)).toBe(false);
		expect(testHTTPCode.isInformational(maxCode)).toBe(false);
		expect(testHTTPCode.isSuccess(minCode)).toBe(false);
		expect(testHTTPCode.isSuccess(maxCode)).toBe(false);
		expect(testHTTPCode.isRedirection(minCode)).toBe(false);
		expect(testHTTPCode.isRedirection(maxCode)).toBe(false);
		expect(testHTTPCode.isClientError(minCode)).toBe(false);
		expect(testHTTPCode.isClientError(maxCode)).toBe(false);
		expect(testHTTPCode.isServerError(minCode)).toBe(true);
		expect(testHTTPCode.isServerError(maxCode)).toBe(true);
	});
});
