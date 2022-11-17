import { handleMultiSelection } from './DataGrid.utils';

const allCols = ['1', '2', '3', '4', '5'];

describe('DataGrid utils', () => {
	it('should handle column selection with shift modifier', () => {
		const modifiers = {
			shiftKey: true,
			metaKey: false,
			ctrlKey: false,
		};
		expect(handleMultiSelection('1', allCols, [], modifiers)).toEqual(['1']);
		expect(handleMultiSelection('3', allCols, ['1'], modifiers)).toEqual(['1', '2', '3']);
		expect(handleMultiSelection('1', allCols, ['3'], modifiers)).toEqual(['1', '2', '3']);
	});
	it('should handle column selection with ctrl modifier', () => {
		const modifiers = {
			shiftKey: false,
			metaKey: true,
			ctrlKey: false,
		};
		expect(handleMultiSelection('1', allCols, [], modifiers)).toEqual(['1']);
		expect(handleMultiSelection('1', allCols, ['1'], modifiers)).toEqual([]);
		expect(handleMultiSelection('1', allCols, ['3'], modifiers)).toEqual(['3', '1']);
	});
});
