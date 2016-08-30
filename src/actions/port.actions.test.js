import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Map, OrderedMap } from 'immutable';

import * as portActions from './port.actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Check that port action creators generate proper' +
    ' action objects and perform checking', () => {

    it('addPort', () => {
        const expectedActions = [{
            type: 'FLOWDESIGNER_PORT_ADD',
            nodeId: 'nodeId',
            portId: 'portId',
            portType: 'portType',
            attr: { selected: true },
        }];

        const store = mockStore({
            flowDesigner: {
                nodes: new Map({ nodeId: { id: 'nodeId', nodeType: 'type' } }),
                ports: new Map(),
            },
        });

        store.dispatch(portActions.addPort('nodeId', 'portId', 'portType', { selected: true }));
        expect(store.getActions()).toEqual(expectedActions);
    });


    it('setPortAttribute', () => {
        const expectedActions = [{
            type: 'FLOWDESIGNER_PORT_SET_ATTR',
            portId: 'id',
            attr: { selected: true },
        }];

        const store = mockStore({
            flowDesigner: {
                ports: new Map({ id: { id: 'portId', portType: 'type' } }),
            },
        });

        store.dispatch(portActions.setPortAttribute('id', { selected: true }));

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('setPortAttribute throw an error if said port doesn\'t exist', () => {
        const store = mockStore({
            flowDesigner: {
                ports: new Map({ id: { id: 'portId', linkType: 'type' } }),
            },
        });

        expect(() => {
            store.dispatch(portActions.setPortAttribute('nonexistingId', { selected: true }));
        }).toThrowError('Can\'t set an attribute on non existing port nonexistingId');
    });

    it('setPortAttribute do not dispatch an action if said port doesn\'t exist', () => {
        const store = mockStore({
            flowDesigner: {
                ports: new Map({ id: { id: 'portId', linkType: 'type' } }),
            },
        });
        expect(() => {
            store.dispatch(portActions.setPortAttribute('nonexistingId', { selected: true }));
        }).toThrowError('Can\'t set an attribute on non existing port nonexistingId');
        expect(store.getActions()).toEqual([]);
    });


    it('removePortAttribute', () => {
        const expectedActions = [{
            type: 'FLOWDESIGNER_PORT_REMOVE_ATTR',
            portId: 'id',
            attrKey: 'selected',
        }];

        const store = mockStore({
            flowDesigner: {
                ports: new Map({ id: { id: 'portId' } }),
            },
        });

        store.dispatch(portActions.removePortAttribute('id', 'selected'));

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('removePortAttribute throw an error if said port doesn\'t exist', () => {
        const store = mockStore({
            flowDesigner: {
                ports: new Map({ id: { id: 'portId' } }),
            },
        });

        expect(() => {
            store.dispatch(portActions.removePortAttribute('nonexistingId', 'selected'));
        }).toThrowError('Can\'t remove an attribute on non existing port nonexistingId');
    });

    it('removePortAttribute do not dispatch an action if said port doesn\'t exist', () => {
        const store = mockStore({
            flowDesigner: {
                ports: new Map({ id: { id: 'portId' } }),
            },
        });
        expect(() => {
            store.dispatch(portActions.removePortAttribute('nonexistingId', 'selected'));
        }).toThrowError('Can\'t remove an attribute on non existing port nonexistingId');
        expect(store.getActions()).toEqual([]);
    });

    it('removePort', () => {
        const expectedActions = [{
            type: 'FLOWDESIGNER_PORT_REMOVE',
            portId: 'portId',
        }];

        const store = mockStore({
            flowDesigner: {
                ports: new Map({ portId: { id: 'portId' } }),
            },
        });

        store.dispatch(portActions.removePort('portId'));
        expect(store.getActions()).toEqual(expectedActions);
    });
});
