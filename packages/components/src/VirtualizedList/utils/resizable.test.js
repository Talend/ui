import {
	createColumnWidthProps,
	getColumnWidth,
	extractResizableProps,
	resizeColumns,
} from './resizable';

describe('createColumnWidthProps', () => {
	it('should return an object with fixed width', () => {
		// given
		const params = {
			resizable: true,
			width: 40,
			minWidth: 40,
		};
		// when
		const ret = createColumnWidthProps(params);
		// then
		expect(ret).toEqual({
			width: 40,
			flexShrink: 0,
			flexGrow: 0,
		});
	});
	it('should return an object with only the width', () => {
		// given
		const params = {
			resizable: true,
			width: 180,
			minWidth: 40,
		};
		// when
		const ret = createColumnWidthProps(params);
		// then
		expect(ret).toEqual({
			width: 180,
		});
	});
});

describe('getColumnWidth', () => {
	it('should return the column matching the dataKey', () => {
		// given
		const dataKey = 'hello';
		const columnsWidths = [
			{
				dataKey: 'hello',
				width: 100,
			},
			{
				dataKey: 'world',
				width: 50,
			},
		];
		// when
		const ret = getColumnWidth(dataKey, columnsWidths);
		// then
		expect(ret).toBe(columnsWidths[0]);
	});
	it('should return undefined', () => {
		// given
		const dataKey = 'something else';
		const columnsWidths = [
			{
				dataKey: 'hello',
				width: 100,
			},
			{
				dataKey: 'world',
				width: 50,
			},
		];
		// when
		const ret = getColumnWidth(dataKey, columnsWidths);
		// then
		expect(ret).toEqual(undefined);
	});
	it('should return an empty object', () => {
		// given
		const dataKey = 'something else';
		const columnsWidths = {
			dataKey: 'hello',
			width: 100,
		};
		// when
		const ret = getColumnWidth(dataKey, columnsWidths);
		// then
		expect(ret).toEqual({});
	});
});

describe('extractResizableProps', () => {
	it('should return a new array with widths props values', () => {
		// given
		const arrayOfReactElements = [
			{
				stuff: 'lots of stuff',
				props: {
					dataKey: 'hello',
					minWidth: undefined,
					resizable: true,
					width: 100,
				},
			},
			{
				stuff: 'lots of stuff',
				props: {
					dataKey: 'world',
					resizable: false,
				},
			},
		];
		// when
		const ret = extractResizableProps(arrayOfReactElements);
		// then
		expect(ret).toEqual([
			{ dataKey: 'hello', minWidth: 40, resizable: true, width: 100 },
			{ dataKey: 'world', minWidth: 40, resizable: false, width: undefined },
		]);
	});
	it('should return an empty array', () => {
		// given nothing
		// when
		const ret = extractResizableProps();
		// then
		expect(ret).toEqual([]);
	});
});

