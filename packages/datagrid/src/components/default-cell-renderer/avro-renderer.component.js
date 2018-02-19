import React from 'react';
import PropTypes from 'prop-types';
import { Inject } from '@talend/react-components';

import DATAGRID_PROPTYPES from '../datagrid.proptypes';

export default function DefaultTypeRenderer({ avroRenderer, colDef, data, getComponent }) {
	const componentId = avroRenderer[`${colDef.avro.type.type}CellRenderer`];

	return <Inject getComponent={getComponent} component={componentId} data={data} colDef={colDef} />;
}

DefaultTypeRenderer.propTypes = {
	avroRenderer: DATAGRID_PROPTYPES.avroRenderer,
	colDef: PropTypes.shape({
		avro: PropTypes.shape({
			type: PropTypes.shape({
				type: PropTypes.oneOf(['boolean', 'date', 'int', 'string']),
			}),
		}),
	}),
	data: PropTypes.object,
	getComponent: PropTypes.func,
};
