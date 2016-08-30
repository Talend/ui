import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Map, OrderedMap } from 'immutable';

import * as linkActions from './link.actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Check that link action creators generate proper' +
    ' action objects and perform checking', () => {
    it('addLink', () => {
        const expectedActions = [{
            type: 'FLOWDESIGNER_LINK_ADD',
            linkId: 'linkId',
            sourceId: 'sourceId',
            targetId: 'targetId',
            linkType: 'linkType',
            attr: { selected: true },
        }];

        const store = mockStore({
            flowDesigner: {
                links: new Map(),
                ports: new Map({
                    id1: { id: 'portId', portType: 'type' },
                    id2: { id: 'portId', portType: 'type' },
                }),
            },
        });

        store.dispatch(
            linkActions.addLink('linkId', 'sourceId', 'targetId', 'linkType', { selected: true })
        );
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('setLinkTarget', () => {
        const expectedActions = [{
            type: 'FLOWDESIGNER_LINK_SET_TARGET',
            linkId: 'linkId',
            targetId: 'portId',
        }];

        const store = mockStore({
            flowDesigner: {
                links: new Map({ linkId: { id: 'linkId' } }),
                ports: new Map({ id1: { id: 'portId', portType: 'type' } }),
            },
        });

        store.dispatch(linkActions.setLinkTarget('linkId', 'portId'));

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('setLinkSource', () => {
        const expectedActions = [{
            type: 'FLOWDESIGNER_LINK_SET_SOURCE',
            linkId: 'linkId',
            sourceId: 'portId',
        }];

        const store = mockStore({
            flowDesigner: {
                links: new Map({ linkId: { id: 'linkId' } }),
                ports: new Map({ id1: { id: 'portId', portType: 'type' } }),
            },
        });

        store.dispatch(linkActions.setLinkSource('linkId', 'portId'));

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('setLinkAttribute', () => {
        const expectedActions = [{
            type: 'FLOWDESIGNER_LINK_SET_ATTR',
            linkId: 'id',
            attr: { selected: true },
        }];

        const store = mockStore({
            flowDesigner: {
                links: new Map({ id: { id: 'linkId', linkType: 'type' } }),
            },
        });

        store.dispatch(linkActions.setLinkAttribute('id', { selected: true }));

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('setLinkAttribute throw an error if said link doesn\'t exist', () => {
        const store = mockStore({
            flowDesigner: {
                links: new Map({ id: { id: 'linkId', linkType: 'type' } }),
            },
        });

        expect(() => {
            store.dispatch(linkActions.setLinkAttribute('nonexistingId', { selected: true }));
        }).toThrowError('Can\'t set an attribute on non existing link nonexistingId');
    });

    it('setLinkAttribute do not dispatch an action if said link doesn\'t exist', () => {
        const store = mockStore({
            flowDesigner: {
                links: new Map({ id: { id: 'linkId', linkType: 'type' } }),
            },
        });
        expect(() => {
            store.dispatch(linkActions.setLinkAttribute('nonexistingId', { selected: true }));
        }).toThrowError('Can\'t set an attribute on non existing link nonexistingId');
        expect(store.getActions()).toEqual([]);
    });

    it('removeLinkAttribute', () => {
        const expectedActions = [{
            type: 'FLOWDESIGNER_LINK_REMOVE_ATTR',
            linkId: 'id',
            attrKey: 'selected',
        }];

        const store = mockStore({
            flowDesigner: {
                links: new Map({ id: { id: 'linkId', linkType: 'type' } }),
            },
        });

        store.dispatch(linkActions.removeLinkAttribute('id', 'selected'));

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('removeLinkAttribute throw an error if said link doesn\'t exist', () => {
        const store = mockStore({
            flowDesigner: {
                links: new Map({ id: { id: 'linkId', linkType: 'type' } }),
            },
        });

        expect(() => {
            store.dispatch(linkActions.removeLinkAttribute('nonexistingId', 'selected'));
        }).toThrowError('Can\'t remove an attribute on non existing link nonexistingId');
    });

    it('removeLinkAttribute do not dispatch an action if said link doesn\'t exist', () => {
        const store = mockStore({
            flowDesigner: {
                links: new Map({ id: { id: 'linkId', linkType: 'type' } }),
            },
        });
        expect(() => {
            store.dispatch(linkActions.removeLinkAttribute('nonexistingId', 'selected'));
        }).toThrowError('Can\'t remove an attribute on non existing link nonexistingId');
        expect(store.getActions()).toEqual([]);
    });

    it('removeLink', () => {
        const expectedActions = [{
            type: 'FLOWDESIGNER_LINK_REMOVE',
            linkId: 'id',
        }];

        const store = mockStore({
            flowDesigner: {
                links: new Map({ id: { id: 'linkId' } }),
            },
        });

        store.dispatch(linkActions.removeLink('id'));
        expect(store.getActions()).toEqual(expectedActions);
    });
});
