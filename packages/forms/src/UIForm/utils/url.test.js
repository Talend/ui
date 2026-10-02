import { isSafeUrl } from './url';

describe('isSafeUrl', () => {
	it.each(['http://a.b', 'https://a.b/c?d=1', '/relative/path', 'page.html', ' https://a.b '])(
		'should accept %s',
		url => {
			expect(isSafeUrl(url)).toBe(true);
		},
	);

	it.each([
		'javascript:alert(1)',
		' JavaScript:alert(1)',
		'java\tscript:alert(1)',
		'data:text/html,foo',
		'vbscript:foo',
		undefined,
		null,
		42,
		{},
	])('should reject %s', url => {
		expect(isSafeUrl(url)).toBe(false);
	});
});
