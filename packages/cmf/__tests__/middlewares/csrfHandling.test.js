import { mergeCSRFToken } from '../../src/middlewares/http/csrfHandling';

describe('csrf token injection', () => {
	beforeEach(() => {
		delete document.cookie;
	});

	it('inject a HTTP_X_CSRFTOKEN headers if a csrf token is availble on a cookie', () => {
		// given
		const CSRFToken = 'hNjmdpuRgQClwZnb2c59F9gZhCi8jv9x';
		document.cookie = `csrfToken=${CSRFToken}; dwf_section_edit=True;`;

		// when
		const httpConfiguration = mergeCSRFToken(
			{},
			{
				headers: { stuff: 'stuff' },
			},
		);
		// then
		expect(httpConfiguration).toEqual({
			headers: { 'X-CSRF-Token': CSRFToken, stuff: 'stuff' },
		});
	});

	it('do not touch headers if no csrf token is available on a cookie', () => {
		// given nothing
		// when
		const httpConfiguration = mergeCSRFToken(
			{},
			{
				headers: { stuff: 'stuff' },
			},
		);
		// then
		expect(httpConfiguration).toEqual({ headers: { stuff: 'stuff' } });
	});
});
