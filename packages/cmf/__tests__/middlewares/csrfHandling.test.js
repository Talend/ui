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

describe('csrf token destination check', () => {
	const CSRFToken = 'csrfHandling';
	const origin = window.location.origin;

	beforeEach(() => {
		document.cookie = `csrfToken=${CSRFToken}; dwf_section_edit=True;`;
	});
	afterEach(() => {
		document.cookie = `csrfToken=${CSRFToken}; dwf_section_edit=True; Max-Age=0`;
	});

	it.each(['/api/foo', 'api/foo', `${origin}/api/foo`])(
		'adds the token for same-origin url %s',
		url => {
			const conf = mergeCSRFToken({}, url)({ headers: {} });
			expect(conf.headers['X-CSRF-Token']).toBe(CSRFToken);
		},
	);

	it.each(['https://evil.example/x', '//evil.example/x', 'http://localhost:1/x'])(
		'does not add the token for cross-origin url %s',
		url => {
			const conf = mergeCSRFToken({}, url)({ headers: {} });
			expect(conf).toEqual({ headers: {} });
		},
	);

	it('does not add the token when the url is invalid', () => {
		expect(mergeCSRFToken({}, 'http://[bad')({ headers: {} })).toEqual({ headers: {} });
	});

	it('adds the token for cross-origin urls listed in CSRFTokenAllowedOrigins', () => {
		const security = { CSRFTokenAllowedOrigins: ['https://api.example.com'] };
		expect(
			mergeCSRFToken({ security }, 'https://api.example.com/v1/x')({ headers: {} }).headers,
		).toHaveProperty('X-CSRF-Token', CSRFToken);
		expect(mergeCSRFToken({ security }, 'https://evil.example/x')({ headers: {} })).toEqual({
			headers: {},
		});
	});
});
