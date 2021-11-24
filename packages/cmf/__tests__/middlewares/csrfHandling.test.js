import { mergeCSRFToken } from '../../src/middlewares/http/csrfHandling';

describe('csrf token injection', () => {
	it('inject a X-CSRF-Token headers if a csrf token is availble on a cookie', () => {
		// given
		const CSRFToken = 'csrfHandling';
		document.cookie = `csrfToken=${CSRFToken}; dwf_section_edit=True;`;

		// when
		const httpConfiguration = mergeCSRFToken({})({
			headers: { stuff: 'stuff' },
		});
		document.cookie = `csrfToken=${CSRFToken}; dwf_section_edit=True; Max-Age=0`;
		// then
		expect(httpConfiguration).toEqual({
			headers: { 'X-CSRF-Token': CSRFToken, stuff: 'stuff' },
		});
	});

	it('do not touch headers if no csrf token is available on a cookie', () => {
		// given nothing
		// when
		const httpConfiguration = mergeCSRFToken({})({
			headers: { stuff: 'stuff' },
		});
		// then
		expect(httpConfiguration).toEqual({ headers: { stuff: 'stuff' } });
	});
});
