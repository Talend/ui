import React from 'react';
import renderer from 'react-test-renderer';
import TableRow from './TableRow';
import * as TestData from '../TestData';

/**
 * Render a single row
 */
it('single-row', () => {
	// create React tree
	const tree = renderer
		.create(
			<TableRow
				element={TestData.element1}
				index={0}
				classNames={TestData.classNames}
				columns={TestData.columns1}
				rowDataGetter={TestData.rowDataGetter}
			/>,
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
