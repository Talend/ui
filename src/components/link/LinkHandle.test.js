import React from 'react';
import { Map } from 'immutable';
import renderer from 'react-test-renderer';
import LinkHandle from './LinkHandle.component';

const mockComponent = () => <g />;

describe('<LinkHandle /> renders correctly', () => {
	it('<LinkHandle /> renders correctly', () => {
		const children = <mockComponent />;
		const tree = renderer
			.create(<LinkHandle position={Map({ x: 10, y: 10 })} component={children} />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
