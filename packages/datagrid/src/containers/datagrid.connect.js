import React from 'react';
import PropTypes from 'prop-types';

import Grid from '../components/grid.component';

export default function DataGrid() {
	return <Grid rowData={rowData} columnDefs={columnDefs} />;
}
