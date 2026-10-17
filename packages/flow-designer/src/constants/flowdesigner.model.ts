/* eslint-disable new-cap */
import { List, Map, Record } from 'immutable';
import {
	Id,
	LinkRecordValues,
	NodeRecordValues,
	PortDirection,
	PortRecord as PortRecordType,
	PortRecordValues,
	Position,
	PositionRecord as PositionRecordType,
	Size,
	SizeRecord as SizeRecordType,
} from '../customTypings/index.d';

export const NONE = 'NONE';
export const SELECTED = 'SELECTED';
export const DROP_TARGET = 'DROP_TARGET';
export const FORBIDDEN_DROP_TARGET = 'FORBIDDEN_DROP_TARGET';

export const PositionRecord = Record<Position>({
	x: undefined as unknown as number,
	y: undefined as unknown as number,
});

export const SizeRecord = Record<Size>({
	width: undefined as unknown as number,
	height: undefined as unknown as number,
});

/** TO BE REMOVED */
type NodeGraphicalAttributeValues = {
	position: PositionRecordType;
	nodeSize: SizeRecordType;
	nodeType: string | undefined;
	label: string;
	description: string;
	properties: Map<any, any>;
};
export const NodeGraphicalAttributes = Record<NodeGraphicalAttributeValues>({
	position: new PositionRecord(),
	nodeSize: new SizeRecord(),
	nodeType: undefined,
	label: '',
	description: '',
	properties: Map(),
});

/** TO BE REMOVED */
type NodeDataValues = {
	properties: Map<any, any>;
	label: string;
	description: string;
	datasetInfo: Map<any, any>;
};
export const NodeData = Record<NodeDataValues>({
	properties: Map(),
	label: '',
	description: '',
	datasetInfo: Map(),
});

/** TO BE REMOVED */
type LinkGraphicalAttributeValues = {
	linkType: string | undefined;
	properties: Map<any, any>;
};
export const LinkGraphicalAttributes = Record<LinkGraphicalAttributeValues>({
	linkType: undefined,
	properties: Map(),
});

/** TO BE REMOVED */
type LinkDataValues = { properties: Map<any, any> };
export const LinkData = Record<LinkDataValues>({ properties: Map() });

/** TO BE REMOVED */
type PortGraphicalAttributeValues = {
	position: PositionRecordType | typeof PositionRecord;
	portType: string | undefined;
	properties: Map<any, any>;
};
export const PortGraphicalAttributes = Record<PortGraphicalAttributeValues>({
	position: PositionRecord,
	portType: undefined,
	properties: Map(),
});

/** TO BE REMOVED */
type PortDataValues = { properties: Map<any, any>; flowType: string | undefined };
export const PortData = Record<PortDataValues>({
	properties: Map(),
	flowType: undefined,
});

const nodeRecordDefinition = {
	id: undefined as unknown as Id,
	type: undefined as unknown as string,
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

// Note: methods below use `this: any` to work around an Immutable.js v5 breaking change.
// In v5, TypeScript infers `this` inside a Record({...}) shape as the plain object literal
// (not the instantiated Record), so methods like getIn/get/set/setIn are not recognized.
// `this: any` is a TypeScript-only fake parameter that suppresses the type check on `this`.
// All affected methods are marked "TO BE REMOVED" — this is a transitional workaround only.
export class NodeRecord extends Record<NodeRecordValues>({
	...nodeRecordDefinition,
	getPosition(this: any): PositionRecordType {
		return this.getIn(['graphicalAttributes', 'position']);
	},

	getSize(this: any): SizeRecordType {
		return this.getIn(['graphicalAttributes', 'nodeSize']);
	},

	getNodeType(this: any): string {
		return this.getIn(['graphicalAttributes', 'nodeType']);
	},
}) {}

export class NestedNodeRecord extends Record<NodeRecordValues>({
	...nodeRecordDefinition,
	components: List<any>(),
	getComponents(this: any): Map<string, any> {
		return this.get('components');
	},
	setComponents(this: any, components: Map<string, any>) {
		return this.set('components', components);
	},
	getPosition(this: any): PositionRecordType {
		return this.getIn(['graphicalAttributes', 'position']);
	},

	getSize(this: any): SizeRecordType {
		return this.getIn(['graphicalAttributes', 'nodeSize']);
	},

	getNodeType(this: any): string {
		return this.getIn(['graphicalAttributes', 'nodeType']);
	},
}) {}

export const LinkRecord = Record<LinkRecordValues>({
	id: undefined as unknown as Id,
	sourceId: undefined as unknown as Id,
	targetId: undefined as unknown as Id,
	data: Map({
		properties: Map(),
	}),
	graphicalAttributes: Map({
		linkType: undefined,
		properties: Map(),
	}),
	getLinkType(this: any): string {
		return this.getIn(['graphicalAttributes', 'linkType']);
	},
});

export const PortRecord = Record<PortRecordValues>({
	id: undefined as unknown as Id,
	nodeId: undefined as unknown as Id,
	data: Map({
		properties: Map(),
		flowType: undefined,
	}),
	graphicalAttributes: Map({
		position: PositionRecord,
		portType: undefined,
		properties: Map(),
	}),
	getPosition(this: any): PositionRecordType {
		return this.getIn(['graphicalAttributes', 'position']);
	},
	setPosition(this: any, position: Position): PortRecordType {
		return this.setIn(['graphicalAttributes', 'position'], position);
	},
	getPortType(this: any): string {
		return this.getIn(['graphicalAttributes', 'portType']);
	},
	getPortDirection(this: any): PortDirection {
		return this.getIn(['graphicalAttributes', 'properties', 'type']);
	},
	getPortFlowType(this: any): string {
		return this.getIn(['data', 'flowType']);
	},
	getIndex(this: any): number {
		return this.getIn(['graphicalAttributes', 'properties', 'index']);
	},
	setIndex(this: any, index: number): PortRecordType {
		return this.setIn(['graphicalAttributes', 'properties', 'index'], index);
	},
});
