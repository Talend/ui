import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid/dist/styles/ag-grid.css';
import theme from './grid.scss';

// import CellRenderer from './CellRenderer';
// import CustomHeader from './CustomHeader';

export default function Grid(props) {
	const containerStyle = {
		height: 800,
	};

	// by default, ag-grid hide the column when the user drag outside the column
	const agGridOptions = {
		columnDefs: props.columnDefs,
		headerHeight: props.headerHeight,
		rowData: props.rowData,
		rowHeight: props.rowHeight,
		suppressDragLeaveHidesColumns: true,
		rowSelection: props.rowSelection,
	};

	if (props.renderers) {
		agGridOptions.frameworkComponents = {
			...props.renderers,
		};
	}

	return (
		<div>
			<div style={containerStyle} className={classNames(theme.grid)}>
				<AgGridReact {...agGridOptions} />
			</div>
		</div>
	);
}

Grid.propTypes = {
	rowSelection: PropTypes.string,
	headerHeight: PropTypes.number,
	rowHeight: PropTypes.number,
	renderers: PropTypes.object,
	rowData: PropTypes.arrayOf(PropTypes.object),
	columnDefs: PropTypes.arrayOf(
		PropTypes.shape({
			field: PropTypes.string,
		}),
	),
};

Grid.defaultProps = {
	headerHeight: 69,
	rowHeight: 39,
	rowsData: [],
	columnDefs: [],
};
