import React from 'react';
import { shallow } from 'enzyme';
import { JSDOM } from 'jsdom';

import { NAMESPACE_SAMPLE, NAMESPACE_INDEX } from './constants';

import DataGrid, { injectedCellRenderer, injectedHeaderRenderer } from './datagrid.component';

function PinHeaderRenderer() {}

function getComponent() {
	return PinHeaderRenderer;
}

const sample = {
	schema: {
		type: 'record',
		name: 'StringArrayRecord',
		fields: [
			{
				name: 'field0',
				doc: 'Nom de la gare',
				type: {
					type: 'string',
					dqType: 'FR Commune',
					dqTypeKey: 'FR_COMMUNE',
				},
				'@talend-quality@': {
					0: 0,
					1: 38,
					'-1': 62,
				},
			},
			{
				name: 'field1',
				doc: 'Code UIC',
				type: {
					type: 'int',
					dqType: '',
					dqTypeKey: '',
				},
				'@talend-quality@': {
					0: 0,
					1: 100,
					'-1': 0,
				},
			},
		],
	},
	data: [
		{
			value: {
				field2: {
					value: '95716',
					quality: 1,
				},
				field8: {
					value: '10771660',
					quality: 0,
				},
				field5: {
					value: '33929307',
					quality: -1,
				},
				field4: {
					value: '10748798',
					quality: 1,
				},
				field7: {
					value: '11030795',
					quality: 1,
				},
				field3: {
					value: '',
					quality: 1,
				},
				field1: {
					value: '271494',
					quality: 1,
				},
				field0: {
					value: 'Aéroport Charles de Gaulle 2 TGV',
					quality: 1,
				},
				field9: {
					value: '10880464',
					quality: 1,
				},
				field6: {
					value: '10920487',
					quality: 1,
				},
			},
			quality: 1,
		},
		{
			value: {
				field4: {
					value: '9560',
					quality: 1,
				},
				field2: {
					value: '2190',
					quality: 1,
				},
				field1: {
					value: '171702',
					quality: 0,
				},
				field3: {
					value: 'c',
					quality: -1,
				},
				field0: {
					value: 'Aguilcourt-Variscourt',
					quality: 1,
				},
				field9: {
					value: '',
					quality: -1,
				},
				field7: {
					value: '',
					quality: 0,
				},
				field5: {
					value: '',
					quality: 0,
				},
				field6: {
					value: '9812',
					quality: 1,
				},
				field8: {
					value: '8919',
					quality: 1,
				},
			},
			quality: 1,
		},
	],
	encoding: 'JSON',
	'@talend-quality@': {
		0: 30,
		1: 62,
		'-1': 7,
	},
};

jest.mock('react-dom', () => ({
	findDOMNode(mockRef) {
		return mockRef;
	},
}));

