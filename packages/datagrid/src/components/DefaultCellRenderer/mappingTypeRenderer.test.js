import { getTypeRenderer } from './mappingTypeRenderer';

describe('#avrorender', () => {
	it('should return the mapping corresponding to the type', () => {
		expect(getTypeRenderer({ type: 'double', logicalType: '' })).toBe('int');
	});

	it('should return the mapping corresponding to the logical type', () => {
		expect(getTypeRenderer({ type: 'long', logicalType: 'timestamp-millis' })).toBe('date');
	});

	it('should return the mapping corresponding to the logical type', () => {
		expect(getTypeRenderer({ type: 'int', logicalType: 'timestamp-millis' })).toBe('int');
	});

	it('should return the type if no mapping', () => {
		expect(getTypeRenderer({ type: 'string', logicalType: '' })).toBe('string');
	});
});
