import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Map, OrderedMap } from 'immutable';

import * as nodeActions from './node.actions';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Check that node action creators generate proper' +
    ' action objects and perform checking', () => {
    it('addNode generate action with 0 configuration', () => {
        const expectedActions = [{
            type: 'FLOWDESIGNER_NODE_ADD',
            nodeId: 'id',
            nodePosition: { x: 75, y: 75 },
            nodeSize: { width: 50, heigth: 50 },
            nodeType: 'nodeType',
            attr: {},
        }];

        const store = mockStore({
            flowDesigner: {
                nodes: new Map({}),
            },
        });

        store.dispatch(nodeActions.addNode('id', { x: 75, y: 75 }, { width: 50, heigth: 50 }, 'nodeType', {}));

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('addNode should throw if a node already exist with same id', () => {
        const store = mockStore({
            flowDesigner: {
                nodes: new Map({ nodeId: { id: 'nodeId', nodeType: 'type' } }),
            },
        });

        expect(() => {
            store.dispatch(nodeActions.addNode('nodeId'));
        }).toThrowError('Can not create node nodeId since it does already exist');
    });

    it('addNode should throw if a node already exist with same id and not dispatch action', () => {
        const store = mockStore({
            flowDesigner: {
                nodes: new Map({ nodeId: { id: 'nodeId', nodeType: 'type' } }),
            },
        });

        expect(() => {
            store.dispatch(nodeActions.addNode('nodeId'));
        }).toThrowError('Can not create node nodeId since it does already exist');
        expect(store.getActions()).toEqual([]);
    });

    it('moveNode generate a proper action object witch nodeId and nodePosition parameter', () => {
        const expectedActions = [{
            type: 'FLOWDESIGNER_NODE_MOVE',
            nodeId: 'nodeId',
            nodePosition: { x: 10, y: 20 },
        }];

        const store = mockStore({
            flowDesigner: {
                nodes: new Map({ nodeId: { id: 'nodeId', nodeType: 'type' } }),
                nodeTypes: new Map({
                    type: new Map({
                        component: { calculatePortPosition: () => ({}) },
                    }),
                }),
                ports: new OrderedMap(),
            },
        });

        store.dispatch(nodeActions.moveNodeTo('nodeId', { x: 10, y: 20 }, {}));

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('setNodeSize', () => {
        const expectedActions = [{
            type: 'FLOWDESIGNER_NODE_SET_SIZE',
            nodeId: 'nodeId',
            nodeSize: { width: 100, height: 100 },
        }];

        const store = mockStore({
            flowDesigner: {
                nodes: new Map({ nodeId: { id: 'nodeId', nodeType: 'type' } }),
            },
        });

        store.dispatch(nodeActions.setNodeSize('nodeId', { width: 100, height: 100 }));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('setNodeAttribute', () => {
        const expectedActions = [{
            type: 'FLOWDESIGNER_NODE_SET_ATTR',
            nodeId: 'id',
            attr: { selected: true },
        }];

        const store = mockStore({
            flowDesigner: {
                nodes: new Map({ id: { id: 'nodeId', nodeType: 'type' } }),
            },
        });

        store.dispatch(nodeActions.setNodeAttribute('id', { selected: true }));

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('setNodeAttribute throw an error if said node doesn\'t exist', () => {
        const store = mockStore({
            flowDesigner: {
                nodes: new Map({ id: { id: 'nodeId', nodeType: 'type' } }),
            },
        });

        expect(() => {
            store.dispatch(nodeActions.setNodeAttribute('nonexistingId', { selected: true }));
        }).toThrowError('Can\'t set an attribute on non existing node nonexistingId');
    });

    it('setNodeAttribute do not dispatch an action if said node doesn\'t exist', () => {
        const store = mockStore({
            flowDesigner: {
                nodes: new Map({ id: { id: 'nodeId', nodeType: 'type' } }),
            },
        });
        expect(() => {
            store.dispatch(nodeActions.setNodeAttribute('nonexistingId', { selected: true }));
        }).toThrowError('Can\'t set an attribute on non existing node nonexistingId');
        expect(store.getActions()).toEqual([]);
    });

    it('removeNodeAttribute', () => {
        const expectedActions = [{
            type: 'FLOWDESIGNER_NODE_REMOVE_ATTR',
            nodeId: 'id',
            attrKey: 'selected',
        }];

        const store = mockStore({
            flowDesigner: {
                nodes: new Map({ id: { id: 'nodeId', nodeType: 'type' } }),
            },
        });

        store.dispatch(nodeActions.removeNodeAttribute('id', 'selected'));

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('removeNodeAttribute throw an error if said node doesn\'t exist', () => {
        const store = mockStore({
            flowDesigner: {
                nodes: new Map({ id: { id: 'nodeId', nodeType: 'type' } }),
            },
        });

        expect(() => {
            store.dispatch(nodeActions.removeNodeAttribute('nonexistingId', 'selected'));
        }).toThrowError('Can\'t remove an attribute on non existing node nonexistingId');
    });

    it('removeNodeAttribute do not dispatch an action if said node doesn\'t exist', () => {
        const store = mockStore({
            flowDesigner: {
                nodes: new Map({ id: { id: 'nodeId', nodeType: 'type' } }),
            },
        });
        expect(() => {
            store.dispatch(nodeActions.removeNodeAttribute('nonexistingId', 'selected'));
        }).toThrowError('Can\'t remove an attribute on non existing node nonexistingId');
        expect(store.getActions()).toEqual([]);
    });

    it('removeNode', () => {
        const expectedActions = [{
            type: 'FLOWDESIGNER_NODE_REMOVE',
            nodeId: 'id',
        }];

        const store = mockStore({
            flowDesigner: {
                nodes: new Map({ id: { id: 'nodeId', nodeType: 'type' } }),
            },
        });

        store.dispatch(nodeActions.removeNode('id'));

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('removeNode should throw if targeted node doesn\'t exist', () => {
        const store = mockStore({
            flowDesigner: {
                nodes: new Map({ id: { id: 'nodeId', nodeType: 'type' } }),
            },
        });

        expect(() => {
            store.dispatch(nodeActions.removeNode('nodeId'));
        }).toThrowError('Can not remove node nodeId since it doesn\'t exist');
    });

    it('removeNode should not dispatch an action if targeted node doesn\'t exist', () => {
        const store = mockStore({
            flowDesigner: {
                nodes: new Map({ id: { id: 'nodeId', nodeType: 'type' } }),
            },
        });

        expect(() => {
            store.dispatch(nodeActions.removeNode('nodeId'));
        }).toThrowError('Can not remove node nodeId since it doesn\'t exist');

        expect(store.getActions()).toEqual([]);
    });
});
