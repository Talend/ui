import cellDataGetter from './cellDataGetter';
import { defaultTableCellDataGetter } from 'react-virtualized';

jest.mock('react-virtualized', () => ({
	defaultTableCellDataGetter: jest.fn(),
}));

describe('cellDataGetter', () => {
	it('should try to use columnData.selector to get value', () => {
		const rowData = {
			metadata: {
				title: 'bar',
			},
		};
		const columnData = {
			selector: 'metadata.title',
		};
		const result = cellDataGetter({ rowData, columnData });
		expect(result).toBe('bar');
	});
	it('should fallback to defaultTableCellDataGetter', () => {
		const info = {
			rowData: {
				title: 'bar',
			},
			dataKey: 'title',
		};
		cellDataGetter(info);
		expect(defaultTableCellDataGetter).toHaveBeenCalledWith(info);
	});
});
