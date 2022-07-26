import React from 'react';

import { ICellRendererParams } from 'ag-grid-community';

import {
	DATE_TYPE_FORMATER,
	LONG_TYPE,
	PRIMITIVES_MAPPING,
	TIMESTAMP_MILLIS_LOGICAL_TYPES,
} from '../../constants/avro-type.constant';
import { CellRendererParams, TypeInfo } from '../../types';
import DefaultIntCellRenderer from '../DefaultIntCellRenderer';
import DefaultValueRenderer from './DefaultValueRenderer.component';

export function getTypeRenderer(schemaType: TypeInfo) {
	if (schemaType.type === LONG_TYPE && schemaType.logicalType === TIMESTAMP_MILLIS_LOGICAL_TYPES) {
		return DATE_TYPE_FORMATER;
	}

	return PRIMITIVES_MAPPING[schemaType.type] ?? schemaType.type;
}

export default function AvroRenderer({
	avroRenderer = {
		intCellRenderer: DefaultIntCellRenderer,
		stringCellRenderer: DefaultValueRenderer,
	},
	avro,
	...rest
}: ICellRendererParams & CellRendererParams) {
	const typeRenderer = getTypeRenderer(avro);
	const Component = avroRenderer?.[`${typeRenderer}CellRenderer`] ?? DefaultValueRenderer;

	return <Component {...rest} />;
}
