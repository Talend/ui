import { setIn, deleteIn } from './state-utils';

describe('setIn', () => {
	it('sets a nested value', () => {
		const obj = { a: { b: 1 } };
		const result = setIn(obj, ['a', 'b'], 2);
		expect(result).toEqual({ a: { b: 2 } });
	});

	it('creates intermediate objects for a new path', () => {
		const obj = {};
		const result = setIn(obj, ['a', 'b'], 1);
		expect(result).toEqual({ a: { b: 1 } });
	});

	it('does not mutate the original object', () => {
		const obj = { a: { b: 1 } };
		setIn(obj, ['a', 'b'], 2);
		expect(obj).toEqual({ a: { b: 1 } });
	});

	it('sets a top-level value', () => {
		const obj = { a: 1 };
		const result = setIn(obj, ['a'], 99);
		expect(result).toEqual({ a: 99 });
	});

	it('returns value as-is when path is empty', () => {
		const obj = { a: 1 };
		const newValue = { b: 2 };
		const result = setIn(obj, [], newValue);
		expect(result).toBe(newValue);
	});
});

describe('deleteIn', () => {
	it('deletes a nested key', () => {
		const obj = { a: { b: 1, c: 2 } };
		const result = deleteIn(obj, ['a', 'b']);
		expect(result).toEqual({ a: { c: 2 } });
	});

	it('deletes a top-level key', () => {
		const obj = { a: 1, b: 2 };
		const result = deleteIn(obj, ['a']);
		expect(result).toEqual({ b: 2 });
	});

	it('returns a clone unchanged when path is empty', () => {
		const obj = { a: 1 };
		const result = deleteIn(obj, []);
		expect(result).toEqual({ a: 1 });
	});

	it('does nothing when the path does not exist', () => {
		const obj = { a: { b: 1 } };
		const result = deleteIn(obj, ['a', 'z']);
		expect(result).toEqual({ a: { b: 1 } });
	});

	it('does not mutate the original object', () => {
		const obj = { a: { b: 1, c: 2 } };
		deleteIn(obj, ['a', 'b']);
		expect(obj).toEqual({ a: { b: 1, c: 2 } });
	});
});
