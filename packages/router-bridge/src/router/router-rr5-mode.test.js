import { Route as ReactRouterRoute } from 'react-router-dom';

describe('router bridge - rr5 mode', () => {
	it('should not export react router v5 implementation', () => {
		// when
		const { history, Route, isLegacy } = require('./index');

		// then
		expect(history).toBeDefined();
		expect(Route).toBe(ReactRouterRoute);
		expect(isLegacy).toBe(false);
	});
});
