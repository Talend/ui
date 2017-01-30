import React from 'react';
import { Map } from 'immutable';
import renderer from 'react-test-renderer';
import LinkHandle from './LinkHandle.component';

describe('<LinkHandle /> renders correctly', () => {
	it('<LinkHandle /> renders correctly', () => {
		const tree = renderer.create(
			<LinkHandle position={Map({ x: 10, y: 10 })} />,
		).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
