import { allIndexOf, removeDuplicates } from './utils';

describe('allIndexOf', () => {
	it('should get 2 indexes with allIndexOf', () => {
		const indexes = allIndexOf('AaBbCcAa'.toLowerCase(), 'Aa'.toLowerCase());
		expect(indexes.length).toBe(2);
		expect(indexes[0]).toBe(0);
		expect(indexes[1]).toBe(6);
	});

	it('should get 1 indexes with allIndexOf', () => {
		const indexes = allIndexOf('AaBbCcAa'.toLowerCase(), 'bb'.toLowerCase());
		expect(indexes.length).toBe(1);
		expect(indexes[0]).toBe(2);
	});

	it('should get empty array from allIndexOf', () => {
		const indexes = allIndexOf('AaBbCcAa'.toLowerCase(), 'ee'.toLowerCase());
		expect(indexes.length).toBe(0);
	});
});

describe('removeDuplicates', () => {
	it('should remove indexes with short search', () => {
		const indexes = removeDuplicates([0, 1, 2, 3], 'aa');
		expect(indexes.length).toBe(2);
		expect(indexes[0]).toBe(0);
		expect(indexes[1]).toBe(2);
	});

	it('should not remove indexes when not in searchLenght', () => {
		const indexes = removeDuplicates([0, 10], 'hello');
		expect(indexes.length).toBe(2);
		expect(indexes[0]).toBe(0);
		expect(indexes[1]).toBe(10);
	});
});
