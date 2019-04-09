import React from 'react';
import PropTypes from 'prop-types';
import { Inject } from '@talend/react-components';

import { AVRO_TYPES, LOGICAL_TYPES } from '../../constants';
import DATAGRID_PROPTYPES from '../DataGrid/DataGrid.proptypes';

import DefaultRenderer from './DefaultRenderer.component';

function getTypeRenderer(semanticType) {
	const PRIMITIVES_MAPPING = {
		double: 'int',
		float: 'int',
		int: 'int',
		long: 'int',
	};

	const LOGICAL_MAPPING = {
		'timestamp-millis': 'date',
	};

	return (
		LOGICAL_MAPPING[semanticType.logicalType] ||
		PRIMITIVES_MAPPING[semanticType.type] ||
		semanticType.type
	);
}

export default function AvroRenderer({ avroRenderer, colDef, data, getComponent }) {
	const typeRenderer = getTypeRenderer(colDef.avro.type);
	const componentId = avroRenderer[`${typeRenderer}CellRenderer`];
	const Component = Inject.get(getComponent, componentId, DefaultRenderer);

	return <Component data={data} colDef={colDef} />;
}

AvroRenderer.propTypes = {
	avroRenderer: DATAGRID_PROPTYPES.avroRenderer,
	colDef: PropTypes.shape({
		avro: PropTypes.shape({
			type: PropTypes.shape({
				type: PropTypes.oneOf(AVRO_TYPES),
				logicalType: PropTypes.oneOf(LOGICAL_TYPES),
			}),
		}),
	}),
	data: PropTypes.object,
	getComponent: PropTypes.func,
};
