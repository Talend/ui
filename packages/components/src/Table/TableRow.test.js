import React from 'react';
import renderer from 'react-test-renderer';
import TableRow from './TableRow';
import * as TestData from './TestData';

/**
 * Render a single row
 */
it('single-row', () => {
	// create React tree
	const tree = renderer
		.create(
			<TableRow
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
