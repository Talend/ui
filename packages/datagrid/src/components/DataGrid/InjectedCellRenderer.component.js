import React from 'react';
import PropTypes from 'prop-types';
import cmf from '@talend/react-cmf';
import Inject from '@talend/react-components/lib/Inject';

import DefaultCellRenderer from '../DefaultCellRenderer';
import DATAGRID_PROPTYPES from './DataGrid.proptypes';

// eslint-disable-next-line react/prefer-stateless-function
export default class InjectedCellRenderer extends React.Component {
	/*
		why it is not a pure function ?
			if we return a pure function, we pass on this case https://github.com/ag-grid/ag-grid/blob/master/packages/ag-grid-react/src/agGridReact.ts#L314
			and we have as many calls as cells, this triggers memory leaks.
			Also, we can't refresh a cell if the data changes without redraws all the grid
	*/
	render() {
		const Component = Inject.get(
			cmf.component.get,
			this.props.colDef.injectedCellRenderer,
			DefaultCellRenderer,
		);

		return (
			<Component
				{...this.props}
				avroRenderer={this.props.colDef.avroRenderer}
				getComponent={cmf.component.get}
			/>
		);
	}
}

InjectedCellRenderer.propTypes = {
	colDef: PropTypes.shape({
		avroRenderer: DATAGRID_PROPTYPES.avroRenderer,
		injectedCellRenderer: 'string',
	}),
};
