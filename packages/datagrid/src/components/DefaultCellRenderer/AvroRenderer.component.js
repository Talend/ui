import React from 'react';
import PropTypes from 'prop-types';

import { AVRO_TYPES, LOGICAL_TYPES } from '../../constants';

import DefaultRenderer from './DefaultRenderer.component';
import { getTypeRenderer } from './mappingTypeRenderer';

export default function AvroRenderer({ avroRenderer, colDef, data }) {
	const typeRenderer = getTypeRenderer(colDef.avro.type);
	const Component = avroRenderer[`${typeRenderer}CellRenderer`] ?? DefaultRenderer;

	return <Component data={data} colDef={colDef} />;
}

AvroRenderer.propTypes = {
	avroRenderer: PropTypes.object,
	colDef: PropTypes.shape({
		avro: PropTypes.shape({
			type: PropTypes.shape({
				type: PropTypes.oneOf(AVRO_TYPES),
				logicalType: PropTypes.oneOf(LOGICAL_TYPES),
			}),
		}),
	}),
	data: PropTypes.object,
};
