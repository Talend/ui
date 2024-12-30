import matchPath from '../src/matchPath';

describe('matchPath', () => {
	describe('with path="/"', () => {
		it('returns correct url at "/"', () => {
			const path = '/';
			const pathname = '/';
			const match = matchPath(pathname, path);
			expect(match.url).toBe('/');
			expect(match.isExact).toBe(true);
		});
	});

	describe('with path="/somewhere"', () => {
		it('returns correct url at "/somewhere"', () => {
			const path = '/somewhere';
			const pathname = '/somewhere';
			const match = matchPath(pathname, path);
			expect(match.url).toBe('/somewhere');
			expect(match.isExact).toBe(true);
		});

		it('returns correct url at "/somewhere/else"', () => {
			const path = '/somewhere';
			const pathname = '/somewhere/else';
			const match = matchPath(pathname, path);
			expect(match.url).toBe('/somewhere');
			expect(match.isExact).toBe(false);
		});
	});

	describe('with sensitive path', () => {
		it('returns non-sensitive url', () => {
			const options = {
				path: '/SomeWhere',
			};
			const pathname = '/somewhere';
			const match = matchPath(pathname, options);
			expect(match.url).toBe('/somewhere');
			expect(match.isExact).toBe(true);
		});
	});

	describe('with path="/{*path}"', () => {
		it('returns correct match at root "/"', () => {
			const path = '/{*path}';
			const pathname = '/';
			const match = matchPath(pathname, path);
			expect(match.url).toBe('/');
			expect(match.params).toEqual({});
			expect(match.isExact).toBe(true);
		});

		it('returns correct match and params for child route "/tasks"', () => {
			const path = '/{*path}';
			const pathname = '/tasks';
			const match = matchPath(pathname, path);
			expect(match.url).toBe('/tasks');
			expect(match.params).toEqual({ path: 'tasks' });
			expect(match.isExact).toBe(true);
		});

		it('returns correct match and params for nested route "/tasks/123"', () => {
			const path = '/{*path}';
			const pathname = '/tasks/123';
			const match = matchPath(pathname, path);
			expect(match.url).toBe('/tasks/123');
			expect(match.params).toEqual({ path: 'tasks/123' });
			expect(match.isExact).toBe(true);
		});
	});
	describe('with optinal parameter path="/matchingroute/:resource{/:optional}"', () => {
		it('returns correct match and params for child route "/tasks"', () => {
			const path = '/matchingroute/:resource{/:optional}';
			const pathname = '/matchingroute/tasks/taskId-123';
			const match = matchPath(pathname, path);
			expect(match.url).toBe('/matchingroute/tasks/taskId-123');
			expect(match.params).toEqual({ resource: 'tasks', optional: 'taskId-123' });
			expect(match.isExact).toBe(true);
		});
	});
});
