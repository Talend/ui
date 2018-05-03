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
				columnKeys={TestData.columnKeys}
				rowDataGetter={TestData.rowDataGetter}
				rowRenderer={TestData.rowRenderer}
			/>,
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
