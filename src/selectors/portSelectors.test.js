import { Map } from 'immutable';
import * as Selectors from './portSelectors';
import { defaultState } from '../reducers/flow.reducer';
import {
	LinkRecord,
	PortRecord,
} from '../constants/flowdesigner.model';

describe('Testing dataflow selectors', () => {
	const port1 = new PortRecord({
		id: 'id1',
		nodeId: 'nodeId1',
		attributes: new Map({ type: 'SINK' }),
	});
	const port2 = new PortRecord({
		id: 'id2',
		nodeId: 'nodeId1',
		attributes: new Map({ type: 'EMITTER' }),
	});
	const port3 = new PortRecord({
		id: 'id3',
		nodeId: 'nodeId2',
		attributes: new Map({ type: 'SINK' }),
	});
	const port4 = new PortRecord({
		id: 'id4',
		nodeId: 'nodeId2',
		attributes: new Map({ type: 'EMITTER' }),
	});
	const givenState = defaultState.set('links', new Map().set('id1', new LinkRecord({
		id: 'id1',
		source: 'id1',
		target: 'id2',
	})))
		.set('ports', new Map()
			.set('id1', port1)
			.set('id2', port2)
			.set('id3', port3)
			.set('id4', port4));


	it('getEmitterPorts return a map of Emitter ports', () => {
		const expectedPortMap = new Map().set('id2', port2)
			.set('id4', port4);
		expect(Selectors.getEmitterPorts(givenState)).toEqual(expectedPortMap);
	});

	it(`getEmitterPortsForNode return a function
	  wich can be used to retribe emitterPorts form specific node`, () => {
		const expectedPortMap = new Map().set('id2', port2);
		expect(Selectors.getEmitterPortsForNode(givenState)('nodeId1')).toEqual(expectedPortMap);
	});

	it('getSinkPorts return a map of Sink ports ', () => {
		const expectedPortsMap = new Map().set('id1', port1).set('id3', port3);
		expect(Selectors.getSinkPorts(givenState)).toEqual(expectedPortsMap);
	});

	it(`getSinkPortsForNode return a function
	  wich can be used to retribe emitterPorts form specific node`, () => {
		const expectedPortMap = new Map().set('id2', port2);
		expect(Selectors.getEmitterPortsForNode(givenState)('nodeId1')).toEqual(expectedPortMap);
	});
});
