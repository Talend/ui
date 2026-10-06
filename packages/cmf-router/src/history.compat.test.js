import { create } from './history';

// react-router v7 embeds a history that accepts one listener and has no back/forward:
// history.js restores the history v5 API the cmf integration relies on.
describe('history.create compat with history v5 API', () => {
	beforeEach(() => {
		window.history.replaceState({}, '', '/');
	});

	it('should keep the state of a location object like history v5 did', () => {
		const history = create({});
		history.push({ pathname: '/one', state: { a: 1 } });
		expect(history.location.state).toEqual({ a: 1 });
		history.replace({ pathname: '/two', state: { b: 2 } });
		expect(history.location.state).toEqual({ b: 2 });
		history.push({ pathname: '/three', state: { c: 3 } }, { d: 4 });
		expect(history.location.state).toEqual({ d: 4 });
	});

	it('should support several listeners and unlisten them independently', () => {
		const history = create({});
		const a = vi.fn();
		const b = vi.fn();
		const unlistenA = history.listen(a);
		history.listen(b);
		history.push('/one');
		expect(a).toHaveBeenCalledTimes(1);
		expect(b).toHaveBeenCalledTimes(1);
		unlistenA();
		history.push('/two');
		expect(a).toHaveBeenCalledTimes(1);
		expect(b).toHaveBeenCalledTimes(2);
	});

	it('should be able to listen again after every listener is removed', () => {
		const history = create({});
		const first = vi.fn();
		history.listen(first)();
		const second = vi.fn();
		history.listen(second);
		history.push('/one');
		expect(first).not.toHaveBeenCalled();
		expect(second).toHaveBeenCalledTimes(1);
	});

	it('should provide back and forward that notify with POP', async () => {
		const history = create({});
		history.push('/one');
		history.push('/two');
		const listener = vi.fn();
		history.listen(listener);
		const popped = () => new Promise(resolve => setTimeout(resolve, 50));
		history.back();
		await popped();
		expect(listener.mock.calls[0][0]).toMatchObject({
			action: 'POP',
			location: { pathname: '/one' },
		});
		history.forward();
		await popped();
		expect(listener.mock.calls[1][0].location.pathname).toBe('/two');
	});
});
