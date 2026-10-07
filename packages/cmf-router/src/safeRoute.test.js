import { isSafeRoute } from './safeRoute';

describe('isSafeRoute', () => {
	it('should accept a safe in-app string path', () => {
		expect(isSafeRoute('/app/home')).toBe(true);
	});

	it('should reject a scheme-based string path', () => {
		expect(isSafeRoute('javascript:alert(1)')).toBe(false);
	});

	it('should reject a protocol-relative string path', () => {
		expect(isSafeRoute('//evil.com')).toBe(false);
	});

	it('should accept a location object without a pathname', () => {
		expect(isSafeRoute({ search: '?a=1' })).toBe(true);
	});

	it('should accept a location object with a safe string pathname', () => {
		expect(isSafeRoute({ pathname: '/app/home' })).toBe(true);
	});

	it('should reject a location object with an unsafe string pathname', () => {
		expect(isSafeRoute({ pathname: 'javascript:alert(1)' })).toBe(false);
	});

	it('should reject a location object with a non-string pathname (e.g. array) that history could coerce into an unsafe URL', () => {
		expect(isSafeRoute({ pathname: ['javascript:alert(1)'] })).toBe(false);
	});

	it('should reject a location object with a non-string, non-array pathname', () => {
		expect(isSafeRoute({ pathname: 42 })).toBe(false);
	});

	it('should reject non-string, non-object routes', () => {
		expect(isSafeRoute(null)).toBe(false);
		expect(isSafeRoute(undefined)).toBe(false);
	});

	it('should accept an in-app path with an interior space', () => {
		expect(isSafeRoute('/ /reports')).toBe(true);
	});

	it('should accept a path with an interior space before a colon', () => {
		expect(isSafeRoute('foo bar:baz')).toBe(true);
	});

	it('should still trim leading/trailing C0 controls and spaces before checking', () => {
		expect(isSafeRoute('  //evil.com')).toBe(false);
		expect(isSafeRoute('\u0000javascript:alert(1)')).toBe(false);
	});

	it('should still strip tabs/newlines anywhere before checking', () => {
		expect(isSafeRoute('/\t/\n/evil.com')).toBe(false);
		expect(isSafeRoute('java\tscript:alert(1)')).toBe(false);
	});
});
