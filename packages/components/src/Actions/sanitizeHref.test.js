import sanitizeHref from './sanitizeHref';

describe('sanitizeHref', () => {
	it('should keep http(s), relative and hash hrefs', () => {
		['https://example.com', 'http://example.com', '/path', 'path?x=1', '#anchor'].forEach(href => {
			expect(sanitizeHref({ href, label: 'a' })).toEqual({ href, label: 'a' });
		});
	});

	it('should drop non http(s) hrefs', () => {
		[
			'javascript:alert(1)',
			' JaVaScRiPt:alert(1)',
			'java\tscript:alert(1)',
			'data:text/html,x',
			'vbscript:x',
			null,
			42,
		].forEach(href => {
			expect(sanitizeHref({ href, label: 'a' })).toEqual({ label: 'a' });
		});
	});

	it('should return props untouched when there is no href', () => {
		const props = { label: 'a' };
		expect(sanitizeHref(props)).toBe(props);
	});
});
