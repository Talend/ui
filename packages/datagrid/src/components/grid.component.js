import React from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-bootstrap.css';
// import './grid.css';

// import CellRenderer from './CellRenderer';
// import CustomHeader from './CustomHeader';

export default function Grid(props) {
	const containerStyle = {
		height: 800,
	};

	const agGridOptions = {
		columnDefs: props.columnDefs,
		rowData: props.rowData,
	};

	if (props.renderers) {
		agGridOptions.frameworkComponents = {
			...props.renderers,
		};
	}

	return (
		<div>
			<div style={containerStyle} className="ag-theme-bootstrap">
				<AgGridReact {...agGridOptions} />
			</div>
		</div>
	);
}

Grid.propTypes = {
	renderers: PropTypes.object,
	rowData: PropTypes.arrayOf(PropTypes.object),
	columnDefs: PropTypes.arrayOf(
		PropTypes.shape({
			field: PropTypes.string,
		}),
	),
};

Grid.defaultProps = {
	rowsData: [],
	columnDefs: [],
};
