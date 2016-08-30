import React from 'react';
import renderer from 'react-test-renderer';
import { Map } from 'immutable';

import NodesRenderer from './NodesRenderer.component';
import { NodeRecord } from '../../constants/flowdesigner.model';

const MockNode = () => (
  <span>MockLink</span>
);


describe('<LinksRenderer /> renders correctly', () => {
    it('<LinksRenderer /> renders correctly', () => {
        const nodes = new Map().set('id', new NodeRecord({
            id: 'id',
            nodeType: 'id',

        }));
        const nodeTypeMap = {
            id: { id: 'id', component: MockNode },
        };
        const tree = renderer.create(
          <NodesRenderer nodes={nodes} nodeTypeMap={nodeTypeMap} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
