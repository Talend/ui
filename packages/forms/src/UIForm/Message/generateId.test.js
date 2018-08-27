import { generateDescriptionId, generateErrorId, generateDescribedBy } from './generateId';

describe('GenerateId', () => {
	describe('#generateDescriptionId', () => {
		it('should return undefined if the base id is undefined', () => {
			// given
			const id = undefined;

			// when
			const generatedId = generateDescriptionId(id);

			// then
			expect(generatedId).toBe(undefined);
		});

		it('should return the generated id', () => {
			// given
			const id = 'my-base-id';

			// when
			const generatedId = generateDescriptionId(id);

			// then
			expect(generatedId).toBe('my-base-id-description');
		});
	});

	describe('#generateErrorId', () => {
		it('should return undefined if the base id is undefined', () => {
			// given
			const id = undefined;

			// when
			const generatedId = generateErrorId(id);

			// then
			expect(generatedId).toBe(undefined);
		});

		it('should return the generated id', () => {
			// given
			const id = 'my-base-id';

			// when
			const generatedId = generateErrorId(id);

			// then
			expect(generatedId).toBe('my-base-id-error');
		});
	});

	describe('#generateDescribedBy', () => {
		it('should return undefined if the base id is undefined', () => {
			// given
			const id = undefined;

			// when
			const generatedId = generateDescribedBy(id);

			// then
			expect(generatedId).toBe(undefined);
		});

		it('should return the generated id', () => {
			// given
			const id = 'my-base-id';

			// when
			const generatedId = generateDescribedBy(id);

			// then
			expect(generatedId).toBe('my-base-id-description my-base-id-error');
		});
	});
});
