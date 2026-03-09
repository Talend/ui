import { RecordOf, Map } from 'immutable';
import { PORT_SINK, PORT_SOURCE } from '../constants/flowdesigner.constants';

/** $BASIC */

export type Id = string;

export interface Position {
	x: number;
	y: number;
}

export interface Size {
	width: number;
	height: number;
}

export interface Action {
	type: string;
}

export type PortDirection = typeof PORT_SINK | typeof PORT_SOURCE;

export interface PortGraphicalAttributes {
	portType?: string;
	position?: Position;
	properties: {
		type: PortDirection;
		index?: number;
	} & any;
}

export interface PortData {
	flowType: string;
	properties?: object;
}

export interface Port {
	id: Id;
	nodeId: string;
	data?: PortData;
	graphicalAttributes?: PortGraphicalAttributes;
}

export interface NodeGraphicalAttributes {
	position: Position;
	nodeSize: Size;
	nodeType: string;
	label: string;
	description: string;
	properties?: object;
}

export interface NodeData {
	datasetId: Id;
	properties?: object;
	label: string;
	description: string;
	datasetInfo?: object;
}

export interface Node {
	id: Id;
	type: string;
	data: NodeData;
	graphicalAttributes: NodeGraphicalAttributes;
	components?: List<Node>;
}

export interface LinkGraphicalAttributes {
	linkType: string;
	properties?: object;
}

export interface LinkData {
	properties?: object;
}

export interface Link {
	id: Id;
	sourceId: Id;
	targetId: Id;
	data: LinkData;
	graphicalAttributes: LinkGraphicalAttributes;
}

/** $RECORDS */
export type PositionRecord = RecordOf<Position>;

export type SizeRecord = RecordOf<Size>;

export type PortRecord = RecordOf<Port> & {
	getPosition: () => Position;
	getPortType: () => string;
	getPortDirection: () => PortDirection;
	getPortFlowType: () => string;
	getIndex: () => number;
	setIndex: (index: number) => PortRecord;
};

// TODO add record
export type NodeRecord = RecordOf<Node> & {
	getPosition: () => Position;
	getSize: () => Size;
	getNodeType: () => string;
};

export type NestedNodeRecord = RecordOf<Node> & {
	getPosition: () => Position;
	getSize: () => Size;
	getNodeType: () => string;
};

export type LinkRecord = RecordOf<Link> & {
	getLinkType: () => string;
};

/** $STATE */

export type PortRecordMap = Map<Id, PortRecord>;
export type NodeRecordMap = Map<Id, NodeRecord | NestedNodeRecord>;
export type LinkRecordMap = Map<Id, LinkRecord>;

type GetStateNodes = (selector: ['nodes', Id]) => NodeRecord;
type GetStatePorts = (selector: ['ports', Id]) => PortRecord;
type GetStateLinks = (selector: ['links', Id]) => LinkRecord;
type GetStateIn = (selector: ['in', Id]) => Id;
type GetStateOut = (selector: ['out', Id]) => Id;

export type State = {
	in: Map<string, Map<Id, Id>>;
	parents: Map<string, Map<Id, Id>>;
	transform: Transform;
	transformToApply?: Transform;
	out: Map<string, Map<Id, Id>>;
	nodes: Map<string, Map<Id, NodeRecord | NestedNodeRecord>>;
	ports: Map<string, Map<Id, PortRecord>>;
	children: Map<string, Map<Id, Id>>;
	nodeTypes: Map<string, Map<Id, any>>;
	links: Map<string, Map<Id, LinkRecord>>;
} & Map & { getIn: GetStateNodes | GetStatePorts | GetStateLinks | GetStateIn | GetStateOut };

/** $ACTIONS */
export interface PortActionAdd {
	type: 'FLOWDESIGNER_PORT_ADD';
	nodeId: Id;
	id: Id;
	data?: PortData;
	graphicalAttributes?: PortGraphicalAttributes;
}

export type PortAction =
	| PortActionAdd
	| {
			type: 'FLOWDESIGNER_PORT_ADDS';
			nodeId: Id;
			ports: Array<Port>;
	  }
	| {
			type: 'FLOWDESIGNER_PORT_SET_GRAPHICAL_ATTRIBUTES';
			portId: Id;
			graphicalAttributes: {};
	  }
	| {
			type: 'FLOWDESIGNER_PORT_REMOVE_GRAPHICAL_ATTRIBUTES';
			portId: Id;
			graphicalAttributesKey: string;
	  }
	| {
			type: 'FLOWDESIGNER_PORT_SET_DATA';
			portId: Id;
			data: object;
	  }
	| {
			type: 'FLOWDESIGNER_PORT_REMOVE_DATA';
			portId: Id;
			dataKey: string;
	  }
	| {
			type: 'FLOWDESIGNER_PORT_REMOVE';
			portId: Id;
	  };

export interface NodeType {
	id: string;
	position: Position;
}

export interface PortType {
	id: string;
	nodeId: string;
	position: Position;
}

export interface LinkType {
	id: string;
	sourceId: string;
	targetId: string;
}

export interface Transform {
	k: number;
	x: number;
	y: number;
}
