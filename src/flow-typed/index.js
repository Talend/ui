/* @flow */
import type { Record, Map } from 'immutable';
import { PORT_SINK, PORT_SOURCE } from '../constants/flowdesigner.constants';

/** $BASIC */

export type Id = string;

export type Position = {
	x: number,
	y: number,
}

export type Size = {
	width: number,
	height: number,
}

export type Transform = {
	x: number,
	y: number,
	k: number
}

export type Action = {
	type: string
}

export type PortDirection = typeof PORT_SINK | typeof PORT_SOURCE;

export type PortGraphicalAttributes = {
	portType: string,
	position?: Position,
	properties: {
		type: PortDirection,
		index?: number
	} & any
}

export type PortData = {
	flowType: string,
	properties?: {}
}

export type Port = {
	id: Id,
	nodeId: string,
	data: PortData,
	graphicalAttributes: PortGraphicalAttributes
}

/** $RECORDS */
export type PositionRecord = Record<Position> & Position;

export type PortRecordType = Record<Port>
& {
	getPosition: () => Position,
	getPortType: () => string,
	getPortDirection: () => PortDirection,
	getPortFlowType: () => string,
	getIndex: () => number,
	setIndex: (index: number) => PortRecordType,
}
& Port;

// TODO add record
export type NodeRecordType = Record<*>
& {
	getPosition: () => Position,
	getSize: () => Size,
	getNodeType: () => string,
};

export type LinkRecordType = Record<*>
& {
	getLinkType: () => string,
};

/** $STATE */

export type PortRecordMap = Map<Id, PortRecordType>;

type getTransform = (key: 'transform') => Transform;
type getNodes = (key: 'nodes') => Map<*, NodeRecordType>;
type get = (key: any) => any;
type getStateNodes = (selector: ['nodes', Id]) => NodeRecordType;
type getStatePorts = (selector: ['ports', Id]) => PortRecordType;
type getStateLinks = (selector: ['links', Id]) => Record<*>;
type getStateNodesPosition = (selector: ['nodesPosition', Id]) => Position;

export type FlowState = Map<any, Map<*, *>> & {
	+getIn: getStateNodes | getStatePorts | getStateLinks | getStateNodesPosition;
	+get: getTransform | getNodes | get;
};

/** $ACTIONS */
export type PortActionAdd = {|
	type: 'FLOWDESIGNER_PORT_ADD',
	nodeId: Id,
	id: Id,
	data: PortData,
	graphicalAttributes: PortGraphicalAttributes
|}

export type PortAction = PortActionAdd
| {|
	type: 'FLOWDESIGNER_PORT_ADDS',
	nodeId: Id,
	ports: Array<Port>
|} | {|
	type: 'FLOWDESIGNER_PORT_SET_GRAPHICAL_ATTRIBUTES',
	portId: Id,
	graphicalAttributes: {}
|} | {|
	type: 'FLOWDESIGNER_PORT_REMOVE_GRAPHICAL_ATTRIBUTES',
	portId: Id,
	graphicalAttributesKey: string,
|} | {|
	type: 'FLOWDESIGNER_PORT_SET_DATA',
	portId: Id,
	data: Object
|} | {|
	type: 'FLOWDESIGNER_PORT_REMOVE_DATA',
	portId: Id,
	dataKey: string
|} | {|
	type: 'FLOWDESIGNER_PORT_REMOVE',
	portId: Id
|}

export type NodeAction = {|
		type: 'FLOWDESIGNER_NODE_ADD',
		nodeType: string,
		nodeId: Id,
		data: any,
		graphicalAttributes: any,
|} | {|
	type: 'FLOWDESIGNER_NODE_MOVE' | 'FLOWDESIGNER_NODE_MOVE_END',
	nodeId: Id,
	nodePosition: Position,
|} | {|
	type: 'FLOWDESIGNER_NODE_APPLY_MOVEMENT',
	nodesId: Array<Id>,
	movement: Position
|} | {|
	type: 'FLOWDESIGNER_NODE_SET_SIZE',
	nodeId: Id,
	nodeSize: Size
|} | {|
	type: 'FLOWDESIGNER_NODE_SET_GRAPHICAL_ATTRIBUTES',
	nodeId: Id,
	graphicalAttributes: any
|} | {|
	type: 'FLOWDESIGNER_NODE_REMOVE_GRAPHICAL_ATTRIBUTES',
	nodeId: Id,
	graphicalAttributesKey: string
|} | {|
	type: 'FLOWDESIGNER_NODE_SET_DATA',
	nodeId: Id,
	data: any
|} | {|
	type: 'FLOWDESIGNER_NODE_REMOVE_DATA',
	nodeId:	Id,
	dataKey: string
|} | {|
	type: 'FLOWDESIGNER_NODE_REMOVE',
	nodeId: Id
|}

export type FlowAction = PortAction | NodeAction
| {|
	type: 'FLOWDESIGNER_PAN_TO',
	x: number,
	y: number
|};
