import * as Selectors from './portSelectors';
import { defaultState } from '../reducers/flow.reducer';
import { LinkRecord } from '../constants/flowdesigner.model';
import { PORT_SINK, PORT_SOURCE } from '../constants/flowdesigner.constants';
import { Port } from '../api';
import { State } from '../customTypings/index.d';

const port1 = Port.create('id1', 'nodeId1', 0, PORT_SINK, 'reactComponentType');
const port2 = Port.create('id2', 'nodeId1', 0, PORT_SOURCE, 'reactComponentType');
const port3 = Port.create('id3', 'nodeId2', 0, PORT_SINK, 'reactComponentType');
const port4 = Port.create('id4', 'nodeId2', 0, PORT_SOURCE, 'reactComponentType');

const givenState: Partial<State> = {
	...defaultState,
	links: {
		id1: new LinkRecord({
			id: 'id1',
			source: 'id1',
			target: 'id2',
		}),
	},
	ports: {
		id1: port1,
		id2: port2,
		id3: port3,
		id4: port4,
	},
};

describe('getEmitterPorts', () => {
	it('return a map with port id2 && id4', () => {
		// given
		// when
		const result = Selectors.getEmitterPorts(givenState);
		// expect
		expect('id2' in result).toBe(true);
		expect('id4' in result).toBe(true);
	});
});

describe('getSinkPorts', () => {
	it('return a map with port id1 & id3', () => {
		// given
		// when
		const result = Selectors.getSinkPorts(givenState);
		// expect
		expect('id1' in result).toBe(true);
		expect('id3' in result).toBe(true);
	});
});

describe('getEmitterPortsForNode', () => {
	it('return a map with port id2', () => {
		// given
		// when
		const result = Selectors.getEmitterPortsForNode(givenState)('nodeId1');
		// expect
		expect('id2' in result).toBe(true);
	});
});

describe('getSinkPortsForNode', () => {
	it('return a map with port id1', () => {
		// given
		// when
		const result = Selectors.getSinkPortsForNode(givenState)('nodeId1');
		// expect
		expect('id1' in result).toBe(true);
	});
});
