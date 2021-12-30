import React from 'react';
import keycode from 'keycode';
import { shallow } from 'enzyme';
import { JSDOM } from 'jsdom';

import { NAMESPACE_DATA, NAMESPACE_INDEX } from '../../constants';

import DataGrid, { injectHeaderRenderer, AG_GRID } from './DataGrid.component';

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
				type: [
					{
						'@talend-quality@': {
							0: 0,
							1: 38,
							'-1': 62,
							total: 100,
						},
						type: 'string',
						dqType: 'FR Commune',
						dqTypeKey: 'FR_COMMUNE',
					},
					{
						type: 'null',
						dqType: 'FR Commune',
						dqTypeKey: 'FR_COMMUNE',
					},
				],
			},
			{
				name: 'field1',
				doc: 'Code UIC',
				type: {
					'@talend-quality@': {
						0: 0,
						1: 100,
						'-1': 0,
						total: 100,
					},
					type: 'int',
					dqType: '',
					dqTypeKey: '',
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
	it('should render DataGrid', () => {
		const wrapper = shallow(<DataGrid getComponent={getComponent} />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should not call forceRedrawRows when the DataGrid is loading', () => {
		const forceRedrawRows = jest.fn(() => true);
		const wrapper = shallow(
			<DataGrid getComponent={getComponent} forceRedrawRows={forceRedrawRows} loading />,
		);

		wrapper.instance().componentDidUpdate({});
		expect(forceRedrawRows).not.toHaveBeenCalled();
	});

	it('should not call forceRedrawRows when the DataGrid is not ready', () => {
		const forceRedrawRows = jest.fn(() => true);
		const wrapper = shallow(
			<DataGrid getComponent={getComponent} forceRedrawRows={forceRedrawRows} />,
		);

		wrapper.instance().componentDidUpdate({});
		expect(forceRedrawRows).not.toHaveBeenCalled();
	});

	it('should call redrawRows when forceRedrawRows return true', () => {
		const forceRedrawRows = jest.fn(() => true);
		const redrawRows = jest.fn();
		const wrapper = shallow(
			<DataGrid getComponent={getComponent} forceRedrawRows={forceRedrawRows} rowData={[]} />,
		);

		wrapper.instance().onGridReady({
			api: {
				redrawRows,
			},
		});
		wrapper.instance().componentDidUpdate({});

		expect(forceRedrawRows).toHaveBeenCalled();
		expect(redrawRows).toHaveBeenCalled();
	});

	it('should not call redrawRows when forceRedrawRows return false', () => {
		const forceRedrawRows = jest.fn(() => false);
		const redrawRows = jest.fn();
		const wrapper = shallow(
			<DataGrid getComponent={getComponent} forceRedrawRows={forceRedrawRows} rowData={[]} />,
		);

		wrapper.instance().onGridReady({
			api: {
				redrawRows,
			},
		});
		wrapper.instance().componentDidUpdate({});

		expect(forceRedrawRows).toHaveBeenCalled();
		expect(redrawRows).not.toHaveBeenCalled();
	});

	it('should render DataGrid with columnsDefs and rowData', () => {
		const wrapper = shallow(<DataGrid getComponent={getComponent} data={sample} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render DataGrid with custom serializer', () => {
		const getPinnedColumnDefsFn = jest.fn();
		const getColumnDefsFn = jest.fn();
		const getRowDataFn = jest.fn();
		const getCellValueFn = jest.fn();

		const props = {
			columnsConf: {},
			data: sample,
			getComponent,
			getCellValueFn,
			getColumnDefsFn,
			getPinnedColumnDefsFn,
			getRowDataFn,
		};

		shallow(<DataGrid {...props} />);
		expect(getColumnDefsFn).toHaveBeenCalledWith(sample, props.columnsConf);
		expect(getPinnedColumnDefsFn).toHaveBeenCalledWith(sample);
		expect(getRowDataFn).toHaveBeenCalledWith(sample, 0);
	});

	it('should render one Skeleton is InProgress', () => {
		const wrapper = shallow(<DataGrid loading />);

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

		wrapper.instance().setGridInstance(element);

		expect(wrapper.instance().gridInstance).toBe(element);
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
		wrapper.instance().setGridInstance({
			[AG_GRID.ELEMENT]: gridElement,
		});

		wrapper.instance().removeFocusColumn();

		expect(gridElement.outerHTML).toBe(
			'<div class="grid-element"><div class=""></div><div class=""></div><div></div></div>',
		);
	});

	it('should set the focus on the column', () => {
		const { document } = new JSDOM(
			`<!DOCTYPE html><div class="grid-element"><div col-id="${NAMESPACE_DATA}colId"></div><div col-id="${NAMESPACE_DATA}colId"></div><div></div></div>`,
		).window;
		const gridElement = document.querySelector('.grid-element');
		const wrapper = shallow(<DataGrid getComponent={getComponent} />);
		const instance = wrapper.instance();
		instance.setGridInstance({
			[AG_GRID.ELEMENT]: gridElement,
		});
		instance.currentColId = `${NAMESPACE_DATA}colId`;

		wrapper.instance().updateStyleFocusColumn();

		expect(gridElement.outerHTML).toBe(
			`<div class="grid-element"><div col-id="${NAMESPACE_DATA}colId" class="column-focus"></div><div col-id="${NAMESPACE_DATA}colId" class="column-focus"></div><div></div></div>`,
		);
	});

	it('should not set the focus on the column when any defined column', () => {
		const { document } = new JSDOM(
			`<!DOCTYPE html><div class="grid-element"><div col-id="${NAMESPACE_DATA}colId"></div><div col-id="${NAMESPACE_DATA}colId"></div><div></div></div>`,
		).window;
		const gridElement = document.querySelector('.grid-element');
		const wrapper = shallow(<DataGrid getComponent={getComponent} />);
		const instance = wrapper.instance();
		instance.setGridInstance({
			[AG_GRID.ELEMENT]: gridElement,
		});

		wrapper.instance().updateStyleFocusColumn();

		expect(gridElement.outerHTML).toBe(
			`<div class="grid-element"><div col-id="${NAMESPACE_DATA}colId"></div><div col-id="${NAMESPACE_DATA}colId"></div><div></div></div>`,
		);
	});

	it('should not set the focus on the column when the selected column is an pinned column', () => {
		const { document } = new JSDOM(
			`<!DOCTYPE html><div class="grid-element"><div col-id="${NAMESPACE_DATA}colId"></div><div col-id="${NAMESPACE_DATA}colId"></div><div></div></div>`,
		).window;
		const gridElement = document.querySelector('.grid-element');
		const wrapper = shallow(<DataGrid getComponent={getComponent} />);
		const instance = wrapper.instance();
		instance.setGridInstance({
			[AG_GRID.ELEMENT]: gridElement,
		});
		instance.currentColId = `${NAMESPACE_INDEX}index`;

		wrapper.instance().updateStyleFocusColumn();

		expect(gridElement.outerHTML).toBe(
			`<div class="grid-element"><div col-id="${NAMESPACE_DATA}colId"></div><div col-id="${NAMESPACE_DATA}colId"></div><div></div></div>`,
		);
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
		const nextCellPosition = {
			rowIndex: 1,
		};

		const previousCellPosition = {
			rowIndex: 2,
		};

		wrapper
			.find('AgGridReact')
			.props()
			.onGridReady({ api });

		const nextFocusedCell = wrapper.instance().handleKeyboard({
			nextCellPosition,
			previousCellPosition,
		});

		expect(nextFocusedCell).toBe(nextCellPosition);
		expect(setSelected).toHaveBeenCalledWith(true, true);
	});

	it('should not manage the cells with keyboard if any nextCellPosition', () => {
		const setSelected = jest.fn();
		const api = {
			getDisplayedRowAtIndex() {
				return {
					setSelected,
				};
			},
		};
		const wrapper = shallow(<DataGrid getComponent={getComponent} />);
		const nextCellPosition = null;

		const previousCellPosition = {
			rowIndex: 2,
		};

		wrapper
			.find('AgGridReact')
			.props()
			.onGridReady({ api });

		const nextFocusedCell = wrapper.instance().handleKeyboard({
			nextCellPosition,
			previousCellPosition,
		});

		expect(nextFocusedCell).toBe(null);
		expect(setSelected).not.toHaveBeenCalled();
	});

	it('should not manage the cells with keyboard if any api', () => {
		const setSelected = jest.fn();
		const api = null;
		const wrapper = shallow(<DataGrid getComponent={getComponent} />);
		const nextCellPosition = {
			rowIndex: 1,
		};

		const previousCellPosition = {
			rowIndex: 2,
		};

		wrapper
			.find('AgGridReact')
			.props()
			.onGridReady({ api });

		const nextFocusedCell = wrapper.instance().handleKeyboard({
			nextCellPosition,
			previousCellPosition,
		});

		expect(nextFocusedCell).toBe(nextCellPosition);
		expect(setSelected).not.toHaveBeenCalled();
	});

	it('should set the current selected column from props', () => {
		const wrapper = shallow(<DataGrid getComponent={getComponent} focusedColumnId="field3" />);
		wrapper.instance().onFocusedColumn = jest.fn();
		wrapper.instance().onGridReady({ api: {} });

		expect(wrapper.instance().onFocusedColumn).toHaveBeenCalledWith('field3');
	});

	it('should update current selected column from props', () => {
		const wrapper = shallow(<DataGrid getComponent={getComponent} />);
		wrapper.instance().onFocusedColumn = jest.fn();
		wrapper.instance().onGridReady({ api: {} });

		wrapper.setProps({
			focusedColumnId: 'field2',
		});

		expect(wrapper.instance().onFocusedColumn).toHaveBeenCalledWith('field2');
	});

	it('should scroll to focused column', () => {
		const deselectAll = jest.fn();
		const clearFocusedCell = jest.fn();
		const ensureColumnVisible = jest.fn();
		const api = {
			deselectAll,
			clearFocusedCell,
			ensureColumnVisible,
		};
		const wrapper = shallow(<DataGrid getComponent={getComponent} focusedColumnId="field2" />);
		const instance = wrapper.instance();
		instance.setCurrentFocusedColumn = jest.fn();
		instance.setCurrentFocusedColumn = jest.fn();
		instance.removeFocusColumn = jest.fn();
		instance.updateStyleFocusColumn = jest.fn();
		instance.onGridReady({
			api,
		});

		expect(api.ensureColumnVisible).toHaveBeenCalled();
	});

	it('should focus a column', () => {
		const deselectAll = jest.fn();
		const clearFocusedCell = jest.fn();
		const api = {
			deselectAll,
			clearFocusedCell,
		};
		const currentColId = 'colId';
		const onFocusedColumn = jest.fn();
		const wrapper = shallow(
			<DataGrid getComponent={getComponent} onFocusedColumn={onFocusedColumn} />,
		);
		const instance = wrapper.instance();

		instance.setCurrentFocusedColumn = jest.fn();
		instance.removeFocusColumn = jest.fn();
		instance.updateStyleFocusColumn = jest.fn();

		wrapper
			.find('AgGridReact')
			.props()
			.onGridReady({ api });

		instance.onFocusedColumn(currentColId);

		expect(instance.setCurrentFocusedColumn).toHaveBeenCalledWith(currentColId);
		expect(instance.updateStyleFocusColumn).toHaveBeenCalled();
		expect(instance.removeFocusColumn).toHaveBeenCalled();
		expect(deselectAll).toHaveBeenCalled();
		expect(clearFocusedCell).toHaveBeenCalled();
		expect(onFocusedColumn).toHaveBeenCalledWith({ colId: currentColId });
	});

	it('should focus a column when an another column is focused', () => {
		const currentColId = 'colId';
		const focusedColId = 'colId2';
		const column = {
			colId: focusedColId,
			pinned: false,
		};
		const onFocusedCell = jest.fn();
		const wrapper = shallow(<DataGrid getComponent={getComponent} onFocusedCell={onFocusedCell} />);
		const instance = wrapper.instance();
		instance.setCurrentFocusedColumn(currentColId);

		instance.setCurrentFocusedColumn = jest.fn();
		instance.removeFocusColumn = jest.fn();
		instance.updateStyleFocusColumn = jest.fn();

		instance.onFocusedCell({
			column,
		});

		expect(instance.setCurrentFocusedColumn).toHaveBeenCalledWith(focusedColId);
		expect(instance.updateStyleFocusColumn).toHaveBeenCalled();
		expect(instance.removeFocusColumn).toHaveBeenCalled();
		expect(onFocusedCell).toHaveBeenCalledWith({ column });
	});

	it('should focus a column when an another column is focused and not call onFocusedCell if undefined', () => {
		const currentColId = 'colId';
		const focusedColId = 'colId2';
		const column = {
			colId: focusedColId,
			pinned: false,
		};
		const onFocusedCell = jest.fn();
		const wrapper = shallow(<DataGrid getComponent={getComponent} />);
		const instance = wrapper.instance();
		instance.setCurrentFocusedColumn(currentColId);

		instance.setCurrentFocusedColumn = jest.fn();
		instance.removeFocusColumn = jest.fn();
		instance.updateStyleFocusColumn = jest.fn();

		instance.onFocusedCell({
			column,
		});

		expect(instance.setCurrentFocusedColumn).toHaveBeenCalledWith(focusedColId);
		expect(instance.updateStyleFocusColumn).toHaveBeenCalled();
		expect(instance.removeFocusColumn).toHaveBeenCalled();
		expect(onFocusedCell).not.toHaveBeenCalled();
	});

	it('should focus a column when the same column is focused without remove the previous style', () => {
		const currentColId = 'colId';
		const column = {
			colId: currentColId,
			pinned: false,
		};
		const onFocusedCell = jest.fn();
		const wrapper = shallow(<DataGrid getComponent={getComponent} onFocusedCell={onFocusedCell} />);
		const instance = wrapper.instance();
		instance.setCurrentFocusedColumn(currentColId);

		instance.setCurrentFocusedColumn = jest.fn();
		instance.removeFocusColumn = jest.fn();
		instance.updateStyleFocusColumn = jest.fn();

		instance.onFocusedCell({
			column,
		});

		expect(instance.setCurrentFocusedColumn).toHaveBeenCalledWith(currentColId);
		expect(instance.updateStyleFocusColumn).toHaveBeenCalled();
		expect(instance.removeFocusColumn).not.toHaveBeenCalled();
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

		expect(instance.setCurrentFocusedColumn).not.toHaveBeenCalled();
		expect(instance.updateStyleFocusColumn).not.toHaveBeenCalled();
		expect(instance.removeFocusColumn).not.toHaveBeenCalled();
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
		expect(instance.updateStyleFocusColumn).not.toHaveBeenCalled();
		expect(instance.removeFocusColumn).toHaveBeenCalled();
		expect(onFocusedCell).not.toHaveBeenCalledWith({ column });
	});

	it('should focus on the first cell when DOWN is triggered', () => {
		const preventDefault = jest.fn();
		const setFocusedCell = jest.fn();
		const ensureIndexVisible = jest.fn();
		const api = {
			setFocusedCell,
			ensureIndexVisible,
		};
		const colId = 'colId';
		const wrapper = shallow(<DataGrid getComponent={getComponent} />);
		const instance = wrapper.instance();

		wrapper
			.find('AgGridReact')
			.props()
			.onGridReady({ api });

		instance.onKeyDownHeaderColumn(
			{
				keyCode: keycode('down'),
				preventDefault,
			},
			colId,
		);

		expect(setFocusedCell).toHaveBeenCalledWith(0, colId);
		expect(ensureIndexVisible).toHaveBeenCalledWith(0);
	});

	it('should not focus on the first cell when other key is triggered', () => {
		const preventDefault = jest.fn();
		const setFocusedCell = jest.fn();
		const ensureIndexVisible = jest.fn();
		const colId = 'colId';
		const wrapper = shallow(<DataGrid getComponent={getComponent} />);
		const instance = wrapper.instance();

		wrapper
			.find('AgGridReact')
			.props()
			.onGridReady({
				setFocusedCell,
				ensureIndexVisible,
			});

		instance.onKeyDownHeaderColumn(
			{
				keyCode: keycode('up'),
				preventDefault,
			},
			colId,
		);

		expect(setFocusedCell).not.toHaveBeenCalledWith(0, colId);
		expect(ensureIndexVisible).not.toHaveBeenCalledWith(0);
	});

	it('should trigger an event when the grid scroll vertical', () => {
		const firstIndex = 0;
		const lastIndex = 20;
		const event = {
			direction: AG_GRID.SCROLL_VERTICAL_DIRECTION,
		};
		const api = {
			getFirstDisplayedRow: () => firstIndex,
			getLastDisplayedRow: () => lastIndex,
		};
		const onVerticalScroll = jest.fn();
		const wrapper = shallow(
			<DataGrid getComponent={getComponent} onVerticalScroll={onVerticalScroll} />,
		);
		const instance = wrapper.instance();

		wrapper
			.find('AgGridReact')
			.props()
			.onGridReady({
				api,
			});

		instance.onBodyScroll(event);

		expect(onVerticalScroll).toHaveBeenCalledWith(event, {
			firstDisplayedRowIndex: firstIndex,
			lastDisplayedRowIndex: lastIndex,
		});
	});

	it('should not trigger an event when the grid scroll horizontal', () => {
		const event = {
			direction: 'horizontal',
		};
		const onVerticalScroll = jest.fn();
		const wrapper = shallow(
			<DataGrid getComponent={getComponent} onVerticalScroll={onVerticalScroll} />,
		);
		const instance = wrapper.instance();

		instance.onBodyScroll(event);

		expect(onVerticalScroll).not.toHaveBeenCalled();
	});
});

describe('#injectHeaderRenderer', () => {
	const Component = () => {};
	const onFocusedColumn = jest.fn();
	const onKeyDown = jest.fn();

	it('should injected the header renderer', () => {
		const getCellComponent = jest.fn(() => Component);
		const componentId = 'header';
		const InjectedComponent = injectHeaderRenderer(
			getCellComponent,
			'header',
			onFocusedColumn,
			onKeyDown,
		);

		const wrapper = shallow(<InjectedComponent id="injectedComponent" myProps="myProps" />);
		wrapper.props().onFocusedColumn();
		wrapper.props().onKeyDown();

		expect(wrapper.props().myProps).toBe('myProps');
		expect(getCellComponent).toHaveBeenCalledWith(componentId);
		expect(onFocusedColumn).toHaveBeenCalled();
		expect(onKeyDown).toHaveBeenCalled();
	});

	it('should injected the default header renderer', () => {
		const InjectedComponent = injectHeaderRenderer(null, 'header', onFocusedColumn);

		const wrapper = shallow(<InjectedComponent id="injectedComponent" />);

		expect(wrapper.find('DefaultHeaderRenderer').length).toBe(1);
	});
});

describe('#forceRedraw', () => {
	it('should not call forceRedrawRows when the DataGrid is loading', () => {
		const forceRedrawRows = jest.fn(() => true);
		const wrapper = shallow(
			<DataGrid getComponent={getComponent} forceRedrawRows={forceRedrawRows} loading />,
		);

		wrapper.instance().componentDidUpdate({});
		expect(forceRedrawRows).not.toHaveBeenCalled();
	});

	it('should not call forceRedrawRows when the DataGrid is not ready', () => {
		const forceRedrawRows = jest.fn(() => true);
		const wrapper = shallow(
			<DataGrid getComponent={getComponent} forceRedrawRows={forceRedrawRows} />,
		);

		wrapper.instance().componentDidUpdate({});
		expect(forceRedrawRows).not.toHaveBeenCalled();
	});

	it('should call redrawRows when forceRedrawRows return true', () => {
		const forceRedrawRows = jest.fn(() => true);
		const redrawRows = jest.fn();
		const wrapper = shallow(
			<DataGrid getComponent={getComponent} forceRedrawRows={forceRedrawRows} rowData={[]} />,
		);

		wrapper.instance().onGridReady({
			api: {
				redrawRows,
			},
		});
		wrapper.instance().componentDidUpdate({});

		expect(forceRedrawRows).toHaveBeenCalled();
		expect(redrawRows).toHaveBeenCalled();
	});

	it('should not call redrawRows when forceRedrawRows return false', () => {
		const forceRedrawRows = jest.fn(() => false);
		const redrawRows = jest.fn();
		const wrapper = shallow(
			<DataGrid getComponent={getComponent} forceRedrawRows={forceRedrawRows} rowData={[]} />,
		);

		wrapper.instance().onGridReady({
			api: {
				redrawRows,
			},
		});
		wrapper.instance().componentDidUpdate({});

		expect(forceRedrawRows).toHaveBeenCalled();
		expect(redrawRows).not.toHaveBeenCalled();
	});
});
