import { zoomIdentity } from 'd3';
import {
	FLOWDESIGNER_FLOW_ADD_ELEMENTS,
	FLOWDESIGNER_FLOW_RESET,
	FLOWDESIGNER_FLOW_LOAD,
	FLOWDESIGNER_FLOW_SET_ZOOM,
	FLOWDESIGNER_FLOW_ZOOM_IN,
	FLOWDESIGNER_FLOW_ZOOM_OUT,
	FLOWDESIGNER_PAN_TO,
	FLOWDESIGNER_NODETYPE_SET,
} from '../constants/flowdesigner.constants';
import nodesReducer from './node.reducer';
import linksReducer from './link.reducer';
import portsReducer from './port.reducer';
import nodeTypeReducer from './nodeType.reducer';
import { State, NodeRecord, PortRecord } from '../customTypings/index.d';

export const defaultState: State = {
	nodes: {},
	links: {},
	ports: {},
	out: {},
	in: {},
	childrens: {},
	parents: {},
	nodeTypes: {},
	transform: { k: 1, x: 0, y: 0 },
	transformToApply: undefined,
};

function combinedReducer(state = defaultState, action: any) {
	return [nodesReducer, linksReducer, portsReducer, nodeTypeReducer].reduce(
		(cumulatedState, subReducer) => subReducer(cumulatedState, action),
		state,
	);
}

enum ZoomDirection {
	IN = 'IN',
	OUT = 'OUT',
}

const DEFAULT_ZOOM_SCALE_STEP: number = 0.1;

/**
 * Return the new zoom value based on parameters.
 * @param currentZoom Current zoom value
 * @param zoomDirection Indicate if we want to zoom in or out
 * @param step The zoom change to apply
 * @returns The new zoom value, rounded to be a multiple of step value
 * @example
 * A zoom at 100% has a currentZoom value of 1
 * If you want to zoom by step of 25%, step value is 0.25
 * Example 1:
 * 	You are at 125%, you zoom in. We want to zoom to 150%.
 * 	We have (1.25 + 0.25) / 0.25 = 6, no rounding, so then 6 * 0.25 = 1.5
 * 	So the new zoom value is 1.5, which is 150%, that what we want.
 * Example 2:
 * 	You had zoomed with the mouse wheel (do not use steps) at 136%, and you zoom in.
 * 	We want to go to the next step, so we want to zoom to 150%.
 * 	We have (1.36 + 0.25) = 1.61, it should means a zoom at 161%
 *  So the goal is to round by step, to do that we have to check how many step are in the new zoom value: 1.61 / 0.25 = 6.44
 * 	Because we are zooming in, we want to round down the value, in order to stop at the first step encountered: Math.floor(6.44) = 6
 * 	Now we can multiply by the step to retrieve to correct value: 6 * 0.25 = 1.5
 * 	Bingo, we have the right value and zoom to 150%
 */
function calculateZoomScale(
	currentZoom: number,
	zoomDirection: ZoomDirection,
	step: number,
): number {
	let zoomValue;
	if (zoomDirection === ZoomDirection.IN) {
		zoomValue = Math.floor((currentZoom + step) / step) * step;
	} else {
		zoomValue = Math.ceil((currentZoom - step) / step) * step;
	}

	// If the new zoom should be 0, we set a zoom at 1%.
	if (zoomValue < step) zoomValue = step;

	return zoomValue;
}

export function reducer(state: State, action: any) {
	switch (action.type) {
		case FLOWDESIGNER_FLOW_ADD_ELEMENTS:
			return action.listOfActionCreation.reduce(
				(cumulativeState: State, actionCreation: any) =>
					combinedReducer(cumulativeState, actionCreation),
				state,
			);
		case FLOWDESIGNER_FLOW_RESET:
			return { ...defaultState, nodeTypes: state.nodeTypes };
		case FLOWDESIGNER_FLOW_LOAD:
			return action.listOfActionCreation.reduce(
				(cumulativeState: State, actionCreation: any) =>
					combinedReducer(cumulativeState, actionCreation),
				{ ...defaultState, nodeTypes: state.nodeTypes },
			);
		case FLOWDESIGNER_FLOW_SET_ZOOM:
			return { ...state, transform: action.transform };
		case FLOWDESIGNER_FLOW_ZOOM_IN:
			return {
				...state,
				transformToApply: zoomIdentity
					.translate(state.transform.x, state.transform.y)
					.scale(
						calculateZoomScale(
							state.transform.k,
							ZoomDirection.IN,
							action.scale || DEFAULT_ZOOM_SCALE_STEP,
						),
					),
			};
		case FLOWDESIGNER_FLOW_ZOOM_OUT:
			return {
				...state,
				transformToApply: zoomIdentity
					.translate(state.transform.x, state.transform.y)
					.scale(
						calculateZoomScale(
							state.transform.k,
							ZoomDirection.OUT,
							action.scale || DEFAULT_ZOOM_SCALE_STEP,
						),
					),
			};
		case FLOWDESIGNER_PAN_TO:
			return {
				...state,
				transformToApply: zoomIdentity
					.translate(state.transform.x, state.transform.y)
					.scale(state.transform.k)
					.scale(1 / state.transform.k)
					.translate(-(state.transform.x + action.x), -(state.transform.y + action.y)),
			};
		default:
			return combinedReducer(state, action);
	}
}

/**
 * Calculate port position with the methods provided by port parent node
 * calcul is done only if node moved or list of attached port have its size changed
 * also update position if registered nodetype change
 * because the node hold the function used to calculate position of their attached port
 * Beware could be slow if the calculus methode provided is slow
 * @params {object} state react-flow-designer state
 * @params {object} action
 *
 * @return {object} new state
 */
export function calculatePortsPosition(state: State, action: any) {
	let nodes: NodeRecord[] = [];
	// TODO: NOT a big fan of this way to optimize port recalculations, don't feel future proof
	if (
		(/FLOWDESIGNER_NODE_/.exec(action.type) && action.type !== 'FLOWDESIGNER_NODE_REMOVE') ||
		(/FLOWDESIGNER_PORT_/.exec(action.type) && action.type !== 'FLOWDESIGNER_PORT_REMOVE') ||
		/FLOWDESIGNER.FLOW_/.exec(action.type) ||
		action.type === FLOWDESIGNER_NODETYPE_SET
	) {
		if (action.nodeId) {
			nodes.push(state.nodes?.[action.nodeId] as NodeRecord);
		} else if (action.portId) {
			const portNodeId = state.ports?.[action.portId]?.nodeId;
			if (portNodeId) nodes.push(state.nodes?.[portNodeId as string] as NodeRecord);
		} else {
			nodes = Object.values(state.nodes || {}) as NodeRecord[];
		}
		return nodes.reduce((cumulativeState: State, node: NodeRecord) => {
			const nodeType = node.getNodeType();
			const ports = Object.fromEntries(
				Object.entries(state.ports || {}).filter(
					([, port]) => (port as PortRecord).nodeId === node.id,
				),
			);

			const calculatePortPosition =
				state.nodeTypes?.[nodeType as string]?.component?.calculatePortPosition;
			if (calculatePortPosition) {
				return {
					...cumulativeState,
					ports: {
						...cumulativeState.ports,
						...calculatePortPosition(ports, node.getPosition(), node.getSize()),
					},
				};
			}
			return state;
		}, state);
	}
	return state;
}

function flowDesignerReducer(state: State, action: any) {
	let newState = reducer(state, action);
	newState = calculatePortsPosition(newState, action);
	return newState;
}

export default flowDesignerReducer;
