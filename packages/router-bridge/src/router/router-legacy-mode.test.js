jest.mock('react-router-dom', () => {
	throw new Error();
});

describe('router bridge - legacy mode', () => {
	it('should not export any router implementation', () => {
		// when
		const { history, Route, isV5 } = require('./index');

		// then
		expect(history).toBe(null);
		expect(Route()).toBe(null);
		expect(isV5).toBe(false);
	});
});
