import { Map } from 'immutable';
import matchers from 'jasmine-immutable-matchers';

import nodeReducer from './node.reducer';
import { NodeRecord, PositionRecord, SizeRecord } from '../constants/flowdesigner.model';

describe('Check node reducer', () => {
    beforeEach(() => {
        jasmine.addMatchers(matchers);
    });

    const initialState = new Map().set('id1', new NodeRecord({
        id: 'id1',
        nodeType: 'type1',
        position: new PositionRecord({ x: 10, y: 10 }),
        attr: new Map({ selected: true }),
    })).set('id2', new NodeRecord({
        id: 'id2',
        nodeType: 'type2',
        position: new PositionRecord({ x: 10, y: 10 }),
        attr: new Map({ selected: false }),
    }));

    it('FLOWDESIGNER_NODE_ADD properly add a new node to the node collection', () => {
        expect(nodeReducer(new Map(), {
            type: 'FLOWDESIGNER_NODE_ADD',
            nodeId: 'id',
            nodePosition: { x: 10, y: 10 },
        })).toEqualImmutable(new Map().set('id', new NodeRecord({
            id: 'id',
            nodeType: undefined,
            position: new PositionRecord({ x: 10, y: 10 }),
            nodeSize: new SizeRecord({ width: undefined, height: undefined }),
            attr: new Map(),
        })));
    });

    it('FLOWDESIGNER_NODE_ADD add a new node to the node collection with the right type', () => {
        expect(nodeReducer(new Map(), {
            type: 'FLOWDESIGNER_NODE_ADD',
            nodeId: 'id',
            nodeType: 'MY_NODE_TYPE',
            nodePosition: { x: 10, y: 10 },
        })).toEqualImmutable(new Map().set('id', new NodeRecord({
            id: 'id',
            position: new PositionRecord({ x: 10, y: 10 }),
            nodeType: 'MY_NODE_TYPE',
            nodeSize: new SizeRecord({ width: undefined, height: undefined }),
            attr: new Map(),
        })));
    });

    it('updateNodeType', () => {
        expect(nodeReducer(initialState, {
            type: 'FLOWDESIGNER_NODE_UPDATE_TYPE',
            nodeId: 'id2',
            nodeType: 'new node type',
        })).toEqualImmutable(new Map().set('id1', new NodeRecord({
            id: 'id1',
            position: new PositionRecord({ x: 10, y: 10 }),
            nodeType: 'type1',
            attr: new Map({ selected: true }),
        })).set('id2', new NodeRecord({
            id: 'id2',
            position: new PositionRecord({ x: 10, y: 10 }),
            nodeType: 'new node type',
            attr: new Map({ selected: false }),
        })));
    });

  // TODO
    it('move node update node position', () => {
        expect(nodeReducer(initialState, {
            type: 'FLOWDESIGNER_NODE_MOVE',
            nodeId: 'id2',
            nodePosition: { x: 50, y: 50 },
        })).toEqualImmutable(new Map().set('id1', new NodeRecord({
            id: 'id1',
            position: new PositionRecord({ x: 10, y: 10 }),
            nodeType: 'type1',
            attr: new Map({ selected: true }),
        })).set('id2', new NodeRecord({
            id: 'id2',
            position: new PositionRecord({ x: 50, y: 50 }),
            nodeType: 'type2',
            attr: new Map({ selected: false }),
        })));
    });
});
