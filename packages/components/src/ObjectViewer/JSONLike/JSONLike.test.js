import { ARRAY_ABSTRACT, OBJECT_ABSTRACT, abstracter, getDataAbstract, getDataInfo } from './JSONLike.component';

describe('JSONLike', () => {
	describe('abstracter', () => {
		const TEST_STRING = 'test';

		it('abstracts an array with the accumulator', () => {
			expect(abstracter(TEST_STRING, [])).toEqual(`test, ${ARRAY_ABSTRACT}`);
		});
		it('abstracts an array', () => {
			expect(abstracter('', [])).toEqual(ARRAY_ABSTRACT);
		});

		it('abstracts an object with the accumulator', () => {
			expect(abstracter(TEST_STRING, {})).toEqual(`test, ${OBJECT_ABSTRACT}`);
		});
		it('abstracts an object', () => {
			expect(abstracter('', {})).toEqual(OBJECT_ABSTRACT);
		});

		it("doesn't abstract a regular item with accumulator", () => {
			expect(abstracter(TEST_STRING, TEST_STRING)).toEqual(`${TEST_STRING}, ${TEST_STRING}`);
		});
		it("doesn't abstract a regular item", () => {
			expect(abstracter('', TEST_STRING)).toEqual(TEST_STRING);
		});
	});

	describe('getDataInfo', () => {
		const objLabel = 'Record';
		const data = {
			k1: 'v1',
			k2: { k21: 'v21' },
		};

		it('replaces the object type by the provided label', () => {
			expect(getDataInfo(data, objLabel)).toEqual({ keys: ['k1', 'k2'], length: 2, type: 'Record' });
		});
	});

	describe('getDataAbstract', () => {
		const parking = { lot: false, valet: false, garage: false };
		const mixedObject = { good_for: { dessert: false, kids: true, drinks: false, breakfast: false, lunch: false, dinner: true }, parking, take_reservations: true, noise_level: 'quiet' };
		const someArray = [1, 2, 3];
		const mixedArray = ['value1', { obj1Key1: 'obj1kVCalue1' }, ...someArray];
		const someNestedArray = { k1: someArray, k2: 'v2' };
		const arrayInObject = { queue: someArray, location: 'Nantes', country: 'France' };

		it('abstracts an object of false booleans', () => {
			expect(getDataAbstract(parking)).toEqual('false, false, false');
		});

		it('abstracts an object with nested objects', () => {
			expect(getDataAbstract(mixedObject)).toEqual(`${OBJECT_ABSTRACT}, ${OBJECT_ABSTRACT}, true, quiet`);
		});

		it('abstracts an array of primitive', () => {
			expect(getDataAbstract(someArray)).toEqual('1, 2, 3');
		});

		it('abstracts an array of mixed types', () => {
			expect(getDataAbstract(mixedArray)).toEqual(`value1, ${OBJECT_ABSTRACT}, 1, 2, 3`);
		});

		it('abstracts an object containing an array', () => {
			expect(getDataAbstract(someNestedArray)).toEqual(`${ARRAY_ABSTRACT}, v2`);
		});

		it('abstracts an object with an array inside', () => {
			expect(getDataAbstract(arrayInObject)).toEqual(`${ARRAY_ABSTRACT}, Nantes, France`);
		});
	});
});
