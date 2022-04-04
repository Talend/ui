import React from 'react';
import renderer from 'react-test-renderer';

import ZoomHandler, { transformToString } from './ZoomHandler.component';

describe('ZoomHandler renders correctly', () => {
	describe('<ZoomHandler /> renders correctly', () => {
		it('<ZoomHandler /> renders correctly', () => {
			// given
			const transform = { x: 0, y: 0, k: 1 };

			// when
			const tree = renderer
				.create(
					<ZoomHandler transform={transform}>
						<rect />
						<rect />
					</ZoomHandler>,
				)
				.toJSON();

			// expect
			expect(tree).toMatchSnapshot();
		});
	});
	describe('transformToString', () => {
		// https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform
		it('generate proper transform string', () => {
			// given
			const transform = { x: 1, y: 2, k: -3 };

			// when
			const stringResult = transformToString(transform);

			// expect
			expect(stringResult).toEqual(
				`translate(${transform.x}, ${transform.y}) scale(${transform.k})`,
			);
		});
	});
});
