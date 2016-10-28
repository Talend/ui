import { Map, OrderedMap } from 'immutable';

import { defaultState } from './flow.reducer';
import portReducer from './port.reducer';
import { PortRecord, PositionRecord } from '../constants/flowdesigner.model';

describe('Check port reducer', () => {
	const initialState = defaultState.set('ports', new OrderedMap()
		.set('id1', new PortRecord({
			id: 'id1',
			position: new PositionRecord({ x: 10, y: 10 }),
			attributes: new Map().set('attr', 'attr'),
		}))
		.set('id2', new PortRecord({
			id: 'id2',
			position: new PositionRecord({ x: 10, y: 10 }),
		}))
		.set('id3', new PortRecord({
			id: 'id3',
			position: new PositionRecord({ x: 10, y: 10 }),
		})))
		.set('nodes', new Map().set('nodeId', new Map())).set('links', new Map());

	it('FLOWDESIGNER_PORT_ADD properly add the port to the port OrderedMap', () => {
		expect(portReducer(initialState, {
			type: 'FLOWDESIGNER_PORT_ADD',
			nodeId: 'nodeId',
			portId: 'portId',
			portType: 'portType',
			attributes: { clicked: true, type: 'EMITTER' },
		})).toMatchSnapshot();
	});

	it('FLOWDESIGNER_PORT_ADDS to add multiple ports to port collection', () => {
		expect(portReducer(initialState, {
			type: 'FLOWDESIGNER_PORT_ADDS',
			nodeId: 'nodeId',
			ports: [{
				portId: 'portId1',
				portType: 'portType',
				attributes: { type: 'EMITTER' },
			}, {
				portId: 'portId2',
				portType: 'portType',
				attributes: { type: 'SINK' },
			}],
		})).toMatchSnapshot();
	});

	it('FLOWDESIGNER_PORT_SET_ATTR to merge a new attributes in attribute collection', () => {
		expect(portReducer(initialState, {
			type: 'FLOWDESIGNER_PORT_SET_ATTR',
			portId: 'id1',
			attributes: { selected: true },
		})).toMatchSnapshot();
	});

	it('FLOWDESIGNER_PORT_REMOVE_ATTR to remove attr from attr map', () => {
		expect(portReducer(initialState, {
			type: 'FLOWDESIGNER_PORT_REMOVE_ATTR',
			portId: 'id1',
			attributesKey: 'attr',
		})).toMatchSnapshot();
	});

	it('FLOWDESIGNER_PORT_REMOVE should remove port from ports collection', () => {
		expect(portReducer(initialState, {
			type: 'FLOWDESIGNER_PORT_REMOVE',
			portId: 'id1',
		})).toMatchSnapshot();
	});
});
