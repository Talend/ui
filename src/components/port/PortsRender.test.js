import React from 'react';
import renderer from 'react-test-renderer';
import { Map } from 'immutable';

import PortRenderer from './PortsRenderer.component';
import { PortRecord } from '../../constants/flowdesigner.model';


describe('<LinksRenderer /> renders correctly', () => {
    it('<LinksRenderer /> renders correctly', () => {
        const ports = new Map().set('id', new PortRecord({
            id: 'id',

        }));
        const tree = renderer.create(
          <PortRenderer ports={ports} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
