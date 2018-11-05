const isLerna = require('../lib/isLerna');

describe('isLerna', () => {
	it('should return true if it is a lerna path', () => {
		expect(isLerna('lerna.json')).toEqual(true);
		expect(isLerna('/lerna.json')).toEqual(true);
		expect(isLerna('./lerna.json')).toEqual(true);
		expect(isLerna('some/path/lerna.json')).toEqual(true);
		expect(isLerna('./some/path/lerna.json')).toEqual(true);
		expect(isLerna('/some/path/lerna.json')).toEqual(true);
	});

	it('should return false if it is not a lerna path', () => {
		expect(isLerna('lerna.jsonn')).toEqual(false);
		expect(isLerna('/lerna.jsonn')).toEqual(false);
		expect(isLerna('./lerna.jsonn')).toEqual(false);
		expect(isLerna('some/path/lerna.json/')).toEqual(false);
		expect(isLerna('./some/path/lerna.json/something.json')).toEqual(false);
		expect(isLerna('/some/path/lerna/something.json')).toEqual(false);
		expect(isLerna('/some/path/lernas.json')).toEqual(false);
		expect(isLerna('/some/path/lernajson')).toEqual(false);
		expect(isLerna('/some/path/lerna/json')).toEqual(false);
		expect(isLerna('/some/path/lerna.js')).toEqual(false);
	});
});
