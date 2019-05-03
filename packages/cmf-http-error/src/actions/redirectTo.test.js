import { mapStatusCodeToPage, redirectToStatusCodePage } from './redirectTo';

describe('handle error pages', () => {
	it('should return /403 page when code is 403', () => {
		const errorCode = 403;
		expect(mapStatusCodeToPage(errorCode)).toBe(`/${errorCode}`);
	});
	it('should return /404 page when code is 404', () => {
		const errorCode = 404;
		expect(mapStatusCodeToPage(errorCode)).toBe(`/${errorCode}`);
	});
	it('should return /500 page when code is 500', () => {
		const errorCode = 500;
		expect(mapStatusCodeToPage(errorCode)).toBe(`/${errorCode}`);
	});
	it('should return /500 page when code is neither 403, 404 or 500', () => {
		expect(mapStatusCodeToPage(472)).toBe('/500');
	});
	it('should return /404 push action', () => {
		expect(redirectToStatusCodePage(404)).toEqual({
			type: '@@router/CALL_HISTORY_METHOD',
			payload: {
				method: 'push',
				args: ['/404'],
			},
		});
	});
});
