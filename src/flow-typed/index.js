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

type getStateNodes = (selector: ['nodes', Id]) => NodeRecordType;
type getStatePorts = (selector: ['ports', Id]) => PortRecordType;
type getStateLinks = (selector: ['links', Id]) => Record<*>;

export type State = Map<string, Map<Id, any>> & {
	+getIn: getStateNodes | getStatePorts | getStateLinks
};

/** $ACTIONS */
export type PortActionAdd = {
	type: 'FLOWDESIGNER_PORT_ADD',
	nodeId: Id,
	id: Id,
	data: PortData,
	graphicalAttributes: PortGraphicalAttributes
}

export type PortAction = PortActionAdd
| {
	type: 'FLOWDESIGNER_PORT_ADDS',
	nodeId: Id,
	ports: Array<Port>
} | {
	type: 'FLOWDESIGNER_PORT_SET_GRAPHICAL_ATTRIBUTES',
	portId: Id,
	graphicalAttributes: {}
} | {
	type: 'FLOWDESIGNER_PORT_REMOVE_GRAPHICAL_ATTRIBUTES',
	portId: Id,
	graphicalAttributesKey: string,
} | {
	type: 'FLOWDESIGNER_PORT_SET_DATA',
	portId: Id,
	data: Object
} | {
	type: 'FLOWDESIGNER_PORT_REMOVE_DATA',
	portId: Id,
	dataKey: string
} | {
	type: 'FLOWDESIGNER_PORT_REMOVE',
	portId: Id
}
