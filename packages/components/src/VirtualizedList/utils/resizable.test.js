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
			resized: true,
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
			resized: true,
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
		const currentIndex = 1;
		const listWidth = 300;
		// when
		const ret = resizeColumns(deltaX, columnsWidths, listWidth, currentIndex);
		// then
		expect(ret).toEqual([
			{
				currentTotalWidth: listWidth,
				dataKey: 'columnOne',
				listWidth: 300,
				resizable: true,
				resized: false,
				width: 70,
			},
			{
				currentTotalWidth: listWidth,
				dataKey: 'columnTwo',
				listWidth: 300,
				resizable: true,
				resized: true,
				width: 110,
			},
			{
				currentTotalWidth: listWidth,
				dataKey: 'columnThree',
				listWidth: 300,
				resizable: true,
				resized: true,
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
		const currentIndex = 0;
		const listWidth = 240;
		// when
		const ret = resizeColumns(deltaX, columnsWidths, listWidth, currentIndex);
		// then
		expect(ret).toEqual([
			{
				currentTotalWidth: listWidth,
				dataKey: 'columnOne',
				listWidth: 240,
				resizable: true,
				resized: true,
				width: 80,
			},
			{
				currentTotalWidth: listWidth,
				dataKey: 'columnTwo',
				listWidth: 240,
				resizable: true,
				resized: false,
				width: 40,
			},
			{
				currentTotalWidth: listWidth,
				dataKey: 'columnThree',
				listWidth: 240,
				resizable: true,
				resized: true,
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
		const currentIndex = 1;
		const listWidth = 470;
		// when
		const ret = resizeColumns(deltaX, columnsWidths, listWidth, currentIndex);
		// then
		expect(ret).toEqual([
			{
				currentTotalWidth: listWidth,
				dataKey: 'columnOne',
				listWidth: 470,
				resizable: true,
				resized: false,
				width: 70,
			},
			{
				currentTotalWidth: listWidth,
				dataKey: 'columnTwo',
				listWidth: 470,
				resizable: true,
				resized: true,
				width: 160,
			},
			{
				currentTotalWidth: listWidth,
				dataKey: 'columnThree',
				listWidth: 470,
				resizable: false,
				resized: false,
				width: 120,
			},
			{
				currentTotalWidth: listWidth,
				dataKey: 'columnFour',
				listWidth: 470,
				resizable: true,
				resized: true,
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
		const currentIndex = 1;
		const listWidth = 300;
		// when
		const ret = resizeColumns(deltaX, columnsWidths, listWidth, currentIndex);
		// then
		expect(ret).toEqual([
			{
				currentTotalWidth: listWidth,
				dataKey: 'columnOne',
				listWidth: 300,
				resizable: true,
				resized: false,
				width: 70,
			},
			{
				currentTotalWidth: listWidth,
				dataKey: 'columnTwo',
				listWidth: 300,
				resizable: true,
				resized: true,
				width: 90,
			},
			{
				currentTotalWidth: listWidth,
				dataKey: 'columnThree',
				listWidth: 300,
				resizable: true,
				resized: true,
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
		const currentIndex = 1;
		const listWidth = 240;
		// when
		const ret = resizeColumns(deltaX, columnsWidths, listWidth, currentIndex);
		// then
		expect(ret).toEqual([
			{
				currentTotalWidth: listWidth,
				dataKey: 'columnOne',
				listWidth: 240,
				resizable: true,
				resized: true,
				width: 60,
			},
			{
				currentTotalWidth: listWidth,
				dataKey: 'columnTwo',
				listWidth: 240,
				resized: false,
				width: 40,
			},
			{
				currentTotalWidth: listWidth,
				dataKey: 'columnThree',
				listWidth: 240,
				resizable: true,
				resized: true,
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
		const currentIndex = 1;
		const listWidth = 300;
		// when
		const ret = resizeColumns(deltaX, columnsWidths, listWidth, currentIndex);
		// then
		expect(ret).toEqual([
			{
				currentTotalWidth: listWidth,
				dataKey: 'columnOne',
				listWidth: 300,
				resizable: true,
				resized: false,
				width: 70,
			},
			{
				currentTotalWidth: listWidth,
				dataKey: 'columnTwo',
				listWidth: 300,
				resizable: true,
				resized: true,
				width: 190,
			},
			{
				currentTotalWidth: listWidth,
				dataKey: 'columnThree',
				listWidth: 300,
				resizable: true,
				resized: true,
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
		const currentIndex = 1;
		const listWidth = 300;
		// when
		const ret = resizeColumns(deltaX, columnsWidths, listWidth, currentIndex);
		// then
		expect(ret).toEqual([
			{
				currentTotalWidth: listWidth,
				dataKey: 'columnOne',
				listWidth: 300,
				resizable: true,
				resized: false,
				width: 70,
			},
			{
				currentTotalWidth: listWidth,
				dataKey: 'columnTwo',
				listWidth: 300,
				resizable: true,
				resized: true,
				width: 40,
			},
			{
				currentTotalWidth: listWidth,
				dataKey: 'columnThree',
				listWidth: 300,
				resizable: true,
				resized: true,
				width: 190,
			},
		]);
	});
});
