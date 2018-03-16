import React from 'react';
import DefaultAvroRenderer from './DefaultAvroRenderer.component';
import Inject from '../../Inject';

// Each time we call injectedCellRenderer, it produces a new component.
// React consider it as a change, and change the dom at each render :/
// This memoizedRenderers object will store those components the first time it is created
const memoizedRenderers = {};

/**
 * Get the renderer that will be instantiated for all values.
 * It is the single entry point as custom renderer.
 * @param 	getComponent A function that returns the component: getComponent(rendererId)
 * @param 	rendererId The renderer component id
 * @param 	avroRenderer The avro renderers ids by type.
 * 			The returned component will have access to those renderers
 * 			and can delegate the rendering to one of those.
 * @param 	defaultRenderer The default renderer to return. If not provided, it is the DefaultAvroRenderer
 * @returns {function} The renderer component
 */
export function injectedCellRenderer(getComponent, rendererId, avroRenderer, defaultRenderer) {
	let CellRenderer = memoizedRenderers[rendererId];
	if (!CellRenderer) {
		const Component = Inject.get(getComponent, rendererId, defaultRenderer || DefaultAvroRenderer);
		CellRenderer = props => (
			<Component
				{...props}
				avroRenderer={avroRenderer}
				getComponent={getComponent}
			/>
		);
		memoizedRenderers[rendererId] = CellRenderer;
	}
	return CellRenderer;
}
