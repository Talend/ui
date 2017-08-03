import React from 'react';
import { shallow } from 'enzyme';

import RowSelection from './RowSelection.component';

function RowRenderer(props) {
	return (<div {...props} />);
}

const selectedRowData = { id: 0 };
const notSelectedRowData = { id: 1 };
function isSelected(rowData) {
	return rowData === selectedRowData;
}
function isActive(rowData) {
	return rowData === selectedRowData;
}
function onRowClick(rowData) {
	return rowData === selectedRowData;
}

describe('RowSelection', () => {
	it('should enhance classname with selection class on selected row', () => {
		// given
		function getRowData() {
			return selectedRowData;
		}
		const Row = new RowSelection(RowRenderer, { isSelected, getRowData });

		// when
		const wrapper = shallow(
			<Row
				className={'my-class-names'}
				index={1}
				key={18}
				parent={{}}
				style={{ background: 'red' }}
			/>
		);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});

	it('should enhance classname without selection class on non selected row', () => {
		// given
		function getRowData() {
			return notSelectedRowData;
		}
		const Row = new RowSelection(RowRenderer, { isSelected, getRowData });

		// when
		const wrapper = shallow(
			<Row
				className={'my-class-names'}
				index={1}
				key={18}
				parent={{}}
				style={{ background: 'red' }}
			/>
		);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});

	it('should enhance classname with active class on row click', () => {
		// given
		function getRowData() {
			return selectedRowData;
		}
		const Row = new RowSelection(RowRenderer, { isActive, getRowData, onRowClick });

		// when
		const wrapper = shallow(
			<Row
				className={'my-class-names'}
				index={1}
				key={18}
				parent={{}}
				style={{ background: 'blue' }}
			/>
		);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});
});
