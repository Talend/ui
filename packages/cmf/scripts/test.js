const noop = require('lodash/noop');
const { setLogger, getLogger } = require('./cmf-settings.utils');

describe('i18n scripts', () => {
	it('should not set quiet the logger', () => {
		const quiet = false;
		setLogger(quiet);
		expect(getLogger()).not.toBe(noop);
	});

	it('should set quiet the logger', () => {
		const quiet = true;
		setLogger(quiet);
		expect(getLogger()).toBe(noop);
	});
});
