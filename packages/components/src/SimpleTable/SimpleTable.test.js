import React from 'react';
import renderer from 'react-test-renderer';
import SimpleTable from './SimpleTable';
import * as TestData from './TestData';

const elements = [TestData.element1, TestData.element2];

it('simple-table', () => {
	// create React tree
	const tree = renderer
		.create(
			<SimpleTable
				elements={elements}
				classNameProvider={TestData.classNameProvider}
				columnKeys={TestData.columnKeys}
				rowDataGetter={TestData.rowDataGetter}
				rowRenderer={TestData.rowRenderer}
			/>,
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

it('simple-table-with-header', () => {
	// create React tree
	const tree = renderer
		.create(
			<SimpleTable
				elements={elements}
				classNameProvider={TestData.classNameProvider}
				columnKeys={TestData.columnKeys}
				rowDataGetter={TestData.rowDataGetter}
				rowRenderer={TestData.rowRenderer}
        headerRenderer={TestData.headerRenderer}
			/>,
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
