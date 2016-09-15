import { Map, OrderedMap } from 'immutable';

import portReducer from './port.reducer';
import { PortRecord, PositionRecord } from '../constants/flowdesigner.model';

describe('Check port reducer', () => {
	const initialState = new Map().set('ports', new OrderedMap()
		.set('id1', new PortRecord({
			id: 'id1',
			position: new PositionRecord({ x: 10, y: 10 }),
			attr: new Map().set('attr', 'attr'),
		}))
		.set('id2', new PortRecord({
			id: 'id2',
			position: new PositionRecord({ x: 10, y: 10 }),
		}))
		.set('id3', new PortRecord({
			id: 'id3',
			position: new PositionRecord({ x: 10, y: 10 }),
		})))
        .set('nodes', new Map().set('nodeId', new Map()));

	it('FLOWDESIGNER_PORT_ADD properly add the port to the port OrderedMap', () => {
		expect(portReducer(initialState, {
			type: 'FLOWDESIGNER_PORT_ADD',
			nodeId: 'nodeId',
			portId: 'portId',
			portType: 'portType',
			attr: { clicked: true },
		})).toEqual(new Map().set('ports', new OrderedMap().set('id1', new PortRecord({
			id: 'id1',
			position: new PositionRecord({ x: 10, y: 10 }),
			attr: new Map().set('attr', 'attr'),
		}))
		.set('id2', new PortRecord({
			id: 'id2',
			position: new PositionRecord({ x: 10, y: 10 }),
		}))
		.set('id3', new PortRecord({
			id: 'id3',
			position: new PositionRecord({ x: 10, y: 10 }),
		}))
		.set('portId', new PortRecord({
			id: 'portId',
			nodeId: 'nodeId',
			portType: 'portType',
			attr: new Map({ clicked: true }),
		})))
        .set('nodes', new Map().set('nodeId', new Map())));
	});

	it('FLOWDESIGNER_PORT_ADDS to add multiple ports to port collection', () => {
		expect(portReducer(initialState, {
			type: 'FLOWDESIGNER_PORT_ADDS',
			nodeId: 'nodeId',
			ports: [{
				portId: 'portId1',
				portType: 'portType',
			}, {
				portId: 'portId2',
				portType: 'portType',
			}],
		})).toEqual(new Map().set('ports', new OrderedMap().set('id1', new PortRecord({
			id: 'id1',
			position: new PositionRecord({ x: 10, y: 10 }),
			attr: new Map().set('attr', 'attr'),
		}))
		.set('id2', new PortRecord({
			id: 'id2',
			position: new PositionRecord({ x: 10, y: 10 }),
		}))
		.set('id3', new PortRecord({
			id: 'id3',
			position: new PositionRecord({ x: 10, y: 10 }),
		}))
		.set('portId1', new PortRecord({
			id: 'portId1',
			nodeId: 'nodeId',
			position: undefined,
			portType: 'portType',
			attr: new Map(),
		}))
		.set('portId2', new PortRecord({
			id: 'portId2',
			nodeId: 'nodeId',
			position: undefined,
			portType: 'portType',
			attr: new Map(),
		})))
        .set('nodes', new Map().set('nodeId', new Map())));
	});

	it('FLOWDESIGNER_PORT_SET_ATTR to merge a new attributes in attribute collection', () => {
		expect(portReducer(initialState, {
			type: 'FLOWDESIGNER_PORT_SET_ATTR',
			portId: 'id1',
			attr: { selected: true },
		})).toEqual(new Map().set('ports', new OrderedMap().set('id1', new PortRecord({
			id: 'id1',
			position: new PositionRecord({ x: 10, y: 10 }),
			attr: new Map().set('attr', 'attr').set('selected', true),
		}))
		.set('id2', new PortRecord({
			id: 'id2',
			position: new PositionRecord({ x: 10, y: 10 }),
		}))
		.set('id3', new PortRecord({
			id: 'id3',
			position: new PositionRecord({ x: 10, y: 10 }),
		})))
        .set('nodes', new Map().set('nodeId', new Map())));
	});

	it('FLOWDESIGNER_PORT_REMOVE_ATTR to remove attr from attr map', () => {
		expect(portReducer(initialState, {
			type: 'FLOWDESIGNER_PORT_REMOVE_ATTR',
			portId: 'id1',
			attrKey: 'attr',
		})).toEqual(new Map().set('ports', new OrderedMap().set('id1', new PortRecord({
			id: 'id1',
			position: new PositionRecord({ x: 10, y: 10 }),
			attr: new Map(),
		}))
		.set('id2', new PortRecord({
			id: 'id2',
			position: new PositionRecord({ x: 10, y: 10 }),
		}))
		.set('id3', new PortRecord({
			id: 'id3',
			position: new PositionRecord({ x: 10, y: 10 }),
		})))
        .set('nodes', new Map().set('nodeId', new Map())));
	});

	it('FLOWDESIGNER_PORT_REMOVE should remove port from ports collection', () => {
		expect(portReducer(initialState, {
			type: 'FLOWDESIGNER_PORT_REMOVE',
			portId: 'id1',
		})).toEqual(new Map().set('ports', new OrderedMap()
		.set('id2', new PortRecord({
			id: 'id2',
			position: new PositionRecord({ x: 10, y: 10 }),
		}))
		.set('id3', new PortRecord({
			id: 'id3',
			position: new PositionRecord({ x: 10, y: 10 }),
		})))
        .set('nodes', new Map().set('nodeId', new Map())));
	});
});
