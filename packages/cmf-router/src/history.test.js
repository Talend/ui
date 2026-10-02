import { create } from './history';

describe('history', () => {
	it.each(['javascript:alert(1)', 'https://evil.example', '//evil.example'])(
		'should refuse to push/replace %s',
		target => {
			const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
			const history = create({});
			const assign = vi.spyOn(window.history, 'pushState');
			history.push(target);
			history.replace(target);
			expect(assign).not.toHaveBeenCalled();
			expect(window.history.replaceState).not.toBe(undefined);
			assign.mockRestore();
			errorSpy.mockRestore();
		},
	);
	it('should push in-app paths, with basename', () => {
		const history = create({ basename: '/app' });
		history.push('/foo');
		expect(history.location.pathname).toBe('/app/foo');
	});
});
