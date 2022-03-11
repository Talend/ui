/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const fs = require('fs');
const path = require('path');

const umdMinified = path.join(__dirname, '..', './dist/TalendDesignTokens.min.js');
const umdDev = path.join(__dirname, '..', './dist/TalendDesignTokens.js');
const cssDev = path.join(__dirname, '..', './dist/TalendDesignTokens.css');

describe('umd', () => {
	it('should exists', () => {
		expect(fs.existsSync(umdMinified)).toBeTruthy();
		expect(fs.existsSync(umdDev)).toBeTruthy();
		expect(fs.existsSync(cssDev)).toBeTruthy();
	});
	it('should expose default and values', () => {
		const min = require(umdMinified);
		const dev = require(umdDev);
		expect(min.default).toBeDefined();
		expect(dev.default).toBeDefined();
		expect(min.default.coralColorNeutralText).toBeDefined();
		expect(dev.default.coralColorNeutralText).toBeDefined();
	});
});
