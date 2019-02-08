import { isUpdating } from './updating';

describe('isUpdating', () => {
	it('should check if updating array contains schema key', () => {
		const updating = ['foo', 'bar.baz'];
		const schema = {
			key: ['foo'],
		};
		expect(isUpdating(updating, schema)).toBe(true);
	});
	it('should check if updating array contains schema key as parent', () => {
		const updating = ['foo', 'bar.baz'];
		const schema = {
			key: ['foo.hello'],
		};
		expect(isUpdating(updating, schema)).toBe(true);
	});
	it('should return false if bad arguments', () => {
		expect(isUpdating()).toBe(false);
		expect(isUpdating('bad', false)).toBe(false);
	});
});
