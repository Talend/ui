import React from 'react';
import PropTypes from 'prop-types';

import Component from '../../components';
import DATAGRID_PROPTYPES from '../../components/DataGrid/DataGrid.proptypes';

export const DISPLAY_NAME = 'Container(DataGrid)';

export default function DataGrid(props) {
	return <Component {...props} />;
}

DataGrid.propTypes = {
	...DATAGRID_PROPTYPES,
	onFocusedCellActionCreator: PropTypes.string,
	onFocusedColumnActionCreator: PropTypes.string,
	onVerticalScrollActionCreator: PropTypes.string,
};

DataGrid.displayName = DISPLAY_NAME;
