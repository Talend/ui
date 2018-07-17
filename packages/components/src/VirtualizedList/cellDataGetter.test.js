import cellDataGetter from './cellDataGetter';

describe('cellDataGetter', () => {
	it('should use rowData.get', () => {
		const rowData = {
			get: jest.fn(() => 'bar'),
		};
		const result = cellDataGetter({ rowData, dataKey: 'foo' });
		expect(result).toBe('bar');
		expect(rowData.get).toHaveBeenCalledWith('foo');
	});
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
	it('should try to use columnData.selector to get value', () => {
		const rowData = {
			title: 'bar',
		};
		const result = cellDataGetter({ rowData, dataKey: 'title' });
		expect(result).toBe('bar');
	});
});
