import { Record } from 'immutable';

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

export const NodeRecord = new Record({
	id: undefined,
	position: undefined,
	nodeSize: undefined,
	nodeType: undefined,
	attr: undefined,
});

export const LinkRecord = new Record({
	id: undefined,
	sourceId: undefined,
	targetId: undefined,
	linkType: undefined,
	attr: undefined,
});

export const PortRecord = new Record({
	id: undefined,
	nodeId: undefined,
	portType: undefined,
	position: undefined,
	attr: undefined,
});
