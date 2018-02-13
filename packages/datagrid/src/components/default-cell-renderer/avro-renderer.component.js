import React from 'react';
import { Inject } from '@talend/react-components';

export default function DefaultTypeRenderer({ avroRenderer, colDef, data, getComponent }) {
	const componentId = avroRenderer[`${colDef.avro.type.type}CellRenderer`];

	return <Inject getComponent={getComponent} component={componentId} data={data} colDef={colDef} />;
}
