/* eslint-disable new-cap */
import { Record, Map, List } from 'immutable';
import {
	Size,
	Position,
	PortDirection,
	PortRecord as PortRecordType,
} from '../customTypings/index.d';

export const NONE = 'NONE';
export const SELECTED = 'SELECTED';
export const DROP_TARGET = 'DROP_TARGET';
export const FORBIDDEN_DROP_TARGET = 'FORBIDDEN_DROP_TARGET';

export const PositionRecord = Record({
	x: undefined,
	y: undefined,
});

export const SizeRecord = Record({
	width: undefined,
	height: undefined,
});

/** TO BE REMOVED */
export const NodeGraphicalAttributes = Record({
	position: new PositionRecord(),
	nodeSize: new SizeRecord(),
	nodeType: undefined,
	label: '',
	description: '',
	properties: Map(),
});

/** TO BE REMOVED */
export const NodeData = Record({
	properties: Map(),
	label: '',
	description: '',
	datasetInfo: Map(),
});

/** TO BE REMOVED */
export const LinkGraphicalAttributes = Record({
	linkType: undefined,
	properties: Map(),
});

/** TO BE REMOVED */
export const LinkData = Record({
	properties: Map(),
});

/** TO BE REMOVED */
export const PortGraphicalAttributes = Record({
	position: PositionRecord,
	portType: undefined,
	properties: Map(),
});

/** TO BE REMOVED */
export const PortData = Record({
	properties: Map(),
	flowType: undefined,
});

const nodeRecordDefinition = {
	id: undefined,
	type: undefined,
	data: Map({
		properties: Map(),
		label: '',
		description: '',
		datasetInfo: Map(),
	}),
	graphicalAttributes: Map({
		position: new PositionRecord(),
		nodeSize: new SizeRecord(),
		nodeType: undefined,
		label: '',
		description: '',
		properties: Map(),
	}),
};

export class NodeRecord extends Record({
	...nodeRecordDefinition,
	getPosition(): Position {
		return this.getIn(['graphicalAttributes', 'position']);
	},

	getSize(): Size {
		return this.getIn(['graphicalAttributes', 'nodeSize']);
	},

	getNodeType(): string {
		return this.getIn(['graphicalAttributes', 'nodeType']);
	},
}) {}

export class NestedNodeRecord extends Record({
	...nodeRecordDefinition,
	components: List(),
	getPosition(): Position {
		return this.getIn(['graphicalAttributes', 'position']);
	},

	getSize(): Size {
		return this.getIn(['graphicalAttributes', 'nodeSize']);
	},

	getNodeType(): string {
		return this.getIn(['graphicalAttributes', 'nodeType']);
	},
}) {}

export const LinkRecord = Record({
	id: undefined,
	sourceId: undefined,
	targetId: undefined,
	data: Map({
		properties: Map(),
	}),
	graphicalAttributes: Map({
		linkType: undefined,
		properties: Map(),
	}),

	/** methods TO BE REMOVED */
	getLinkType(): string {
		return this.getIn(['graphicalAttributes', 'linkType']);
	},
});

export const PortRecord = Record({
	id: undefined,
	nodeId: undefined,
	data: Map({
		properties: Map(),
		flowType: undefined,
	}),
	graphicalAttributes: Map({
		position: PositionRecord,
		portType: undefined,
		properties: Map(),
	}),

	/** methods TO BE REMOVED */
	getPosition(): Position {
		return this.getIn(['graphicalAttributes', 'position']);
	},
	setPosition(position: Position): PortRecordType {
		return this.setIn(['graphicalAttributes', 'position'], position);
	},
	getPortType(): string {
		return this.getIn(['graphicalAttributes', 'portType']);
	},
	getPortDirection(): PortDirection {
		return this.getIn(['graphicalAttributes', 'properties', 'type']);
	},
	getPortFlowType(): string {
		return this.getIn(['data', 'flowType']);
	},
	getIndex(): number {
		return this.getIn(['graphicalAttributes', 'properties', 'index']);
	},
	setIndex(index: number): PortRecordType {
		return this.setIn(['graphicalAttributes', 'properties', 'index'], index);
	},
});
