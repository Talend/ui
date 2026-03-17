/* eslint-disable import/no-extraneous-dependencies */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Map } from 'immutable';

import * as linkActions from './link.actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Check that link action creators generate proper action objects and perform checking', () => {
	it('addLink', () => {
		const store = mockStore({
			flowDesigner: {
				links: Map(),
				ports: Map({
					id1: { id: 'portId', portType: 'type' },
					id2: { id: 'portId', portType: 'type' },
				}),
			},
		});

		store.dispatch(
			linkActions.addLink('linkId', 'sourceId', 'targetId', {
				graphicalAttributes: { selected: true },
			}),
		);
		expect(store.getActions()).toMatchSnapshot();
	});

	it('setLinkTarget', () => {
		const store = mockStore({
			flowDesigner: {
				links: Map({ linkId: { id: 'linkId' } }),
				ports: Map({ id1: { id: 'portId', portType: 'type' } }),
			},
		});

		store.dispatch(linkActions.setLinkTarget('linkId', 'portId'));

		expect(store.getActions()).toMatchSnapshot();
	});

	it('setLinkSource', () => {
		const store = mockStore({
			flowDesigner: {
				links: Map({ linkId: { id: 'linkId' } }),
				ports: Map({ id1: { id: 'portId', portType: 'type' } }),
			},
		});

		store.dispatch(linkActions.setLinkSource('linkId', 'portId'));

		expect(store.getActions()).toMatchSnapshot();
	});

	it('setLinkGraphicalAttributes', () => {
		const store = mockStore({
			flowDesigner: {
				links: Map({ id: { id: 'linkId', linkType: 'type' } }),
			},
		});

		store.dispatch(linkActions.setLinkGraphicalAttributes('id', { selected: true }));

		expect(store.getActions()).toMatchSnapshot();
	});

	it('removeLinkGrahicalAttribute', () => {
		const store = mockStore({
			flowDesigner: {
				links: Map({ id: { id: 'linkId', linkType: 'type' } }),
			},
		});

		store.dispatch(linkActions.removeLinkGraphicalAttribute('id', 'selected'));

		expect(store.getActions()).toMatchSnapshot();
	});

	it('setLinkData', () => {
		const store = mockStore({
			flowDesigner: {
				links: Map({ id: { id: 'linkId', linkType: 'type' } }),
			},
		});

		store.dispatch(linkActions.setLinkData('id', { type: 'test' }));

		expect(store.getActions()).toMatchSnapshot();
	});

	it('removeLinkData', () => {
		const store = mockStore({
			flowDesigner: {
				links: Map({ id: { id: 'linkId', linkType: 'type' } }),
			},
		});

		store.dispatch(linkActions.removeLinkData('id', 'type'));

		expect(store.getActions()).toMatchSnapshot();
	});

	it('removeLink', () => {
		const store = mockStore({
			flowDesigner: {
				links: Map({ id: { id: 'linkId' } }),
			},
		});

		store.dispatch(linkActions.removeLink('id'));
		expect(store.getActions()).toMatchSnapshot();
	});
});
