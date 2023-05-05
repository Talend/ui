import { HTTP_STATUS, isHTTPStatus, testHTTPCode } from './http.constants';

describe('Http constants', () => {
	it('isInformational should return true', () => {
		expect(testHTTPCode.isInformational(HTTP_STATUS.PROCESSING)).toBe(true);
		expect(testHTTPCode.isInformational(HTTP_STATUS.CONTINUE)).toBe(true);
	});

	it('isInformational should return false', () => {
		expect(testHTTPCode.isInformational(HTTP_STATUS.OK)).toBe(false);
		expect(testHTTPCode.isInformational(HTTP_STATUS.NOT_FOUND)).toBe(false);
	});

	it('isRedirection should return true', () => {
		expect(testHTTPCode.isRedirection(HTTP_STATUS.PERMANENT_REDIRECT)).toBe(true);
		expect(testHTTPCode.isRedirection(HTTP_STATUS.MULTIPLE_CHOICES)).toBe(true);
	});

	it('isRedirection should return false', () => {
		expect(testHTTPCode.isRedirection(HTTP_STATUS.IM_USED)).toBe(false);
		expect(testHTTPCode.isRedirection(HTTP_STATUS.NOT_FOUND)).toBe(false);
	});

	it('isClientError should return true', () => {
		expect(testHTTPCode.isClientError(HTTP_STATUS.BAD_REQUEST)).toBe(true);
		expect(testHTTPCode.isClientError(HTTP_STATUS.UNAVAILABLE_FOR_LEGAL_REASONS)).toBe(true);
	});

	it('isClientError should return false', () => {
		expect(testHTTPCode.isClientError(HTTP_STATUS.USE_PROXY)).toBe(false);
		expect(testHTTPCode.isClientError(HTTP_STATUS.NOT_IMPLEMENTED)).toBe(false);
	});

	it('isServerError should return true', () => {
		expect(testHTTPCode.isServerError(HTTP_STATUS.NOT_IMPLEMENTED)).toBe(true);
	});

	it('isServerError should return false', () => {
		expect(testHTTPCode.isServerError(HTTP_STATUS.UNAVAILABLE_FOR_LEGAL_REASONS)).toBe(false);
	});

	it('isHTTPStatus should return 0 for unknown http code', () => {
		expect(isHTTPStatus(666)).toBe(0);
	});
});
