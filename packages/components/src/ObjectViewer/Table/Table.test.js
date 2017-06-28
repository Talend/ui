import {
	getKeys,
	getAbsolutePath,
	getHeaders,
} from './Table.component';

describe('Table.getHeaders', () => {
	it('should transform json path to key', () => {
		const headers = getHeaders(['$[\'attr\'][0][\'foo\']'], true);
		expect(headers[0]).toBe('attr[0].foo');
		expect(headers.length).toBe(1);
		expect(getHeaders(['attr.foo'], true)[0]).toBe('attr.foo');
	});
});

describe('Table.getKeys', () => {
	it('should return keys of obj', () => {
		const keys = getKeys({ attr: ['foo'] });
		expect(keys[0]).toBe('attr');
		expect(keys.length).toBe(1);
	});

	it('should return flatten keys of obj', () => {
		const keys = getKeys({ attr: ['foo'] }, true);
		expect(keys[0]).toBe('$[\'attr\'][0]');
		expect(keys.length).toBe(1);
	});
});

describe('Table.getAbsolutePath', () => {
	it('should return path of obj from key', () => {
		const keys = getKeys({ attr: ['foo'] });
		const path = getAbsolutePath(0, keys[0]);
		expect(path).toBe('$[0][\'attr\']');
	});

	it('should return path of obj from key [flat]', () => {
		const keys = getKeys({ attr: ['foo'] }, true);
		const path = getAbsolutePath(0, keys[0], true);
		expect(path).toBe('$[0][\'attr\'][0]');
	});
});
