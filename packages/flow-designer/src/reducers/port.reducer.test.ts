import { defaultState } from './flow.reducer';
import portReducer from './port.reducer';
import {
	PortRecord,
	PortData,
	PortGraphicalAttributes,
	PositionRecord,
} from '../constants/flowdesigner.model';
import { PORT_SINK, PORT_SOURCE } from '../constants/flowdesigner.constants';

describe('Check port reducer', () => {
	const initialState = {
		...defaultState,
		ports: {
			id1: new PortRecord({
				id: 'id1',
				data: new PortData({ type: 'test' }),
				graphicalAttributes: new PortGraphicalAttributes({
					type: 'test',
					position: new PositionRecord({ x: 10, y: 10 }),
				}),
			}),
			id2: new PortRecord({
				id: 'id2',
				nodeId: 'test',
				graphicalAttributes: new PortGraphicalAttributes({
					position: new PositionRecord({ x: 10, y: 10 }),
				}),
			}),
			id3: new PortRecord({
				id: 'id3',
				graphicalAttributes: new PortGraphicalAttributes({
					position: new PositionRecord({ x: 10, y: 10 }),
				}),
			}),
		},
		nodes: { nodeId: {} },
		links: {},
	};

	it('FLOWDESIGNER_PORT_ADD properly add the port to the port Map', () => {
		expect(
			portReducer(initialState, {
				type: 'FLOWDESIGNER_PORT_ADD',
				nodeId: 'nodeId',
				id: 'portId',
				data: { flowType: 'string', properties: {} },
				graphicalAttributes: {
					portType: 'portType',
					properties: { type: PORT_SOURCE, index: 1 },
				},
			}),
		).toMatchSnapshot();
	});

	it('FLOWDESIGNER_PORT_ADDS to add multiple ports (portId1, portId2) to port collection', () => {
		expect(
			portReducer(initialState, {
				type: 'FLOWDESIGNER_PORT_ADDS',
				nodeId: 'nodeId',
				ports: [
					{
						id: 'portId1',
						nodeId: 'nodeId',
						data: { flowType: 'string', properties: {} },
						graphicalAttributes: {
							portType: 'portType',
							properties: { type: PORT_SOURCE },
						},
					},
					{
						id: 'portId2',
						nodeId: 'nodeId',
						data: { flowType: 'string', properties: {} },
						graphicalAttributes: {
							portType: 'portType',
							properties: { type: PORT_SINK },
						},
					},
					{
						id: 'portId3',
						nodeId: 'nodeId',
						data: { flowType: 'string', properties: {} },
						graphicalAttributes: {
							portType: 'portType',
							properties: { type: PORT_SINK },
						},
					},
				],
			}),
		).toMatchSnapshot();
	});

	it('FLOWDESIGNER_PORT_SET_GRAPHICAL_ATTRIBUTES to merge { selected: true } on port id1 graphicalAttribute map', () => {
		expect(
			portReducer(initialState, {
				type: 'FLOWDESIGNER_PORT_SET_GRAPHICAL_ATTRIBUTES',
				portId: 'id1',
				graphicalAttributes: { selected: true },
			}),
		).toMatchSnapshot();
	});

	it('FLOWDESIGNER_PORT_REMOVE_GRAPHICAL_ATTRIBUTES to remove attr on port id1 graphicalAttribute map', () => {
		expect(
			portReducer(initialState, {
				type: 'FLOWDESIGNER_PORT_REMOVE_GRAPHICAL_ATTRIBUTES',
				portId: 'id1',
				graphicalAttributesKey: 'attr',
			}),
		).toMatchSnapshot();
	});

	it("FLOWDESIGNER_PORT_SET_DATA to merge { type: 'string' } on port id1 data map", () => {
		expect(
			portReducer(initialState, {
				type: 'FLOWDESIGNER_PORT_SET_DATA',
				portId: 'id1',
				data: { type: 'string' },
			}),
		).toMatchSnapshot();
	});

	it('FLOWDESIGNER_PORT_REMOVE_DATA remove type on port id1 on port data map', () => {
		expect(
			portReducer(initialState, {
				type: 'FLOWDESIGNER_PORT_REMOVE_DATA',
				portId: 'id1',
				dataKey: 'type',
			}),
		).toMatchSnapshot();
	});

	it('FLOWDESIGNER_PORT_REMOVE should only remove port id1 from ports collection', () => {
		expect(
			portReducer(initialState, {
				type: 'FLOWDESIGNER_PORT_REMOVE',
				portId: 'id1',
			}),
		).toMatchSnapshot();
	});

	it('FLOWDESIGNER_PORT_REMOVE should only remove port id2 from ports collection if its parent node does not exist', () => {
		expect(
			portReducer(initialState, {
				type: 'FLOWDESIGNER_PORT_REMOVE',
				portId: 'id2',
			}),
		).toMatchSnapshot();
	});
});
