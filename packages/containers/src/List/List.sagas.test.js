import { put } from 'redux-saga/effects';
import { onToggleFilter, onFilterChange, onChangeSortChange } from './List.sagas';
import Connected from './List.connect';

describe('List sagas', () => {
	it('should check onToggleFilter action', () => {
		const data = { payload: { filterDocked: true } };
		const gen = onToggleFilter(data);

		expect(gen.next().value).toEqual(
			put(
				Connected.setStateAction({
					filterDocked: !data.payload.filterDocked,
					searchQuery: '',
				}),
			),
		);
	});
	it('should check onFilterChange action', () => {
		const data = { payload: { query: 'test' } };
		const gen = onFilterChange(data);

		expect(gen.next().value).toEqual(
			put(
				Connected.setStateAction({
					searchQuery: data.payload.query,
				}),
			),
		);
	});
	it('should check onChangeSortChange action', () => {
		const data = { payload: { isDescending: true, field: 'name' } };
		const gen = onChangeSortChange(data);

		expect(gen.next().value).toEqual(
			put(
				Connected.setStateAction({
					sortOn: data.payload.field,
					sortAsc: !data.payload.isDescending,
				}),
			),
		);
	});
});
