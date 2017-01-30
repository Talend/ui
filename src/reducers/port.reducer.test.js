import { Map, OrderedMap } from 'immutable';

import { defaultState } from './flow.reducer';
import portReducer from './port.reducer';
import { PortRecord, PositionRecord } from '../constants/flowdesigner.model';

describe('Check port reducer', () => {
	const initialState = defaultState.set('ports', new OrderedMap()
		.set('id1', new PortRecord({
			id: 'id1',
			data: new Map({ type: 'test' }),
			graphicalAttributes: new Map({ type: 'test', position: new PositionRecord({ x: 10, y: 10 }) }),
		}))
		.set('id2', new PortRecord({
			id: 'id2',
			graphicalAttributes: new Map({ position: new PositionRecord({ x: 10, y: 10 }) }),
		}))
		.set('id3', new PortRecord({
			id: 'id3',
			graphicalAttributes: new Map({ position: new PositionRecord({ x: 10, y: 10 }) }),
		})))
		.set('nodes', new Map().set('nodeId', new Map())).set('links', new Map());

	it('FLOWDESIGNER_PORT_ADD properly add the port to the port OrderedMap', () => {
		expect(portReducer(initialState, {
			type: 'FLOWDESIGNER_PORT_ADD',
			nodeId: 'nodeId',
			portId: 'portId',
			graphicalAttributes: { portType: 'portType', properties: { type: 'EMITTER' } },
		})).toMatchSnapshot();
	});

	it('FLOWDESIGNER_PORT_ADDS to add multiple ports (portId1, portId2) to port collection', () => {
		expect(portReducer(initialState, {
			type: 'FLOWDESIGNER_PORT_ADDS',
			nodeId: 'nodeId',
			ports: [{
				portId: 'portId1',
				graphicalAttributes: { portType: 'portType', properties: { type: 'EMITTER' } },
			}, {
				portId: 'portId2',
				graphicalAttributes: { portType: 'portType', properties: { type: 'SINK' } },
			}],
		})).toMatchSnapshot();
	});

	it('FLOWDESIGNER_PORT_SET_GRAPHICAL_ATTRIBUTES to merge { selected: true } on port id1 graphicalAttribute map', () => {
		expect(portReducer(initialState, {
			type: 'FLOWDESIGNER_PORT_SET_GRAPHICAL_ATTRIBUTES',
			portId: 'id1',
			graphicalAttributes: { selected: true },
		})).toMatchSnapshot();
	});

	it('FLOWDESIGNER_PORT_REMOVE_GRAPHICAL_ATTRIBUTES to remove attr on port id1 graphicalAttribute map', () => {
		expect(portReducer(initialState, {
			type: 'FLOWDESIGNER_PORT_REMOVE_GRAPHICAL_ATTRIBUTES',
			portId: 'id1',
			graphicalAttributesKey: 'attr',
		})).toMatchSnapshot();
	});

	it('FLOWDESIGNER_PORT_SET_DATA to merge { type: \'string\' } on port id1 data map', () => {
		expect(portReducer(initialState, {
			type: 'FLOWDESIGNER_PORT_SET_DATA',
			portId: 'id1',
			data: { type: 'string' },
		})).toMatchSnapshot();
	});

	it('FLOWDESIGNER_PORT_REMOVE_DATA remove type on port id1 on port data map', () => {
		expect(portReducer(initialState, {
			type: 'FLOWDESIGNER_PORT_REMOVE_DATA',
			portId: 'id1',
			dataKey: 'type',
		})).toMatchSnapshot();
	});

	it('FLOWDESIGNER_PORT_REMOVE should remove port id1 from ports collection', () => {
		expect(portReducer(initialState, {
			type: 'FLOWDESIGNER_PORT_REMOVE',
			portId: 'id1',
		})).toMatchSnapshot();
	});
});
