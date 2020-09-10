import {
	FLOWDESIGNER_FLOW_ADD_ELEMENTS,
	FLOWDESIGNER_FLOW_RESET,
	FLOWDESIGNER_FLOW_LOAD,
	FLOWDESIGNER_FLOW_SET_ZOOM,
} from '../constants/flowdesigner.constants';

/**
 * Ask to sequentially add elements to the flow, each creation should be checked against store,
 * then applied via current reducers
 *
 * @params {array} listOfActionCreation
 */
export const addFlowElements = (listOfActionCreation: any) => ({
	type: FLOWDESIGNER_FLOW_ADD_ELEMENTS,
	listOfActionCreation,
});

/**
 * ask for flow reset, emptying, nodes, links, ports collections
 */
export const resetFlow = () => ({
	type: FLOWDESIGNER_FLOW_RESET,
});

/**
 * reset old flow, load elements for the new flow
 */
export const loadFlow = (listOfActionCreation: any) => ({
	type: FLOWDESIGNER_FLOW_LOAD,
	listOfActionCreation,
});

export function setZoom(transform: { k: number; x: number; y: number }) {
	if (!isNaN(transform.k) && !isNaN(transform.x) && !isNaN(transform.y)) {
		return {
			type: FLOWDESIGNER_FLOW_SET_ZOOM,
			transform,
		};
	}
	return null;
}
