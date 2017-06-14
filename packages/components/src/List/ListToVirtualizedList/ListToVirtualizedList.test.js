import React from 'react';
import { shallow } from 'enzyme';

import VirtualizedList from '../../VirtualizedList';
import ListToVirtualizedList from './ListToVirtualizedList.component';
import CellActions from '../../VirtualizedList/CellActions';

const props = {
	id: 'mylistid',
	items: [{ id: 3, label: 'my item', myactions: [{ foo: 'bar' }] }],
	columns: [
		{ key: 'id', label: 'Id' },
		{ key: 'label', label: 'Label' },
		{ key: 'myactions', label: 'Actions' },
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
		expect(columns.length).toBe(3);
		columns.forEach((element) => {
			const eProps = element.props();
			if (eProps.label === 'Id') {
				expect(eProps.dataKey).toBe('id');
			} else if (eProps.label === 'Label') {
				expect(eProps.dataKey).toBe('label');
				expect(eProps.columnData.extra).toBe('Extra');
			} else if (eProps.label === 'Actions') {
				expect(eProps.dataKey).toBe('myactions');
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
	it('should find suposedActions based on items', () => {
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
});
