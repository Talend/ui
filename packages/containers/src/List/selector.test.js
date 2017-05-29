import { store } from '@talend/react-cmf/lib/mock';
import { fromJS } from 'immutable';
import {
	mapStateToProps,
} from './List.connect';

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

const state = store.state();
state.cmf.collections = fromJS({
	default: {
		columns: [
			{ key: 'id', name: 'ID' },
			{ key: 'value', name: 'Value' },
		],
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
					limit: 0,
					offset: 0,
					sortOn: 'name',
					sortAsc: true,
					filterDocked: true,
				},
			},
		});

		const props = mapStateToProps(state, localConfig);
		expect(props.items.length).toBe(localConfig.items.length);
	});

	it('should filter the list when filter on visible column', () => {
		state.cmf.components = fromJS({
			'Container(List)': {
				default: {
					displayMode: 'large',
					searchQuery: 'value2',
					limit: 0,
					offset: 0,
					sortOn: 'name',
					sortAsc: true,
					filterDocked: true,
				},
			},
		});

		const props = mapStateToProps(state, localConfig);
		expect(props.items.length).toBe(1);
	});

	it('should return no elements when search on non visible column', () => {
		state.cmf.components = fromJS({
			'Container(List)': {
				default: {
					displayMode: 'large',
					searchQuery: 'text',
					limit: 0,
					offset: 0,
					sortOn: 'name',
					sortAsc: true,
					filterDocked: true,
				},
			},
		});

		const props = mapStateToProps(state, localConfig);
		expect(props.items.length).toBe(0);
	});
});
