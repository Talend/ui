import { Record, Map } from 'immutable';

export const NONE = 'NONE';
export const SELECTED = 'SELECTED';
export const DROP_TARGET = 'DROP_TARGET';
export const FORBIDDEN_DROP_TARGET = 'FORBIDDEN_DROP_TARGET';

export const PositionRecord = new Record({
	x: undefined,
	y: undefined,
});

export const SizeRecord = new Record({
	width: undefined,
	height: undefined,
});

export const NodeGraphicalAttributes = new Record({
	position: new PositionRecord(),
	nodeSize: new SizeRecord(),
	nodeType: undefined,
	label: '',
	description: '',
	properties: new Map(),
});

export const NodeData = new Record({
	properties: new Map(),
});

export const LinkGraphicalAttributes = new Record({
	linkType: undefined,
	properties: new Map(),
});

export const LinkData = new Record({
	properties: new Map(),
});

export const PortGraphicalAttributes = new Record({
	position: PositionRecord,
	portType: undefined,
	properties: new Map(),
});

export const PortData = new Record({
	properties: new Map(),
	flowType: undefined,
});

export const NodeRecord = new Record({
	id: undefined,
	type: undefined,
	data: new NodeData(),
	graphicalAttributes: new NodeGraphicalAttributes(),
	getPosition() {
		return this.getIn(['graphicalAttributes', 'position']);
	},
	getSize() {
		return this.getIn(['graphicalAttributes', 'nodeSize']);
	},
	getNodeType() {
		return this.getIn(['graphicalAttributes', 'nodeType']);
	},
});

export const LinkRecord = new Record({
	id: undefined,
	sourceId: undefined,
	targetId: undefined,
	data: new LinkData(),
	graphicalAttributes: new LinkGraphicalAttributes(),
	getLinkType() {
		return this.getIn(['graphicalAttributes', 'linkType']);
	},
});

export const PortRecord = new Record({
	id: undefined,
	nodeId: undefined,
	data: new PortData(),
	graphicalAttributes: new PortGraphicalAttributes(),
	getPosition() {
		return this.getIn(['graphicalAttributes', 'position']);
	},
	getPortType() {
		return this.getIn(['graphicalAttributes', 'portType']);
	},
	getPortDirection() {
		return this.getIn(['graphicalAttributes', 'properties', 'type']);
	},
	getPortFlowType() {
		return this.getIn(['data', 'flowType']);
	},
});
