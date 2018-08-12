import cmf from '@talend/react-cmf';
import { put } from 'redux-saga/effects';
import { onToggleFilter, onFilterChange, onChangeSortChange } from './List.sagas';

describe('List sagas', () => {
	it('should check onToggleFilter action', () => {
		const data = { payload: { filterDocked: true } };
		const gen = onToggleFilter(data);

		expect(gen.next().value).toEqual(put(cmf.actions.components.mergeState('Container(List)', 'default', {
			filterDocked: !data.payload.filterDocked,
			searchQuery: '',
		})));
	});
	it('should check onFilterChange action', () => {
		const data = { payload: { query: 'test' } };
		const gen = onFilterChange(data);

		expect(gen.next().value).toEqual(put(cmf.actions.components.mergeState('Container(List)', 'default', {
			searchQuery: data.payload.query,
		})));
	});
	it('should check onChangeSortChange action', () => {
		const data = { payload: { isDescending: true, field: 'name' } };
		const gen = onChangeSortChange(data);

		expect(gen.next().value).toEqual(put(cmf.actions.components.mergeState('Container(List)', 'default', {
			sortOn: data.payload.field,
			sortAsc: !data.payload.isDescending,
		})));
	});
});
