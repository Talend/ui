import React from 'react';
import { shallow } from 'enzyme';

import VirtualizedList, { SORT_BY } from '../../VirtualizedList';
import ListToVirtualizedList from './ListToVirtualizedList.component';
import CellActions from '../../VirtualizedList/CellActions';

const props = {
	id: 'mylistid',
	items: [{ id: 3, label: 'my item', myactions: [{ foo: 'bar' }], myactionshidden: [{ foo: 'bar' }] }],
	columns: [
		{ key: 'id', label: 'Id' },
		{ key: 'label', label: 'Label' },
		{ key: 'myactions', label: 'Actions' },
		{ key: 'myactionshidden', label: 'ActionsHidden', hideHeader: true },
	],
	titleProps: {
		key: 'label',
		extra: 'Extra',
	},
};

describe('ListToVirtualizedList', () => {
	it('should map props', () => {
		const wrapper = shallow(
			<ListToVirtualizedList {...props} />
		);
		expect(wrapper.props().collection).toBe(props.items);
		expect(wrapper.props().type).toBe('TABLE');
		const columns = wrapper.find(VirtualizedList.Content);
		expect(columns.length).toBe(4);
		columns.forEach((element) => {
			const eProps = element.props();
			if (eProps.label === 'Id') {
				expect(eProps.dataKey).toBe('id');
				expect(eProps.hideHeader).toBeUndefined();
			} else if (eProps.label === 'Label') {
				expect(eProps.dataKey).toBe('label');
				expect(eProps.hideHeader).toBeUndefined();
				expect(eProps.columnData.extra).toBe('Extra');
			} else if (eProps.label === 'Actions') {
				expect(eProps.dataKey).toBe('myactions');
				expect(eProps.hideHeader).toBe(false);
			} else if (eProps.label === 'ActionsHidden') {
				expect(eProps.dataKey).toBe('myactionshidden');
				expect(eProps.hideHeader).toBe(true);
			} else {
				expect(false).toBe(true);
			}
		});
	});

	it('should support displayMode', () => {
		const table = shallow(
			<ListToVirtualizedList {...props} displayMode="table" />
		).props();
		expect(table.type).toBe('TABLE');

		const large = shallow(
			<ListToVirtualizedList {...props} displayMode="large" />
		).props();
		expect(large.type).toBe('LARGE');
	});

	it('should add actionsKey to titleProps', () => {
		const wrapper = shallow(
			<ListToVirtualizedList {...props} />
		);
		wrapper.find(VirtualizedList.Content).forEach((element) => {
			const eProps = element.props();
			if (eProps.columnData) {
				expect(eProps.columnData.actionsKey).toBe('actions');
			}
		});
	});

	it('should find supposedActions based on items', () => {
		const wrapper = shallow(
			<ListToVirtualizedList {...props} />
		);
		wrapper.find(VirtualizedList.Content).forEach((element) => {
			const eProps = element.props();
			if (eProps.label === 'Actions') {
				expect(eProps.cellRenderer).toBe(CellActions.cellRenderer);
			}
		});
	});

	it('should adapt sort info', () => {
		// when
		const ascVirtualizedProps = shallow(
			<ListToVirtualizedList
				{...props}
				sort={{ field: 'name', isDescending: false }}
			/>
		).props();
		const descVirtualizedProps = shallow(
			<ListToVirtualizedList
				{...props}
				sort={{ field: 'name', isDescending: true }}
			/>
		).props();

		// then
		expect(ascVirtualizedProps.sortBy).toBe('name');
		expect(ascVirtualizedProps.sortDirection).toBe(SORT_BY.ASC);
		expect(descVirtualizedProps.sortDirection).toBe(SORT_BY.DESC);
	});

	it('should adapt sort onChange', () => {
		// given
		const onChange = jest.fn();
		const virtualizedProps = shallow(
			<ListToVirtualizedList
				{...props}
				sort={{ field: 'name', isDescending: false, onChange }}
			/>
		).props();

		// when
		virtualizedProps.sort({ sortBy: 'name', sortDirection: SORT_BY.DESC });

		// then
		expect(onChange).toBeCalledWith(null, { field: 'name', isDescending: true });
	});
});
