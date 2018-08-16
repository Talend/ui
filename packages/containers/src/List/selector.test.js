import { store } from '@talend/react-cmf/lib/mock';
import { fromJS } from 'immutable';
import { mapStateToProps } from './List.connect';
import { sortList, filterList } from './selector';

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

describe('List Selector tests', () => {
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

		const results = filterList(componentState, localConfig.items, localConfig.list);
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

		const results = filterList(componentState, localConfig.items, localConfig.list);
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

		const results = sortList(componentState, fromJS(localConfig.items), localConfig.list);
		expect(results.toJS()[0].value).toBe('value2');
	});

	it('should return items in a page when pagination applied', () => {
		state.cmf.components = fromJS({
			'Container(List)': {
				default: {
					itemsPerPage: 2,
					startIndex: 0,
				},
			},
		});
		const props = mapStateToProps(state, { ...localConfig, toolbar: { pagination: {} } });
		expect(props.items.length).toBe(2);
	});
});
