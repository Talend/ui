import React from 'react';
import renderer from 'react-test-renderer';
import LinkHandle from './LinkHandle.component';
import { PositionRecord } from '../../constants/flowdesigner.model';

const MockComponent = () => <g />;

describe('<LinkHandle /> renders correctly', () => {
	it('<LinkHandle /> renders correctly', () => {
		const children = <MockComponent />;
		const position = new PositionRecord({ x: 10, y: 10 });
		const tree = renderer
			.create(<LinkHandle position={position} component={children} />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
