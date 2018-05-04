import React from 'react';
import renderer from 'react-test-renderer';
import SimpleTable from './SimpleTable';
import * as TestData from './TestData';

const elements = [TestData.element1, TestData.element2];

/**
* Render a simple table with default configuration.
* Only elements and column keys are specified.
*/
it('default-simple-table', () => {
	// create React tree
	const tree = renderer
		.create(
			<SimpleTable
				elements={elements}
				columnKeys={TestData.columnKeys}
			/>,
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

/**
* Render a simple table with custom configuration.
*/
it('simple-table', () => {
	// create React tree
	const tree = renderer
		.create(
			<SimpleTable
				elements={elements}
				columnKeys={TestData.columnKeys}
				classNameProvider={TestData.classNameProvider}
				rowDataGetter={TestData.rowDataGetter}
				rowRenderer={TestData.rowRenderer}
			/>,
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

/**
* Render a simple table with header and default configuration.
* Header is rendered with default component.
*/
it('simple-table-with-default-header', () => {
	// create React tree
	const tree = renderer
		.create(
			<SimpleTable
				elements={elements}
				columnKeys={TestData.columnKeys}
				withHeader
			/>,
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

/**
* Render a simple table with header and with custom configuration.
*/
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
				withHeader
				headerRenderer={TestData.headerRenderer}
			/>,
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
