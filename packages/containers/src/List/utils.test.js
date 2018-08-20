import { store } from '@talend/react-cmf/lib/mock';
import { fromJS } from 'immutable';
import { sortList, filterList } from './utils';

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

describe('List Utils tests', () => {
	it('should not filter the list when there is no search query', () => {
		const componentState = fromJS({
			displayMode: 'large',
			searchQuery: '',
			itemsPerPage: 0,
			startIndex: 0,
			sortOn: 'name',
			sortAsc: true,
			filterDocked: true,
		});

		const results = filterList(componentState, localConfig.list, localConfig.items);
		expect(results.length).toBe(localConfig.items.length);
	});

	it('should filter the list when filter on visible column', () => {
		const componentState = fromJS({
			displayMode: 'large',
			searchQuery: 'value2',
			itemsPerPage: 0,
			startIndex: 0,
			sortOn: 'name',
			sortAsc: true,
			filterDocked: true,
		});

		const results = filterList(componentState, localConfig.list, localConfig.items);
		expect(results.length).toBe(1);
	});

	it('should sort the list when sorting is applied', () => {
		const componentState = fromJS({
			displayMode: 'large',
			searchQuery: 'value2',
			itemsPerPage: 0,
			startIndex: 0,
			sortOn: 'name',
			sortAsc: false,
			filterDocked: true,
		});

		const results = sortList(componentState, localConfig.list, fromJS(localConfig.items));
		expect(results.toJS()[0].value).toBe('value2');
	});
});
