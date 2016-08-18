import { Map, OrderedMap } from 'immutable';
import matchers from 'jasmine-immutable-matchers';
import * as Selectors from './nodeSelectors';
import {
    NodeRecord,
    PortRecord,
} from '../constants/flowdesigner.model';

describe('Testing node selectors', () => {
    const node1 = new NodeRecord({
        id: 'id1',
    });

    const node2 = new NodeRecord({
        id: 'id2',
    });

    const port1 = new PortRecord({
        id: 'id1',
        nodeId: 'id1',
    });

    const port2 = new PortRecord({
        id: 'id2',
        nodeId: 'id2',
    });
    
    const port3 = new PortRecord({
        id: 'id3',
        nodeId: 'id2',
    });

    const givenState = {
        nodes: new Map()
            .set('id1', node1)
            .set('id2', node2),
        ports: new OrderedMap()
            .set('id1', port1)
            .set('id2', port2)
            .set('id3', port3),
    };

    beforeEach(() => {
        jasmine.addMatchers(matchers);
    });

    it('get node with their attached ports', () => {
        const expectedResult = new Map()
            .set('id1', new Map({ node: node1, ports: new OrderedMap().set('id1', port1) }))
            .set('id2', new Map({ node: node2, ports: new OrderedMap().set('id2', port2).set('id3', port3) }));
        expect(Selectors.getNodesWithPorts(givenState)).toEqualImmutable(expectedResult);
    });
});
