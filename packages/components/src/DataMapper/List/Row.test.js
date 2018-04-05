import React from 'react';
import renderer from 'react-test-renderer';
import Row from './Row';
import * as TestData from './TestData';

it('single-row', () => {
	// create React tree
	const tree = renderer
		.create(
			<Row
				element={TestData.element1}
				classNameProvider={TestData.classNameProvider}
				dataKeys={TestData.dataKeys}
				rowDataGetter={TestData.rowDataGetter}
				rowRenderers={TestData.rowRenderers}
			/>,
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

it('single-row mandatory', () => {
	// create React tree
	const tree = renderer
		.create(
			<Row
				element={TestData.element2}
				classNameProvider={TestData.classNameProvider}
				dataKeys={TestData.dataKeys}
				rowDataGetter={TestData.rowDataGetter}
				rowRenderers={TestData.rowRenderers}
			/>,
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
