import { put } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { onToggleFilter, onFilterChange, onChangeSortChange } from './List.sagas';
import Connected from './List.connect';
import mock, { store } from '../../../cmf/lib/mock';

const localConfig = {
	collectionId: 'default',
	items: fromJS([
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
	]),
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

const context = mock.context();
const event = { type: 'click' };

const data = {
	context,
	event,
	payload: { filterDocked: true },
	props: { config: localConfig },
};

state.cmf.components = fromJS({
	'Container(List)': {
		default: {
			itemsPerPage: 1,
			startIndex: 1,
		},
	},
});

describe('List sagas', () => {
	it('should check onToggleFilter action', () => {
		const gen = onToggleFilter(data);

		expect(gen.next().value).toEqual(
			put(
				Connected.setStateAction(
					{
						filterDocked: !data.payload.filterDocked,
					},
					data.props.collectionId,
				),
			),
		);
	});
	it('should check onFilterChange action', () => {
		const gen = onFilterChange(data);

		expect(gen.next().value).toEqual(
			put(
				Connected.setStateAction(
					{
						searchQuery: data.payload.query,
					},
					data.props.collectionId,
				),
			),
		);
	});
	it('should check onChangeSortChange action', () => {
		const gen = onChangeSortChange(data);

		expect(gen.next().value).toEqual(
			put(
				Connected.setStateAction(
					{
						sortOn: data.payload.field,
						sortAsc: !data.payload.isDescending,
					},
					data.props.collectionId,
				),
			),
		);
	});
});
