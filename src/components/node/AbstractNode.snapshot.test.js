jest.mock('d3-selection', () => ({
    select() {
        return { data() {}, call() {} };
    },
}));

import React from 'react';
import renderer from 'react-test-renderer';

import AbstractNode from './AbstractNode.component';
import { NodeRecord, PositionRecord } from '../../constants/flowdesigner.model';


describe('<AbstractNode /> renders correctly', () => {
    it('<AbstractNode /> renders correctly', () => {
        const node = new NodeRecord({
            id: 'nodeId',
            position: new PositionRecord({ x: 100, y: 100 }),
        });
        const tree = renderer.create(
          <AbstractNode node={node}>
            <rect />
          </AbstractNode>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
