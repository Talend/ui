import formatJSONPath, { formatKey, readJsonKeys } from './jsonPath';

describe('formatKey', () => {
	it('should return an array format', () => {
		const result = formatKey('someKey', 'array');
		expect(result).toEqual('[someKey]');
	});
	it('should return an object format', () => {
		const result = formatKey('someKey', 'object');
		expect(result).toEqual("['someKey']");
	});
});

describe('readJsonKeys', () => {
	it('should return a string of keys', () => {
		const keys = ['hello', 'beautifull', 'world'];
		const result = readJsonKeys(keys, 'object');
		expect(result).toEqual("['hello']['beautifull']['world']");
	});
});

describe('formatJsonPath', () => {
	it('should return a jsonpath', () => {
		const keys = ['hello', 'beautifull', 'world'];
		const result = formatJSONPath(keys, '$', 'object');
		expect(result).toEqual("$['hello']['beautifull']['world']");
	});
});
