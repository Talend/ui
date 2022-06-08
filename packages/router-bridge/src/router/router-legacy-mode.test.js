jest.mock('react-router-dom', () => {
	throw new Error();
});

describe('router bridge - legacy mode', () => {
	it('should not export any router implementation', () => {
		// when
		const { history, Route, isLegacy } = require('./index');

		// then
		expect(history).toBe(null);
		// eslint-disable-next-line
		expect(Route()).toBe(null);
		expect(isLegacy).toBe(true);
	});
});
