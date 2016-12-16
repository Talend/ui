/* eslint-disable import/no-extraneous-dependencies, react/jsx-filename-extension */
import React from 'react';
import renderer from 'react-test-renderer';

import ZoomHandler from './ZoomHandler.component';


describe('<ZoomHandler /> renders correctly', () => {
	it('<ZoomHandler /> renders correctly', () => {
		const tree = renderer.create(
			<ZoomHandler transform={{ x: 0, y: 0, k: 1 }}>
				<rect />
			</ZoomHandler>
		).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
