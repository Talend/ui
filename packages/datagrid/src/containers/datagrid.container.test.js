import React from 'react';
import { shallow } from 'enzyme';

import DataGridContainer from './datagrid.container';

describe('#DataGridContainer', () => {
	it('should render DataGridContainer', () => {
		const data = {};
		const wrapper = shallow(<DataGridContainer data={data} />);
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
		expect(wrapper.find('DataGrid').props().data).toBe(data);
		expect(DataGridContainer.displayName).toBe('Container(DataGrid)');
	});
});

describe('#DataGridContainer events', () => {
	it('should trigger onFocusedCell', () => {
		const dispatchActionCreator = jest.fn();
		const focusCellActionCreator = 'focus:cell';
		const onFocusedCell = jest.fn();
		const event = {};

		const wrapper = shallow(
			<DataGridContainer
				dispatchActionCreator={dispatchActionCreator}
				onFocusedCell={onFocusedCell}
				onFocusedCellActionCreator={focusCellActionCreator}
			/>,
		);

		wrapper
			.find('DataGrid')
			.props()
			.onFocusedCell(event);

		// then
		expect(dispatchActionCreator).toHaveBeenCalledWith(
			focusCellActionCreator,
			{},
			{
				props: {
					dispatchActionCreator,
					onFocusedCell,
					onFocusedCellActionCreator: focusCellActionCreator,
				},
			},
		);
		expect(onFocusedCell).toHaveBeenCalledWith(event);
	});

	it('should not trigger onFocusedCell', () => {
		const dispatchActionCreator = jest.fn();
		const event = {};
		const wrapper = shallow(<DataGridContainer dispatchActionCreator={dispatchActionCreator} />);

		wrapper
			.find('DataGrid')
			.props()
			.onFocusedCell(event);

		// then
		expect(dispatchActionCreator).not.toHaveBeenCalled();
	});

	it('should trigger onFocusedColum', () => {
		const dispatchActionCreator = jest.fn();
		const focusColumnActionCreator = 'focus:column';
		const onFocusedColumn = jest.fn();
		const event = {};

		const wrapper = shallow(
			<DataGridContainer
				dispatchActionCreator={dispatchActionCreator}
				onFocusedColumn={onFocusedColumn}
				onFocusedColumnActionCreator={focusColumnActionCreator}
			/>,
		);

		wrapper
			.find('DataGrid')
			.props()
			.onFocusedColumn(event);

		// then
		expect(dispatchActionCreator).toHaveBeenCalledWith(
			focusColumnActionCreator,
			{},
			{
				props: {
					dispatchActionCreator,
					onFocusedColumn,
					onFocusedColumnActionCreator: focusColumnActionCreator,
				},
			},
		);
		expect(onFocusedColumn).toHaveBeenCalledWith(event);
	});

	it('should not trigger onFocusedColum', () => {
		const dispatchActionCreator = jest.fn();
		const event = {};
		const wrapper = shallow(<DataGridContainer dispatchActionCreator={dispatchActionCreator} />);

		wrapper
			.find('DataGrid')
			.props()
			.onFocusedColumn(event);

		// then
		expect(dispatchActionCreator).not.toHaveBeenCalled();
	});
});
