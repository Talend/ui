import { generateId, generateDescriptionId, generateErrorId } from './generateId';

describe('GenerateId', () => {
	describe('#generateDescriptionId', () => {
		it('should return generated id if the base id is undefined', () => {
			// given
			const id = undefined;

			// when
			const generatedId = generateDescriptionId(id);

			// then
			expect(generatedId).toBe(42);
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
		it('should return generated id if the base id is undefined', () => {
			// given
			const id = undefined;

			// when
			const generatedId = generateErrorId(id);

			// then
			expect(generatedId).toBe(42);
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

	describe('#generateId', () => {
		it('should return generated id if the base id is undefined', () => {
			// given
			const id = undefined;

			// when
			const generatedId = generateId(id, 'my-suffix');

			// then
			expect(generatedId).toBe(42);
		});

		it('should return the generated id', () => {
			// given
			const id = 'my-base-id';

			// when
			const generatedId = generateId(id, 'my-suffix');

			// then
			expect(generatedId).toBe('my-base-id-my-suffix');
		});
	});
});
