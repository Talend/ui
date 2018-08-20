import { store } from '@talend/react-cmf/lib/mock';
import { fromJS } from 'immutable';
import { mapStateToProps } from './List.connect';

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
});
