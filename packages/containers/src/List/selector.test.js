import { store } from '@talend/react-cmf/lib/mock';
import cmf from '@talend/react-cmf';
import { fromJS, List } from 'immutable';
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
		columns: [{ key: 'id', name: 'ID' }, { key: 'value', name: 'Value' }],
	},
};

const state = store.state();
state.cmf.collections = fromJS({
	default: {
		columns: [{ key: 'id', name: 'ID' }, { key: 'value', name: 'Value' }],
		items: localConfig.items,
	},
});
state.cmf.registry = fromJS({
	myCustomSortFn: () => () => -1,
});

describe('List Selector tests', () => {
	it('should not filter the list when there is no search query', () => {
		state.cmf.components = fromJS({
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
		});

		const props = mapStateToProps(state, localConfig);
		expect(props.items.size).toBe(localConfig.items.length);
	});

	it('should filter the list when filter on visible column', () => {
		state.cmf.components = fromJS({
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
		});

		const props = mapStateToProps(state, localConfig);
		expect(props.items.size).toBe(1);
	});

	it('should return no elements when search on non visible column', () => {
		state.cmf.components = fromJS({
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
		});

		const props = mapStateToProps(state, localConfig);
		expect(props.items.size).toBe(0);
	});

	it('should return items in a page when pagination applied', () => {
		state.cmf.components = fromJS({
			'Container(List)': {
				default: {
					itemsPerPage: 1,
					startIndex: 1,
				},
			},
		});
		const props = mapStateToProps(state, { ...localConfig, toolbar: { pagination: {} } });
		expect(props.items.size).toBe(1);
	});

	it('should sort a different column type correctly', () => {
		expect(fromJS([
			{ stringID: '1' },
			{ stringID: '11' },
			{ stringID: '12' },
			{ stringID: '2' },
		]).sort(compare('stringID'))).toEqual(fromJS([
			{ stringID: '1' },
			{ stringID: '11' },
			{ stringID: '12' },
			{ stringID: '2' },
		]));
		expect(fromJS([
			{ stringName: 'Uzbekistan' },
			{ stringName: 'American Samoa' },
			{ stringName: 'Djibouti' },
			{ stringName: 'Luxembourg' },
		]).sort(compare('stringName'))).toEqual(fromJS([
			{ stringName: 'American Samoa' },
			{ stringName: 'Djibouti' },
			{ stringName: 'Luxembourg' },
			{ stringName: 'Uzbekistan' },
		]));
		expect(fromJS([
			{ intID: 1 },
			{ intID: 11 },
			{ intID: 12 },
			{ intID: 2 },
		]).sort(compare('intID'))).toEqual(fromJS([
			{ intID: 1 },
			{ intID: 2 },
			{ intID: 11 },
			{ intID: 12 },
		]));
		expect(fromJS([
			{ mixedID: '1' },
			{ mixedID: '11' },
			{ mixedID: '-' },
			{ mixedID: '2' },
		]).sort(compare('mixedID'))).toEqual(fromJS([
			{ mixedID: '-' },
			{ mixedID: '1' },
			{ mixedID: '11' },
			{ mixedID: '2' },
		]));
	});

	it('should test the getSortedResults method', () => {
		cmf.registry.addToRegistry('myCustomSortFn', (sortBy, sortAsc) => (a, b) => {
			if (a.get(sortBy)) {
				return a > b ? 1 : -1;
			}
			if (!sortAsc) {
				return 0;
			}
			return -1;
		});

		const componentState = fromJS({
			sortOn: 'counter',
			sortAsc: true,
		});
		const config = {
			columns: [
				{
					key: 'counter',
					label: 'Counter Column',
				},
			],
		};

		// Sorting the list
		// expect(getSortedResults(componentState, config, fromJS([
		// 	{ counter: 0 },
		// 	{ counter: 4 },
		// 	{ counter: 2 },
		// 	{ counter: 11 },
		// 	{ counter: 1 },
		// 	{ counter: 23 },
		// ]))).toEqual(fromJS([
		// 	{ counter: 0 },
		// 	{ counter: 1 },
		// 	{ counter: 2 },
		// 	{ counter: 4 },
		// 	{ counter: 11 },
		// 	{ counter: 23 },
		// ]));

		// Sorting by column and custom sort function
		expect(
			getSortedResults(
				fromJS({ sortOn: 'withCustomSortFn', sortAsc: false }),
				{ columns: [{ key: 'withCustomSortFn', sortFunction: 'myCustomSortFn' }] },
				fromJS([{ a: 1 }, { a: 3 }, { a: 2 }]),
			),
		).toEqual(fromJS([{ a: 3 }, { a: 2 }, { a: 1 }]));

		// Edge cases
		// [null, undefined, 1, true, false, [], {}].forEach(val =>
		// 	expect(getSortedResults(val, val, fromJS([{ item: 'one' }])))
		// 		.toEqual(fromJS([{ item: 'one' }]))
		// );

		// With no items
		// expect(getSortedResults(componentState, config, null)).toEqual(new List());
	});
});
