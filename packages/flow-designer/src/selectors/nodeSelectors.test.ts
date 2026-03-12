import * as Selectors from './nodeSelectors';
import {
	NodeRecord,
	NestedNodeRecord,
	PortRecord,
	LinkRecord,
	LinkGraphicalAttributes,
} from '../constants/flowdesigner.model';
import { State } from '../customTypings/index.d';

describe('Testing node selectors', () => {
	const node1 = new NodeRecord({
		id: 'id1',
	});

	const node2 = new NodeRecord({
		id: 'id2',
	});

	const node3 = new NodeRecord({
		id: 'id3',
	});

	const node4 = new NodeRecord({
		id: 'id4',
	});

	const node5 = new NodeRecord({
		id: 'id5',
	});

	const node6 = new NodeRecord({
		id: 'id6',
	});

	const node7 = new NodeRecord({
		id: 'id7',
	});

	const node8 = new NodeRecord({
		id: 'id8',
	});

	const port1 = new PortRecord({
		id: 'port1',
		nodeId: 'id1',
	});

	const port2 = new PortRecord({
		id: 'port2',
		nodeId: 'id2',
	});

	const port3 = new PortRecord({
		id: 'port3',
		nodeId: 'id2',
	});

	const port4 = new PortRecord({
		id: 'id4',
		nodeId: 'id2',
	});

	const port5 = new PortRecord({
		id: 'id5',
		nodeId: 'id3',
	});

	const port6 = new PortRecord({
		id: 'id6',
		nodeId: 'id3',
	});

	const port7 = new PortRecord({
		id: 'id7',
		nodeId: 'id4',
	});

	const port8 = new PortRecord({
		id: 'id8',
		nodeId: 'id4',
	});

	const port9 = new PortRecord({
		id: 'id9',
		nodeId: 'id5',
	});

	const port10 = new PortRecord({
		id: 'id10',
		nodeId: 'id5',
	});

	const port11 = new PortRecord({
		id: 'id11',
		nodeId: 'id6',
	});

	const port12 = new PortRecord({
		id: 'id12',
		nodeId: 'id6',
	});

	const port13 = new PortRecord({
		id: 'id13',
		nodeId: 'id7',
	});

	const port14 = new PortRecord({
		id: 'id14',
		nodeId: 'id7',
	});

	const port15 = new PortRecord({
		id: 'id15',
		nodeId: 'id7',
	});

	const port16 = new PortRecord({
		id: 'id16',
		nodeId: 'id8',
	});

	const link1 = new LinkRecord({
		id: 'id1',
		sourceId: 'id1',
		targetId: 'id2',
		graphicalAttributes: new LinkGraphicalAttributes({ attr: 'attr' }),
	});

	const link2 = new LinkRecord({
		id: 'id2',
		sourceId: 'id3',
		targetId: 'id5',
		graphicalAttributes: new LinkGraphicalAttributes({ attr: 'attr' }),
	});
	const link3 = new LinkRecord({
		id: 'id3',
		sourceId: 'id6',
		targetId: 'id9',
		graphicalAttributes: new LinkGraphicalAttributes({ attr: 'attr' }),
	});
	const link4 = new LinkRecord({
		id: 'id4',
		sourceId: 'id10',
		targetId: 'id13',
		graphicalAttributes: new LinkGraphicalAttributes({ attr: 'attr' }),
	});
	const link5 = new LinkRecord({
		id: 'id5',
		sourceId: 'id15',
		targetId: 'id16',
		graphicalAttributes: new LinkGraphicalAttributes({ attr: 'attr' }),
	});
	const link6 = new LinkRecord({
		id: 'id6',
		sourceId: 'id4',
		targetId: 'id7',
		graphicalAttributes: new LinkGraphicalAttributes({ attr: 'attr' }),
	});
	const link7 = new LinkRecord({
		id: 'id7',
		sourceId: 'id8',
		targetId: 'id11',
		graphicalAttributes: new LinkGraphicalAttributes({ attr: 'attr' }),
	});
	const link8 = new LinkRecord({
		id: 'id8',
		sourceId: 'id12',
		targetId: 'id14',
		graphicalAttributes: new LinkGraphicalAttributes({ attr: 'attr' }),
	});

	const givenState: State = {
		nodes: {
			id1: node1,
			id2: node2,
			id3: node3,
			id4: node4,
			id5: node5,
			id6: node6,
			id7: node7,
			id8: node8,
		},
		ports: {
			id1: port1,
			id2: port2,
			id3: port3,
			id4: port4,
			id5: port5,
			id6: port6,
			id7: port7,
			id8: port8,
			id9: port9,
			id10: port10,
			id11: port11,
			id12: port12,
			id13: port13,
			id14: port14,
			id15: port15,
			id16: port16,
		},
		links: {
			id1: link1,
			id2: link2,
			id3: link3,
			id4: link4,
			id5: link5,
			id6: link6,
			id7: link7,
			id8: link8,
		},
		parents: {
			id1: {},
			id2: { id1: 'id1' },
			id3: { id2: 'id2' },
			id4: { id2: 'id2' },
			id5: { id3: 'id3' },
			id6: { id4: 'id4' },
			id7: { id5: 'id5', id6: 'id6' },
			id8: { id7: 'id7' },
		},
		childrens: {
			id1: { id2: 'id2' },
			id2: { id3: 'id3', id4: 'id4' },
			id3: { id5: 'id5' },
			id4: { id6: 'id6' },
			id5: { id7: 'id7' },
			id6: { id7: 'id7' },
			id7: { id8: 'id8' },
			id8: {},
		},
		out: {},
		in: {},
		nodeTypes: {},
		transform: { k: 1, x: 0, y: 0 },
		transformToApply: undefined,
	};

	it('node1 should not have any predecessors', () => {
		expect(Selectors.getPredecessors(givenState, 'id1')).toMatchSnapshot();
	});

	it('node1 should have 7 successors', () => {
		expect(Selectors.getSuccessors(givenState, 'id1')).toMatchSnapshot();
	});

	it('node8 should have 7 predecessors', () => {
		expect(Selectors.getPredecessors(givenState, 'id8')).toMatchSnapshot();
	});

	it('node8 should not have any successors', () => {
		expect(Selectors.getSuccessors(givenState, 'id8')).toMatchSnapshot();
	});

	it('node4 should have node1, node2 as predecessors', () => {
		expect(Selectors.getPredecessors(givenState, 'id4')).toMatchSnapshot();
	});

	it('node4 should have node6, node7, node8 as successors', () => {
		expect(Selectors.getSuccessors(givenState, 'id4')).toMatchSnapshot();
	});
});

describe('Testing node selectors on nested nodes', () => {
	const nodeA1 = new NestedNodeRecord({
		id: 'nodeIdA1',
		components: {},
	});
	const nodeA = new NestedNodeRecord({
		id: 'nodeIdA',
		components: { nodeIdA1: nodeA1 },
	});

	const nodeB = new NestedNodeRecord({
		id: 'nodeIdB',
	});

	const givenState: State = {
		nodes: { nodeIdA: nodeA, nodeIdB: nodeB },
		ports: {},
		links: {},
		parents: {},
		childrens: {},
		out: {},
		in: {},
		nodeTypes: {},
		transform: { k: 1, x: 0, y: 0 },
		transformToApply: undefined,
	};

	it('nodeA should not have 1 embeded child and node B 0 children', () => {
		expect(Object.keys(givenState.nodes['nodeIdA'].components).length).toBe(1);
		expect(Object.keys(givenState.nodes['nodeIdB'].components).length).toBe(0);
	});
});
