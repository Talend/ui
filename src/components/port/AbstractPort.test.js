import React from 'react';
import renderer from 'react-test-renderer';
import { fromJS } from 'immutable';

import AbstractPort from './AbstractPort.component';
import { PortRecord, PositionRecord } from '../../constants/flowdesigner.model';


describe('<AbstractPort /> renders correctly', () => {
	it('<AbstractPort /> renders correctly', () => {
		const port = new PortRecord({
			id: 'idPort',
			graphicalAttributes: fromJS({ position: new PositionRecord({ x: 100, y: 100 }) })
			,
		});
		const tree = renderer.create(
			<AbstractPort port={port} />,
		).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
