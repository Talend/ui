import React from 'react';
import renderer from 'react-test-renderer';

import Port from './Port.component';
import { PortRecord, PositionRecord } from '../../constants/flowdesigner.model';


describe('<Port /> renders correctly', () => {
    it('<Port /> renders correctly', () => {
        const port = new PortRecord({
            id: 'idPort',
            position: new PositionRecord({ x: 100, y: 100 }),
        });
        const tree = renderer.create(
          <Port port={port} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
