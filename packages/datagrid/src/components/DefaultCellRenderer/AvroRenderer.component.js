import React from 'react';
import PropTypes from 'prop-types';
import { Inject } from '@talend/react-components';

import DATAGRID_PROPTYPES from '../DataGrid/DataGrid.proptypes';

import DefaultRenderer from './DefaultRenderer.component';

export default function AvroRenderer({ avroRenderer, colDef, data, getComponent }) {
	const componentId = avroRenderer[`${colDef.avro.type.type}CellRenderer`];
	const Component = Inject.get(getComponent, componentId, DefaultRenderer);

	return <Component data={data} colDef={colDef} />;
}

AvroRenderer.propTypes = {
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
