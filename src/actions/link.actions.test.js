/* eslint-disable import/no-extraneous-dependencies */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Map } from 'immutable';

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
				attributes: { selected: true },
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
				attributes: { selected: true },
			}];

			const store = mockStore({
				flowDesigner: {
					links: new Map({ id: { id: 'linkId', linkType: 'type' } }),
				},
			});

			store.dispatch(linkActions.setLinkAttribute('id', { selected: true }));

			expect(store.getActions()).toEqual(expectedActions);
		});

		it('removeLinkAttribute', () => {
			const expectedActions = [{
				type: 'FLOWDESIGNER_LINK_REMOVE_ATTR',
				linkId: 'id',
				attributesKey: 'selected',
			}];

			const store = mockStore({
				flowDesigner: {
					links: new Map({ id: { id: 'linkId', linkType: 'type' } }),
				},
			});

			store.dispatch(linkActions.removeLinkAttribute('id', 'selected'));

			expect(store.getActions()).toEqual(expectedActions);
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
