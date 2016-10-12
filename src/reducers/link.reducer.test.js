import { Map } from 'immutable';

import linkReducer from './link.reducer';
import { LinkRecord, PortRecord } from '../constants/flowdesigner.model';

describe('check linkreducer', () => {
	const initialState = new Map()
		.set('links', new Map()
			.set('id1', new LinkRecord({
				id: 'id1',
				attributes: new Map().set('attr', 'attr'),
			}))
		).set('ports', new Map()
			.set('id1', new PortRecord({
				id: 'id1',
			}))
			.set('id2', new PortRecord({
				id: 'id2',
			}))
		);

	it('FLOWDESIGNER_LINK_ADD should add a new link to the state', () => {
		expect(linkReducer(initialState, {
			type: 'FLOWDESIGNER_LINK_ADD',
			linkId: 'id2',
			sourceId: 'id1',
			targetId: 'id2',
		})).toEqual(new Map()
			.set('links', new Map()
				.set('id1', new LinkRecord({
					id: 'id1',
					attributes: new Map().set('attr', 'attr'),
				}))
				.set('id2', new LinkRecord({
					id: 'id2',
					sourceId: 'id1',
					targetId: 'id2',
					attributes: new Map(),
				}))
			).set('ports', new Map()
				.set('id1', new PortRecord({
					id: 'id1',
				}))
				.set('id2', new PortRecord({
					id: 'id2',
				}))
			));
	});

	it('FLOWDESIGNER_LINK_REMOVE should remove link from state', () => {
		expect(linkReducer(initialState, { type: 'FLOWDESIGNER_LINK_REMOVE', linkId: 'id1' }))
			.toEqual(new Map()
				.set('links', new Map())
				.set('ports', new Map()
					.set('id1', new PortRecord({
						id: 'id1',
					}))
					.set('id2', new PortRecord({
						id: 'id2',
					}))
				));
	});


	it('FLOWDESIGNER_LINK_SET_TARGET switch target to correct port if it exist', () => {
		expect(linkReducer(initialState,
			{ type: 'FLOWDESIGNER_LINK_SET_TARGET', linkId: 'id1', targetId: 'id1' }
		)).toEqual(new Map()
			.set('links', new Map()
				.set('id1', new LinkRecord({
					id: 'id1',
					targetId: 'id1',
					attributes: new Map().set('attr', 'attr'),
				}))
			).set('ports', new Map()
				.set('id1', new PortRecord({
					id: 'id1',
				}))
				.set('id2', new PortRecord({
					id: 'id2',
				}))
			));
	});

	it('FLOWDESIGNER_LINK_SET_SOURCE switch source to correct port if it exist', () => {
		expect(linkReducer(initialState,
			{ type: 'FLOWDESIGNER_LINK_SET_SOURCE', linkId: 'id1', sourceId: 'id1' }
		)).toEqual(new Map()
			.set('links', new Map()
				.set('id1', new LinkRecord({
					id: 'id1',
					sourceId: 'id1',
					attributes: new Map().set('attr', 'attr'),
				}))
			).set('ports', new Map()
				.set('id1', new PortRecord({
					id: 'id1',
				}))
				.set('id2', new PortRecord({
					id: 'id2',
				}))
			));
	});

	it('FLOWDESIGNER_LINK_SET_ATTR should merge attributes within link attr property', () => {
		expect(linkReducer(initialState, {
			type: 'FLOWDESIGNER_LINK_SET_ATTR',
			linkId: 'id1',
			attributes: { selected: false },
		})).toEqual(new Map()
			.set('links', new Map()
				.set('id1', new LinkRecord({
					id: 'id1',
					attributes: new Map().set('attr', 'attr').set('selected', false),
				}))
			).set('ports', new Map()
				.set('id1', new PortRecord({
					id: 'id1',
				}))
				.set('id2', new PortRecord({
					id: 'id2',
				}))
			));
	});

	it('FLOWDESIGNER_LINK_REMOVE_ATTR should remove a specific attributes from attr map', () => {
		expect(linkReducer(initialState, {
			type: 'FLOWDESIGNER_LINK_REMOVE_ATTR',
			linkId: 'id1',
			attributesKey: 'attr',
		})).toEqual(new Map()
			.set('links', new Map()
				.set('id1', new LinkRecord({
					id: 'id1',
					attributes: new Map(),
				}))
			).set('ports', new Map()
				.set('id1', new PortRecord({
					id: 'id1',
				}))
				.set('id2', new PortRecord({
					id: 'id2',
				}))
			));
	});
});
