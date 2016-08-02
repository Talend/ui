import { Record } from 'immutable';

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

export const NodeRecord = Record({
    id: undefined,
    position: undefined,
    nodeSize: undefined,
    nodeType: undefined,
    attr: undefined,
});

export const LinkRecord = Record({
    id: undefined,
    sourceId: undefined,
    targetId: undefined,
    linkType: undefined,
    attr: undefined,
});

export const PortRecord = Record({
    id: undefined,
    nodeId: undefined,
    portType: undefined,
    position: undefined,
    attr: undefined,
});
