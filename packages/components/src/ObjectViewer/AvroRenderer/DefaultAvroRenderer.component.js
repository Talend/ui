import React from 'react';
import PropTypes from 'prop-types';
import Inject from '../../Inject';

import DefaultRenderer from './DefaultRenderer.component';
import DefaultDateRenderer from './DefaultDateRenderer.component';

const defaultRenderers = {
	date: DefaultDateRenderer,
};

function getDefaultRenderer(type) {
	return defaultRenderers[type] || DefaultRenderer;
}

export default function DefaultAvroRenderer({ avroRenderersIds, colDef, data, getComponent }) {
	const type = colDef.avro.type.type;
	const componentId = avroRenderersIds[type];
	const Component = Inject.get(getComponent, componentId, getDefaultRenderer(type));

	return <Component data={data} colDef={colDef} />;
}
DefaultAvroRenderer.displayName = 'DefaultAvroRenderer';
DefaultAvroRenderer.defaultProps = {
	avroRenderersIds: {},
};
DefaultAvroRenderer.propTypes = {
	avroRenderersIds: PropTypes.object,
	colDef: PropTypes.shape({
		avro: PropTypes.shape({
			type: PropTypes.shape({
				type: PropTypes.string,
			}),
		}),
	}),
	data: PropTypes.object,
	getComponent: PropTypes.func,
};
