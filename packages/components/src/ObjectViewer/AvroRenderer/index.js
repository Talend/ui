import React from 'react';
import DefaultCellRenderer, { CELL_RENDERER_COMPONENT } from './DefaultCellRenderer.component';
import Inject from '../../Inject';

export { CELL_RENDERER_COMPONENT };

export function injectedCellRenderer(getComponent, rendererId, avroRenderer) {
	const Component = Inject.get(getComponent, rendererId, DefaultCellRenderer);

	return props => <Component {...props} avroRenderer={avroRenderer} getComponent={getComponent} />;
}

export function getAvroRenderer(avroRenderer) {
	return {
		booleanCellRenderer: 'DefaultBooleanCellRenderer',
		dateCellRenderer: 'DefaultDateCellRenderer',
		intCellRenderer: 'DefaultIntCellRenderer',
		stringCellRenderer: 'DefaultStringCellRenderer',
		...avroRenderer,
	};
}
