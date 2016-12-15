import { Map } from 'immutable';

import { defaultState } from './flow.reducer';
import linkReducer from './link.reducer';
import { LinkRecord, PortRecord, NodeRecord } from '../constants/flowdesigner.model';

describe('check linkreducer', () => {
	const initialState = defaultState
		.set('nodes', new Map()
			.set('id1', new NodeRecord({
				id: 'id1',
			}))
			.set('id2', new NodeRecord({
				id: 'id2',
			}))
			.set('id3', new NodeRecord({
				id: 'id3',
			})),
		)
		.set('links', new Map()
			.set('id1', new LinkRecord({
				id: 'id1',
				sourceId: 'id1',
				targetId: 'id2',
				attributes: new Map().set('attr', 'attr'),
			})),
		).set('ports', new Map()
			.set('id1', new PortRecord({
				id: 'id1',
				nodeId: 'id1',
			}))
			.set('id2', new PortRecord({
				id: 'id2',
				nodeId: 'id2',
			}))
			.set('id3', new PortRecord({
				id: 'id3',
				nodeId: 'id2',
			}))
			.set('id4', new PortRecord({
				id: 'id4',
				nodeId: 'id1',
			}))
			.set('id5', new PortRecord({
				id: 'id5',
				nodeId: 'id3',
			}))
			.set('id6', new PortRecord({
				id: 'id6',
				nodeID: 'id3',
			})),
		)
		.set('parents', new Map()
			.set('id1', new Map())
			.set('id2', new Map()
				.set('id1', 'id1'),
			)
			.set('id3', new Map()),
		)
		.set('childrens', new Map()
			.set('id1', new Map()
				.set('id2', 'id2'),
			)
			.set('id2', new Map())
			.set('id3', new Map()),
		);

	it('FLOWDESIGNER_LINK_ADD should add a new link to the state', () => {
		const newState = linkReducer(initialState, {
			type: 'FLOWDESIGNER_LINK_ADD',
			linkId: 'id2',
			sourceId: 'id1',
			targetId: 'id2',
		});
		expect(newState).toMatchSnapshot();
		expect(linkReducer(newState, {
			type: 'FLOWDESIGNER_LINK_ADD',
			linkId: 'id3',
			sourceId: 'id3',
			targetId: 'id5',
		})).toMatchSnapshot();
	});

	it('FLOWDESIGNER_LINK_REMOVE should remove link from state', () => {
		expect(linkReducer(initialState, { type: 'FLOWDESIGNER_LINK_REMOVE', linkId: 'id1' }))
			.toMatchSnapshot();
	});


	it('FLOWDESIGNER_LINK_SET_TARGET switch target to correct port if it exist', () => {
		expect(linkReducer(initialState,
			{ type: 'FLOWDESIGNER_LINK_SET_TARGET', linkId: 'id1', targetId: 'id5' },
		)).toMatchSnapshot();
	});

	it('FLOWDESIGNER_LINK_SET_SOURCE switch source to correct port if it exist', () => {
		expect(linkReducer(initialState,
			{ type: 'FLOWDESIGNER_LINK_SET_SOURCE', linkId: 'id1', sourceId: 'id4' },
		)).toMatchSnapshot();
	});

	it('FLOWDESIGNER_LINK_SET_ATTR should merge attributes within link attr property', () => {
		expect(linkReducer(initialState, {
			type: 'FLOWDESIGNER_LINK_SET_ATTR',
			linkId: 'id1',
			attributes: { selected: false },
		})).toMatchSnapshot()
;
});

	it('FLOWDESIGNER_LINK_REMOVE_ATTR should remove a specific attributes from attr map', () => {
		expect(linkReducer(initialState, {
			type: 'FLOWDESIGNER_LINK_REMOVE_ATTR',
			linkId: 'id1',
			attributesKey: 'attr',
		})).toMatchSnapshot();
	});
});