describe('resizeColumns', () => {
	it('should enlarge columnTwo and shrink columnThree', () => {
		// given
		const deltaX = 10;
		const columnsWidths = [
			{
				dataKey: 'columnOne',
				width: 70,
				resizable: true,
			},
			{
				dataKey: 'columnTwo',
				width: 100,
				resizable: true,
			},
			{
				dataKey: 'columnThree',
				width: 130,
				resizable: true,
			},
		];
		const dataKey = 'columnTwo';
		const listWidth = 300;
		// when
		const ret = resizeColumns(deltaX, columnsWidths, listWidth, dataKey);
		// then
		expect(ret).toEqual([
			{
				dataKey: 'columnOne',
				resizable: true,
				width: 70,
			},
			{
				dataKey: 'columnTwo',
				resizable: true,
				width: 110,
			},
			{
				dataKey: 'columnThree',
				resizable: true,
				width: 120,
			},
		]);
	});
	it('should enlarge columnOne and shrink columnThree, skipping columnTwo which is at minimum width', () => {
		// given
		const deltaX = 10;
		const columnsWidths = [
			{
				dataKey: 'columnOne',
				width: 70,
				resizable: true,
			},
			{
				dataKey: 'columnTwo',
				width: 40,
				resizable: true,
			},
			{
				dataKey: 'columnThree',
				width: 130,
				resizable: true,
			},
		];
		const dataKey = 'columnOne';
		const listWidth = 240;
		// when
		const ret = resizeColumns(deltaX, columnsWidths, listWidth, dataKey);
		// then
		expect(ret).toEqual([
			{
				dataKey: 'columnOne',
				resizable: true,
				width: 80,
			},
			{
				dataKey: 'columnTwo',
				resizable: true,
				width: 40,
			},
			{
				dataKey: 'columnThree',
				resizable: true,
				width: 120,
			},
		]);
	});
	it('should enlarge columnTwo and shrink columnFour, skipping columnThree which is not resizable', () => {
		// given
		const deltaX = 10;
		const columnsWidths = [
			{
				dataKey: 'columnOne',
				width: 70,
				resizable: true,
			},
			{
				dataKey: 'columnTwo',
				width: 150,
				resizable: true,
			},
			{
				dataKey: 'columnThree',
				width: 120,
				resizable: false,
			},
			{
				dataKey: 'columnFour',
				width: 130,
				resizable: true,
			},
		];
		const dataKey = 'columnTwo';
		const listWidth = 470;
		// when
		const ret = resizeColumns(deltaX, columnsWidths, listWidth, dataKey);
		// then
		expect(ret).toEqual([
			{
				dataKey: 'columnOne',
				resizable: true,
				width: 70,
			},
			{
				dataKey: 'columnTwo',
				resizable: true,
				width: 160,
			},
			{
				dataKey: 'columnThree',
				resizable: false,
				width: 120,
			},
			{
				dataKey: 'columnFour',
				resizable: true,
				width: 120,
			},
		]);
	});
	it('should shrink columnTwo and enlarge columnThree', () => {
		// given
		const deltaX = -10;
		const columnsWidths = [
			{
				dataKey: 'columnOne',
				width: 70,
				resizable: true,
			},
			{
				dataKey: 'columnTwo',
				width: 100,
				resizable: true,
			},
			{
				dataKey: 'columnThree',
				width: 130,
				resizable: true,
			},
		];
		const dataKey = 'columnTwo';
		const listWidth = 300;
		// when
		const ret = resizeColumns(deltaX, columnsWidths, listWidth, dataKey);
		// then
		expect(ret).toEqual([
			{
				dataKey: 'columnOne',
				resizable: true,
				width: 70,
			},
			{
				dataKey: 'columnTwo',
				resizable: true,
				width: 90,
			},
			{
				dataKey: 'columnThree',
				resizable: true,
				width: 140,
			},
		]);
	});
	it('should shrink columnOne, skip columnTwo not resizable, and enlarge columnThree', () => {
		// given
		const deltaX = -10;
		const columnsWidths = [
			{
				dataKey: 'columnOne',
				width: 70,
				resizable: true,
			},
			{
				dataKey: 'columnTwo',
				width: 40,
			},
			{
				dataKey: 'columnThree',
				width: 130,
				resizable: true,
			},
		];
		const dataKey = 'columnTwo';
		const listWidth = 240;
		// when
		const ret = resizeColumns(deltaX, columnsWidths, listWidth, dataKey);
		// then
		expect(ret).toEqual([
			{
				dataKey: 'columnOne',
				resizable: true,
				width: 60,
			},
			{
				dataKey: 'columnTwo',
				width: 40,
			},
			{
				dataKey: 'columnThree',
				resizable: true,
				width: 140,
			},
		]);
	});
	it('should not exceed the list width when dragging right', () => {
		// given
		const deltaX = 1000;
		const columnsWidths = [
			{
				dataKey: 'columnOne',
				width: 70,
				resizable: true,
			},
			{
				dataKey: 'columnTwo',
				width: 100,
				resizable: true,
			},
			{
				dataKey: 'columnThree',
				width: 130,
				resizable: true,
			},
		];
		const dataKey = 'columnTwo';
		const listWidth = 300;
		// when
		const ret = resizeColumns(deltaX, columnsWidths, listWidth, dataKey);
		// then
		expect(ret).toEqual([
			{
				dataKey: 'columnOne',
				resizable: true,
				width: 70,
			},
			{
				dataKey: 'columnTwo',
				resizable: true,
				width: 190,
			},
			{
				dataKey: 'columnThree',
				resizable: true,
				width: 40,
			},
		]);
	});
	it('should not exceed the list width when dragging left', () => {
		// given
		const deltaX = -1000;
		const columnsWidths = [
			{
				dataKey: 'columnOne',
				width: 70,
				resizable: true,
			},
			{
				dataKey: 'columnTwo',
				width: 100,
				resizable: true,
			},
			{
				dataKey: 'columnThree',
				width: 130,
				resizable: true,
			},
		];
		const dataKey = 'columnTwo';
		const listWidth = 300;
		// when
		const ret = resizeColumns(deltaX, columnsWidths, listWidth, dataKey);
		// then
		expect(ret).toEqual([
			{
				dataKey: 'columnOne',
				resizable: true,
				width: 70,
			},
			{
				dataKey: 'columnTwo',
				resizable: true,
				width: 40,
			},
			{
				dataKey: 'columnThree',
				resizable: true,
				width: 190,
			},
		]);
	});
	it('should return the same values if the dataKey is not matched', () => {
		// given
		const deltaX = 10;
		const columnsWidths = [
			{
				dataKey: 'columnOne',
				width: 70,
				resizable: true,
			},
			{
				dataKey: 'columnTwo',
				width: 100,
				resizable: true,
			},
			{
				dataKey: 'columnThree',
				width: 130,
				resizable: true,
			},
		];
		const dataKey = 'something';
		const listWidth = 300;
		// when
		const ret = resizeColumns(deltaX, columnsWidths, listWidth, dataKey);
		// then
		expect(ret).toEqual(columnsWidths);
	});
	it('should throw an error if a column has no width', () => {
		// given
		const deltaX = 10;
		const columnsWidths = [
			{
				dataKey: 'columnOne',
				width: 70,
				resizable: true,
			},
			{
				dataKey: 'columnTwo',
				resizable: true,
			},
			{
				dataKey: 'columnThree',
				width: 130,
				resizable: true,
			},
		];
		const dataKey = 'columnTwo';
		const listWidth = 300;
		// when
		try {
			resizeColumns(deltaX, columnsWidths, listWidth, dataKey);
			expect.fail('should have thrown an error because columnTwo has no width');
			// then
		} catch (error) {
			expect(error.message).toBe(
				`[vList:resizable]: column ${dataKey} has no width. To use resizable, every columns need to have a width`,
			);
		}
	});

	it('should not throw an exception when the last column is not resizable due to still at the min width', () => {
		// given
		const deltaX = 10;
		const columnsWidths = [
			{ dataKey: 'columnOne', minWidth: 40, resizable: true, width: 304 },
			{ dataKey: 'columnTwo', minWidth: 40, resizable: true, width: 1376 },
			{ dataKey: 'columnThree', minWidth: 40, resizable: true, width: 40 },
		];

		const dataKey = 'columnTwo';
		const listWidth = 1720;
		const testResizeColumns = () => resizeColumns(deltaX, columnsWidths, listWidth, dataKey);
		// when
		expect(testResizeColumns).not.toThrow();
	});
});