describe('#DataGrid', () => {
	it('should render DefaultDateCellRenderer', () => {
		const wrapper = shallow(<DataGrid getComponent={getComponent} />);
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render DefaultDateCellRenderer with columnsDefs and rowData', () => {
		const wrapper = shallow(<DataGrid getComponent={getComponent} data={sample} />);
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});

describe('#AgGrid API', () => {
	it('should set the AgGrid API when the ag-grid is loaded', () => {
		const api = {};
		const wrapper = shallow(<DataGrid getComponent={getComponent} />);

		wrapper
			.find('AgGridReact')
			.props()
			.onGridReady({ api });

		expect(wrapper.instance().gridAPI).toBe(api);
	});
});

describe('#Datagrid method', () => {
	it('should set the current grid ref', () => {
		const element = {};
		const wrapper = shallow(<DataGrid getComponent={getComponent} />);

		wrapper.instance().setGridElement(element);

		expect(wrapper.instance().gridElement).toBe(element);
	});

	it('should set the current selected column', () => {
		const currentColumn = 'colId';
		const wrapper = shallow(<DataGrid getComponent={getComponent} />);

		wrapper.instance().setCurrentFocusedColumn(currentColumn);

		expect(wrapper.instance().currentColId).toBe(currentColumn);
	});

	it('should remove the focus on the column', () => {
		const { document } = new JSDOM(
			'<!DOCTYPE html><div class="grid-element"><div class="column-focus"></div><div class="column-focus"></div><div></div></div>',
		).window;
		const gridElement = document.querySelector('.grid-element');
		const wrapper = shallow(<DataGrid getComponent={getComponent} />);
		wrapper.instance().setGridElement(gridElement);

		// when
		wrapper.instance().removeFocusColumn();

		// then
		expect(gridElement.outerHTML).toBe(
			'<div class="grid-element"><div class=""></div><div class=""></div><div></div></div>',
		);
	});

	it('should set the focus on the column', () => {
		const { document } = new JSDOM(
			`<!DOCTYPE html><div class="grid-element"><div col-id="${NAMESPACE_SAMPLE}colId"></div><div col-id="${NAMESPACE_SAMPLE}colId"></div><div></div></div>`,
		).window;
		const gridElement = document.querySelector('.grid-element');
		const wrapper = shallow(<DataGrid getComponent={getComponent} />);
		const instance = wrapper.instance();
		instance.setGridElement(gridElement);
		instance.currentColId = `${NAMESPACE_SAMPLE}colId`;
		instance.removeFocusColumn = jest.fn();

		// when
		wrapper.instance().updateStyleFocusColumn();

		// then
		expect(gridElement.outerHTML).toBe(
			`<div class="grid-element"><div col-id="${NAMESPACE_SAMPLE}colId" class="column-focus"></div><div col-id="${NAMESPACE_SAMPLE}colId" class="column-focus"></div><div></div></div>`,
		);
		expect(instance.removeFocusColumn).toHaveBeenCalled();
	});

	it('should not set the focus on the column when any defined column', () => {
		const { document } = new JSDOM(
			`<!DOCTYPE html><div class="grid-element"><div col-id="${NAMESPACE_SAMPLE}colId"></div><div col-id="${NAMESPACE_SAMPLE}colId"></div><div></div></div>`,
		).window;
		const gridElement = document.querySelector('.grid-element');
		const wrapper = shallow(<DataGrid getComponent={getComponent} />);
		const instance = wrapper.instance();
		instance.setGridElement(gridElement);
		instance.removeFocusColumn = jest.fn();

		// when
		wrapper.instance().updateStyleFocusColumn();

		// then
		expect(gridElement.outerHTML).toBe(
			`<div class="grid-element"><div col-id="${NAMESPACE_SAMPLE}colId"></div><div col-id="${NAMESPACE_SAMPLE}colId"></div><div></div></div>`,
		);
		expect(instance.removeFocusColumn).toHaveBeenCalled();
	});

	it('should not set the focus on the column when the selected column is an pinned column', () => {
		const { document } = new JSDOM(
			`<!DOCTYPE html><div class="grid-element"><div col-id="${NAMESPACE_SAMPLE}colId"></div><div col-id="${NAMESPACE_SAMPLE}colId"></div><div></div></div>`,
		).window;
		const gridElement = document.querySelector('.grid-element');
		const wrapper = shallow(<DataGrid getComponent={getComponent} />);
		const instance = wrapper.instance();
		instance.setGridElement(gridElement);
		instance.currentColId = `${NAMESPACE_INDEX}index`;
		instance.removeFocusColumn = jest.fn();

		// when
		wrapper.instance().updateStyleFocusColumn();

		// then
		expect(gridElement.outerHTML).toBe(
			`<div class="grid-element"><div col-id="${NAMESPACE_SAMPLE}colId"></div><div col-id="${NAMESPACE_SAMPLE}colId"></div><div></div></div>`,
		);
		expect(instance.removeFocusColumn).toHaveBeenCalled();
	});

	it('should manage the cells with keyboard', () => {
		const setSelected = jest.fn();
		const api = {
			getDisplayedRowAtIndex() {
				return {
					setSelected,
				};
			},
		};
		const wrapper = shallow(<DataGrid getComponent={getComponent} />);
		const nextCellDef = {
			rowIndex: 1,
		};

		const previousCellDef = {
			rowIndex: 2,
		};

		wrapper
			.find('AgGridReact')
			.props()
			.onGridReady({ api });

		const nextFocusedCell = wrapper.instance().handleKeyboard({
			nextCellDef,
			previousCellDef,
		});

		expect(nextFocusedCell).toBe(nextCellDef);
		expect(setSelected).toHaveBeenCalledWith(true, true);
	});

	it('should not manage the cells with keyboard if any nextCellDef', () => {
		const setSelected = jest.fn();
		const api = {
			getDisplayedRowAtIndex() {
				return {
					setSelected,
				};
			},
		};
		const wrapper = shallow(<DataGrid getComponent={getComponent} />);
		const nextCellDef = null;

		const previousCellDef = {
			rowIndex: 2,
		};

		wrapper
			.find('AgGridReact')
			.props()
			.onGridReady({ api });

		const nextFocusedCell = wrapper.instance().handleKeyboard({
			nextCellDef,
			previousCellDef,
		});

		expect(nextFocusedCell).toBe(null);
		expect(setSelected).not.toHaveBeenCalledWith();
	});

	it('should not manage the cells with keyboard if any api', () => {
		const setSelected = jest.fn();
		const api = null;
		const wrapper = shallow(<DataGrid getComponent={getComponent} />);
		const nextCellDef = {
			rowIndex: 1,
		};

		const previousCellDef = {
			rowIndex: 2,
		};

		wrapper
			.find('AgGridReact')
			.props()
			.onGridReady({ api });

		const nextFocusedCell = wrapper.instance().handleKeyboard({
			nextCellDef,
			previousCellDef,
		});

		expect(nextFocusedCell).toBe(nextCellDef);
		expect(setSelected).not.toHaveBeenCalledWith();
	});

	it('should focus a column and the first cell', () => {
		const getFocusedCell = jest.fn();
		const setFocusedCell = jest.fn();
		const api = {
			getFocusedCell,
			setFocusedCell,
		};
		const onFocusedColumn = jest.fn();
		const currentColId = 'colId';
		const wrapper = shallow(
			<DataGrid getComponent={getComponent} onFocusedColumn={onFocusedColumn} />,
		);
		const instance = wrapper.instance();

		instance.setCurrentFocusedColumn = jest.fn();
		instance.updateStyleFocusColumn = jest.fn();

		wrapper
			.find('AgGridReact')
			.props()
			.onGridReady({ api });

		instance.onFocusedColumn(currentColId);

		expect(instance.setCurrentFocusedColumn).toHaveBeenCalledWith(currentColId);
		expect(instance.updateStyleFocusColumn).toHaveBeenCalledWith();
		expect(setFocusedCell).toHaveBeenCalledWith(0, currentColId);
		expect(onFocusedColumn).toHaveBeenCalledWith(currentColId);
	});

	it('should focus a column and one cell one the current selected row', () => {
		const rowIndex = 1;
		const getFocusedCell = jest.fn(() => ({
			rowIndex,
		}));
		const setFocusedCell = jest.fn();
		const api = {
			getFocusedCell,
			setFocusedCell,
		};
		const onFocusedColumn = jest.fn();
		const currentColId = 'colId';
		const wrapper = shallow(
			<DataGrid getComponent={getComponent} onFocusedColumn={onFocusedColumn} />,
		);
		const instance = wrapper.instance();

		instance.setCurrentFocusedColumn = jest.fn();
		instance.updateStyleFocusColumn = jest.fn();

		wrapper
			.find('AgGridReact')
			.props()
			.onGridReady({ api });

		instance.onFocusedColumn(currentColId);

		expect(instance.setCurrentFocusedColumn).toHaveBeenCalledWith(currentColId);
		expect(instance.updateStyleFocusColumn).toHaveBeenCalledWith();
		expect(setFocusedCell).toHaveBeenCalledWith(rowIndex, currentColId);
		expect(onFocusedColumn).toHaveBeenCalledWith(currentColId);
	});

	it('should focus a column when a cell is focused', () => {
		const currentColId = 'colId';
		const column = {
			colId: currentColId,
			pinned: false,
		};
		const onFocusedCell = jest.fn();
		const wrapper = shallow(<DataGrid getComponent={getComponent} onFocusedCell={onFocusedCell} />);
		const instance = wrapper.instance();

		instance.setCurrentFocusedColumn = jest.fn();
		instance.removeFocusColumn = jest.fn();
		instance.updateStyleFocusColumn = jest.fn();

		instance.onFocusedCell({
			column,
		});

		expect(instance.setCurrentFocusedColumn).toHaveBeenCalledWith(currentColId);
		expect(instance.updateStyleFocusColumn).toHaveBeenCalledWith();
		expect(instance.removeFocusColumn).not.toHaveBeenCalledWith();
		expect(onFocusedCell).toHaveBeenCalledWith({ column });
	});

	it('should not focus a column when there is no column', () => {
		const column = null;
		const onFocusedCell = jest.fn();
		const wrapper = shallow(<DataGrid getComponent={getComponent} onFocusedCell={onFocusedCell} />);
		const instance = wrapper.instance();

		instance.setCurrentFocusedColumn = jest.fn();
		instance.removeFocusColumn = jest.fn();
		instance.updateStyleFocusColumn = jest.fn();

		instance.onFocusedCell({
			column,
		});

		expect(instance.setCurrentFocusedColumn).not.toHaveBeenCalledWith();
		expect(instance.updateStyleFocusColumn).not.toHaveBeenCalledWith();
		expect(instance.removeFocusColumn).not.toHaveBeenCalledWith();
		expect(onFocusedCell).not.toHaveBeenCalledWith({ column });
	});

	it('should not focus a column when the selected column is pinned', () => {
		const currentColId = 'colId';
		const column = {
			colId: currentColId,
			pinned: true,
		};
		const onFocusedCell = jest.fn();
		const wrapper = shallow(<DataGrid getComponent={getComponent} onFocusedCell={onFocusedCell} />);
		const instance = wrapper.instance();

		instance.setCurrentFocusedColumn = jest.fn();
		instance.removeFocusColumn = jest.fn();
		instance.updateStyleFocusColumn = jest.fn();

		instance.onFocusedCell({
			column,
		});

		expect(instance.setCurrentFocusedColumn).toHaveBeenCalledWith(currentColId);
		expect(instance.updateStyleFocusColumn).not.toHaveBeenCalledWith();
		expect(instance.removeFocusColumn).toHaveBeenCalledWith();
		expect(onFocusedCell).not.toHaveBeenCalledWith({ column });
	});
});

describe('#injectedCellRenderer', () => {
	const Component = () => {};
	const avroRenderer = {};

	it('should injected the cell renderer', () => {
		const InjectedComponent = injectedCellRenderer(
			componentId => {
				if (componentId === 'header') return Component;
				return null;
			},
			'header',
			avroRenderer,
		);

		const wrapper = shallow(<InjectedComponent id="injectedComponent" />);

		expect(wrapper.getElement()).toMatchSnapshot();
		expect(wrapper.props().avroRenderer).toBe(avroRenderer);
	});
});

describe('#injectedHeaderRenderer', () => {
	const Component = () => {};
	const onFocusedColumn = jest.fn();

	it('should injected the header renderer', () => {
		const InjectedComponent = injectedHeaderRenderer(
			componentId => {
				if (componentId === 'header') return Component;
				return null;
			},
			'header',
			onFocusedColumn,
		);

		const wrapper = shallow(<InjectedComponent id="injectedComponent" />);
		wrapper.props().onFocusedColumn();

		expect(wrapper.getElement()).toMatchSnapshot();
		expect(onFocusedColumn).toHaveBeenCalled();
	});
});
