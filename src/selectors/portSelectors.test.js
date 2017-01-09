import { Map } from 'immutable';
import * as Selectors from './portSelectors';
import { defaultState } from '../reducers/flow.reducer';
import {
	LinkRecord,
	PortRecord,
} from '../constants/flowdesigner.model';

const port1 = new PortRecord({
	id: 'id1',
	nodeId: 'nodeId1',
	graphicalAttributes: new Map({ type: 'SINK' }),
});
const port2 = new PortRecord({
	id: 'id2',
	nodeId: 'nodeId1',
	graphicalAttributes: new Map({ type: 'EMITTER' }),
});
const port3 = new PortRecord({
	id: 'id3',
	nodeId: 'nodeId2',
	graphicalAttributes: new Map({ type: 'SINK' }),
});
const port4 = new PortRecord({
	id: 'id4',
	nodeId: 'nodeId2',
	graphicalAttributes: new Map({ type: 'EMITTER' }),
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
	.set('id4', port4),
);

describe('getEmitterPorts', () => {
	it('return a map with port id2', () => {
		expect(Selectors.getEmitterPorts(givenState)).toMatchSnapshot();
	});
});

describe('getSinkPorts', () => {
	it('return a map with port id1 & id3', () => {
		expect(Selectors.getSinkPorts(givenState)).toMatchSnapshot();
	});
});

describe('getEmitterPortsForNode', () => {
	it('return a map with port id2', () => {
		expect(Selectors.getEmitterPortsForNode(givenState)('nodeId1')).toMatchSnapshot();
	});
});
