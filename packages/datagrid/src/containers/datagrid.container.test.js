import React from 'react';
import { shallow } from 'enzyme';

import DataGridContainer from './datagrid.container';

describe('#DataGridContainer', () => {
	it('should render DataGridContainer', () => {
		const sourceData = {};
		const wrapper = shallow(<DataGridContainer sourceData={sourceData} />);
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
		expect(wrapper.find('DataGrid').props().data).toBe(sourceData);
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
				actionCreators={{
					onFocusedCell: focusCellActionCreator,
				}}
				dispatchActionCreator={dispatchActionCreator}
				onFocusedCell={onFocusedCell}
			/>,
		);

		wrapper
			.find('DataGrid')
			.props()
			.onFocusedCell(event);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
		expect(dispatchActionCreator).toHaveBeenCalledWith(
			focusCellActionCreator,
			{},
			{
				props: {
					actionCreators: { onFocusedCell: focusCellActionCreator },
					dispatchActionCreator,
					onFocusedCell,
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
				actionCreators={{
					onFocusedColumn: focusColumnActionCreator,
				}}
				dispatchActionCreator={dispatchActionCreator}
				onFocusedColumn={onFocusedColumn}
			/>,
		);

		wrapper
			.find('DataGrid')
			.props()
			.onFocusedColumn(event);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
		expect(dispatchActionCreator).toHaveBeenCalledWith(
			focusColumnActionCreator,
			{},
			{
				props: {
					actionCreators: { onFocusedColumn: focusColumnActionCreator },
					dispatchActionCreator,
					onFocusedColumn,
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
