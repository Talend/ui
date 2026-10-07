import { create } from './history';

describe('history.create', () => {
	beforeEach(() => {
		window.history.replaceState({}, '', '/');
	});

	it('should throw without options (options are destructured)', () => {
		expect(() => create()).toThrow(/undefined/);
	});

	it('should return a history v5 object', () => {
		const history = create({});
		expect(typeof history.listen).toBe('function');
		expect(typeof history.push).toBe('function');
		expect(typeof history.replace).toBe('function');
		expect(history.location.pathname).toBe('/');
		expect(history.action).toBe('POP');
	});

	describe('without basename', () => {
		it('push should keep the location unchanged', () => {
			const history = create({});
			history.push('/foo?a=1#hash');
			expect(history.location).toMatchObject({ pathname: '/foo', search: '?a=1', hash: '#hash' });
			expect(window.location.pathname).toBe('/foo');
			expect(history.action).toBe('PUSH');
		});

		it('replace should keep the location unchanged', () => {
			const history = create({});
			history.replace({ pathname: '/bar' });
			expect(history.location.pathname).toBe('/bar');
			expect(history.action).toBe('REPLACE');
		});
	});

	describe('with basename', () => {
		it.each([
			['/app', '/foo'],
			['/app/', '/foo'],
			['/app', 'foo'],
			['/app/', 'foo'],
		])('push should prepend basename %s to %s', (basename, path) => {
			const history = create({ basename });
			history.push(path);
			expect(history.location.pathname).toBe('/app/foo');
			expect(window.location.pathname).toBe('/app/foo');
		});

		it('push should preserve search and hash of a string location', () => {
			const history = create({ basename: '/app' });
			history.push('/foo?a=1#h');
			expect(history.location).toMatchObject({
				pathname: '/app/foo',
				search: '?a=1',
				hash: '#h',
			});
		});

		it('replace should prepend basename to an object location and keep other keys', () => {
			const history = create({ basename: '/app' });
			history.replace({ pathname: '/foo', search: '?b=2' });
			expect(history.location).toMatchObject({ pathname: '/app/foo', search: '?b=2' });
			expect(history.action).toBe('REPLACE');
		});

		it('push should forward the second state argument', () => {
			const history = create({ basename: '/app' });
			history.push('/foo', { x: 1 });
			expect(history.location.state).toEqual({ x: 1 });
		});

		it('should notify listeners with the prefixed location', () => {
			const history = create({ basename: '/app' });
			const listener = vi.fn();
			history.listen(listener);
			history.push('/foo');
			expect(listener).toHaveBeenCalledTimes(1);
			expect(listener.mock.calls[0][0]).toMatchObject({
				action: 'PUSH',
				location: { pathname: '/app/foo' },
			});
		});
	});

	describe('route validation', () => {
		it.each(['javascript:alert(1)', 'https://evil.example', '//evil.example'])(
			'should refuse to push/replace %s',
			target => {
				const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
				const history = create({});
				const pushState = vi.spyOn(window.history, 'pushState');
				const replaceState = vi.spyOn(window.history, 'replaceState');
				history.push(target);
				history.replace(target);
				expect(pushState).not.toHaveBeenCalled();
				expect(replaceState).not.toHaveBeenCalled();
				pushState.mockRestore();
				replaceState.mockRestore();
				errorSpy.mockRestore();
			},
		);

		it('should still push in-app paths, with basename', () => {
			const history = create({ basename: '/app' });
			history.push('/foo');
			expect(history.location.pathname).toBe('/app/foo');
		});
	});
});
