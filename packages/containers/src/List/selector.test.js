import cmf, { mock } from '@talend/react-cmf';
import { mapStateToProps } from './List.connect';
import { compare, getSortedResults } from './selector';

const localConfig = {
	collectionId: 'default',
	items: [
		{
			id: 'id1',
			value: 'value1',
			text: 'text',
		},
		{
			id: 'id2',
			value: 'value2',
			text: 'text',
		},
	],
	list: {
		columns: [
			{ key: 'id', name: 'ID' },
			{ key: 'value', name: 'Value' },
		],
	},
};

const state = mock.store.state();
state.cmf.collections = {
	default: {
		columns: [
			{ key: 'id', name: 'ID' },
			{ key: 'value', name: 'Value' },
		],
		items: localConfig.items,
	},
};

describe('List Selector tests', () => {
	it('should not filter the list when there is no search query', () => {
		state.cmf.components = {
			'Container(List)': {
				default: {
					displayMode: 'large',
					searchQuery: '',
					itemsPerPage: 0,
					startIndex: 0,
					sortOn: 'name',
					sortAsc: true,
					filterDocked: true,
				},
			},
		};

		const props = mapStateToProps(state, localConfig);
		expect(props.items.length).toBe(localConfig.items.length);
	});

	it('should filter the list when filter on visible column', () => {
		state.cmf.components = {
			'Container(List)': {
				default: {
					displayMode: 'large',
					searchQuery: 'value2',
					itemsPerPage: 0,
					startIndex: 0,
					sortOn: 'name',
					sortAsc: true,
					filterDocked: true,
				},
			},
		};

		const props = mapStateToProps(state, localConfig);
		expect(props.items.length).toBe(1);
	});

	it('should return no elements when search on non visible column', () => {
		state.cmf.components = {
			'Container(List)': {
				default: {
					displayMode: 'large',
					searchQuery: 'text',
					itemsPerPage: 0,
					startIndex: 0,
					sortOn: 'name',
					sortAsc: true,
					filterDocked: true,
				},
			},
		};

		const props = mapStateToProps(state, localConfig);
		expect(props.items.length).toBe(0);
	});

	it('should return items in a page when pagination applied', () => {
		state.cmf.components = {
			'Container(List)': {
				default: {
					itemsPerPage: 1,
					startIndex: 1,
				},
			},
		};
		const props = mapStateToProps(state, { ...localConfig, toolbar: { pagination: {} } });
		expect(props.items.length).toBe(1);
	});

	it('should sort a different column type correctly', () => {
		expect(
			[{ stringID: '1' }, { stringID: '11' }, { stringID: '12' }, { stringID: '2' }].sort(
				compare('stringID'),
			),
		).toEqual([{ stringID: '1' }, { stringID: '11' }, { stringID: '12' }, { stringID: '2' }]);
		expect(
			[
				{ stringName: 'Uzbekistan' },
				{ stringName: 'American Samoa' },
				{ stringName: 'Djibouti' },
				{ stringName: 'Luxembourg' },
			].sort(compare('stringName')),
		).toEqual([
			{ stringName: 'American Samoa' },
			{ stringName: 'Djibouti' },
			{ stringName: 'Luxembourg' },
			{ stringName: 'Uzbekistan' },
		]);
		expect(
			[{ intID: 1 }, { intID: 11 }, { intID: 12 }, { intID: 2 }].sort(compare('intID')),
		).toEqual([{ intID: 1 }, { intID: 2 }, { intID: 11 }, { intID: 12 }]);
		expect(
			[{ mixedID: '1' }, { mixedID: '11' }, { mixedID: '-' }, { mixedID: '2' }].sort(
				compare('mixedID'),
			),
		).toEqual([{ mixedID: '-' }, { mixedID: '1' }, { mixedID: '11' }, { mixedID: '2' }]);
		expect(
			[{ mixedString: 'a' }, { mixedString: 'b' }, { mixedString: 'C' }, { mixedString: 'D' }].sort(
				compare('mixedString'),
			),
		).toEqual([
			{ mixedString: 'a' },
			{ mixedString: 'b' },
			{ mixedString: 'C' },
			{ mixedString: 'D' },
		]);
	});

	it('should test the getSortedResults method', () => {
		cmf.registry.addToRegistry('myCustomSortFn', (sortBy, sortAsc) => (a, b) => {
			if (sortAsc) {
				return a[sortBy] > b[sortBy] ? -1 : 1;
			}
			return 0;
		});

		const componentState = {
			sortOn: 'data',
			sortAsc: true,
		};
		const config = {
			columns: [
				{
					key: 'data',
					label: 'Data Column',
				},
			],
		};

		// Sorting the list
		expect(
			getSortedResults(componentState, config, [
				{ data: 0 },
				{ data: 4 },
				{ data: 2 },
				{ data: 11 },
				{ data: 1 },
				{ data: 23 },
			]),
		).toEqual([{ data: 0 }, { data: 1 }, { data: 2 }, { data: 4 }, { data: 11 }, { data: 23 }]);

		// Sorting by column and custom sort function
		expect(
			getSortedResults(
				{ sortOn: 'a', sortAsc: true },
				{ columns: [{ key: 'a', sortFunction: 'myCustomSortFn' }] },
				[{ a: 1 }, { a: 3 }, { a: 2 }],
			),
		).toEqual([{ a: 3 }, { a: 2 }, { a: 1 }]);

		// Desc sort
		expect(
			getSortedResults({ sortOn: 'key', sortAsc: false }, config, [
				{ key: 1 },
				{ key: 3 },
				{ key: 2 },
			]),
		).toEqual([{ key: 3 }, { key: 2 }, { key: 1 }]);

		// Edge cases
		[null, undefined, 1, true, false, [], {}].forEach(val =>
			expect(getSortedResults(val, val, [{ item: 'one' }])).toEqual([{ item: 'one' }]),
		);

		// With no items
		expect(getSortedResults(componentState, config, null)).toEqual([]);
	});
});
