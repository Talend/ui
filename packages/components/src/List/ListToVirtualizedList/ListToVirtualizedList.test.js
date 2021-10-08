import React from 'react';
import { shallow } from 'enzyme';
import cloneDeep from 'lodash/cloneDeep';

import VirtualizedList from '../../VirtualizedList';
import {
	ListToVirtualizedList,
	HiddenHeader,
	compareOrder,
} from './ListToVirtualizedList.component';

const props = {
	id: 'mylistid',
	items: [{ id: 3, label: 'my item', myactions: [{ foo: 'bar' }] }],
	columns: [
		{ key: 'id', label: 'Id', type: 'customType', header: 'customType' },
		{ key: 'label', label: 'Label', disableSort: true },
		{ key: 'tag', label: 'Tag', type: 'badge' },
		{ key: 'myactions', label: 'Actions', hideHeader: true },
	],
	titleProps: {
		key: 'label',
		extra: 'Extra',
	},
};

describe('ListToVirtualizedList', () => {
	it('should map props', () => {
		const wrapper = shallow(<ListToVirtualizedList {...props} />);
		expect(wrapper.props().collection).toBe(props.items);
		expect(wrapper.props().type).toBe('TABLE');
		const columns = wrapper.find(VirtualizedList.Content);
		expect(columns.length).toBe(4);
		columns.forEach(element => {
			const eProps = element.props();
			if (eProps.label === 'Id') {
				expect(eProps.dataKey).toBe('id');
			} else if (eProps.label === 'Label') {
				expect(eProps.dataKey).toBe('label');
				expect(eProps.columnData.extra).toBe('Extra');
			} else if (eProps.label === 'Actions') {
				expect(eProps.dataKey).toBe('myactions');
				expect(eProps.disableSort).toBe(true);
				expect(eProps.headerRenderer).toBe(HiddenHeader);
			} else if (eProps.label === 'Tag') {
				expect(eProps.dataKey).toBe('tag');
			} else {
				expect(false).toBe(true);
			}
		});
	});

	it('should support defaultHeight', () => {
		const rProps = { ...props, defaultHeight: 300 };
		const table = shallow(<ListToVirtualizedList {...rProps} displayMode="table" />).props();
		expect(table.defaultHeight).toBe(300);
	});

	it('should support displayMode', () => {
		const table = shallow(<ListToVirtualizedList {...props} displayMode="table" />).props();
		expect(table.type).toBe('TABLE');

		const large = shallow(<ListToVirtualizedList {...props} displayMode="large" />).props();
		expect(large.type).toBe('LARGE');
	});

	it('should support rowHeight', () => {
		const rProps = { ...props, rowHeight: 200 };
		const table = shallow(<ListToVirtualizedList {...rProps} displayMode="table" />).props();
		expect(table.rowHeight).toBe(200);
	});

	it('columns should have disableSort prop to true if hideHeader or disableSort is true', () => {
		const table = shallow(<ListToVirtualizedList {...props} />);
		const columns = table.find(VirtualizedList.Content);
		columns.forEach(element => {
			const eProps = element.props();
			if (eProps.label === 'Label' || eProps.label === 'Actions') {
				expect(eProps.disableSort).toBeTruthy();
			} else {
				expect(eProps.disableSort).toBeFalsy();
			}
		});
	});

	it('should add actionsKey to titleProps', () => {
		// when
		const wrapper = shallow(<ListToVirtualizedList {...props} />);

		// then
		wrapper.find(VirtualizedList.Content).forEach(element => {
			const eProps = element.props();
			if (eProps.columnData) {
				expect(eProps.columnData.actionsKey).toBe('actions');
			}
		});
	});

	it('should NOT add actionsKey without titleProps', () => {
		// when
		const wrapper = shallow(<ListToVirtualizedList {...props} titleProps={undefined} />);

		// then
		wrapper.find(VirtualizedList.Content).forEach(element => {
			const eProps = element.props();
			if (eProps.columnData) {
				expect(eProps.columnData.actionsKey).toBe('actions');
			}
		});
	});

	it('should find supposedActions based on items', () => {
		// when
		const wrapper = shallow(<ListToVirtualizedList {...props} />);
		const CellActions = VirtualizedList.cellDictionary.actions;

		// then
		wrapper.find(VirtualizedList.Content).forEach(element => {
			const eProps = element.props();
			if (eProps.label === 'Actions') {
				expect(eProps.cellRenderer).toBe(CellActions.cellRenderer);
			}
		});
	});

	it('should support multiple cell renderers through column type', () => {
		const wrapper = shallow(<ListToVirtualizedList {...props} />);
		const CellBadge = VirtualizedList.cellDictionary.badge;

		// then
		wrapper.find(VirtualizedList.Content).forEach(element => {
			const eProps = element.props();
			if (eProps.label === 'Tag') {
				expect(eProps.cellRenderer).toBe(CellBadge.cellRenderer);
			}
		});
	});

	it('should support custom cell renderer', () => {
		const renderer = function test() {
			return 'ok';
		};
		const customDictionary = { customType: { cellRenderer: renderer } };
		const wrapper = shallow(<ListToVirtualizedList {...props} cellDictionary={customDictionary} />);

		// then
		const column = wrapper.find(VirtualizedList.Content).find({ label: 'Id' });
		expect(column.props().cellRenderer).toBe(renderer);
	});

	it('should support custom header renderer', () => {
		const renderer = function test() {
			return 'ok';
		};
		const customHeaderDictionary = { customType: { headerRenderer: renderer } };
		const wrapper = shallow(
			<ListToVirtualizedList {...props} headerDictionary={customHeaderDictionary} />,
		);

		// then
		const column = wrapper.find(VirtualizedList.Content).find({ label: 'Id' });
		expect(column.props().headerRenderer).toBe(renderer);
	});

	it('should support column hide feature', () => {
		const hideProps = cloneDeep(props);
		hideProps.columns.find(column => column.label === 'Tag').hidden = true;
		const wrapper = shallow(<ListToVirtualizedList {...hideProps} />);

		// then
		const columnId = wrapper.find(VirtualizedList.Content).find({ label: 'Id' });
		const columnTag = wrapper.find(VirtualizedList.Content).find({ label: 'Tag' });
		expect(columnId.length).toBe(1);
		expect(columnTag.length).toBe(0);
	});

	it('should adapt sort info', () => {
		// when
		const ascVirtualizedProps = shallow(
			<ListToVirtualizedList {...props} sort={{ field: 'name', isDescending: false }} />,
		).props();
		const descVirtualizedProps = shallow(
			<ListToVirtualizedList {...props} sort={{ field: 'name', isDescending: true }} />,
		).props();

		// then
		expect(ascVirtualizedProps.sortBy).toBe('name');
		expect(ascVirtualizedProps.sortDirection).toBe(VirtualizedList.SORT_BY.ASC);
		expect(descVirtualizedProps.sortDirection).toBe(VirtualizedList.SORT_BY.DESC);
	});

	it('should adapt sort onChange', () => {
		// given
		const onChange = jest.fn();
		const virtualizedProps = shallow(
			<ListToVirtualizedList {...props} sort={{ field: 'name', isDescending: false, onChange }} />,
		).props();

		// when
		virtualizedProps.sort({ sortBy: 'name', sortDirection: VirtualizedList.SORT_BY.DESC });

		// then
		expect(onChange).toBeCalledWith(null, { field: 'name', isDescending: true });
	});

	it('should adapt selection isSelected', () => {
		// given
		const isSelected = jest.fn();
		const virtualizedProps = shallow(
			<ListToVirtualizedList {...props} itemProps={{ isSelected }} />,
		).props();

		// when
		virtualizedProps.isSelected(props.items[0]);

		// then
		expect(isSelected).toBeCalledWith(props.items[0]);
	});

	it('should adapt selection onToggle', () => {
		// given
		const onToggle = jest.fn();
		const event = { target: {} };
		const virtualizedProps = shallow(
			<ListToVirtualizedList {...props} itemProps={{ onToggle }} />,
		).props();

		// when
		virtualizedProps.selectionToggle(event, props.items[0]);

		// then
		expect(onToggle).toBeCalledWith(event, props.items[0]);
	});

	it('should adapt click onRowClick', () => {
		// given
		const onRowClick = jest.fn();
		const event = { target: {} };
		const virtualizedProps = shallow(
			<ListToVirtualizedList {...props} itemProps={{ onRowClick }} />,
		).props();

		// when
		virtualizedProps.onRowClick(event, props.items[0]);

		// then
		expect(onRowClick).toBeCalledWith(event, props.items[0]);
	});

	it('should adapt click onRowDoubleClick', () => {
		// given
		props.titleProps.onClick = jest.fn();
		const event = { target: {} };
		const virtualizedProps = shallow(<ListToVirtualizedList {...props} />).props();

		// when
		virtualizedProps.onRowDoubleClick(event, props.items[0]);

		// then
		expect(props.titleProps.onClick).toBeCalledWith(event, props.items[0]);
	});

	it('should adapt selection isActive', () => {
		// given
		const isActive = jest.fn();
		const virtualizedProps = shallow(
			<ListToVirtualizedList {...props} itemProps={{ isActive }} />,
		).props();

		// when
		virtualizedProps.isActive(props.items[0]);

		// then
		expect(isActive).toBeCalledWith(props.items[0]);
	});

	describe('compareOrder function', () => {
		it('should return -1 to keep the lower order first', () => {
			// given
			const a = { order: 0 };
			const b = { order: 1 };
			// when
			const result = compareOrder(a, b);
			// then
			expect(result).toBe(-1);
		});

		it('should return 0 if there is no order set between 2 items', () => {
			// given
			const a = {};
			const b = {};
			// when
			const result = compareOrder(a, b);
			// then
			expect(result).toBe(0);
		});

		it('should return -1 if there is only a to pass an order to push b to the end', () => {
			// given
			const a = { order: 1 };
			const b = {};
			// when
			const result = compareOrder(a, b);
			// then
			expect(result).toBe(-1);
		});
		it('should return 1 if there is only b to pass an order to push a to the end', () => {
			// given
			const a = {};
			const b = { order: 1 };
			// when
			const result = compareOrder(a, b);
			// then
			expect(result).toBe(1);
		});
	});
});
