import React from 'react';
import renderer from 'react-test-renderer';
import Table from './Table';
import * as TestData from './TestData';

const elements = [TestData.element1, TestData.element2];

/**
 * Render a table with default configuration.
 * Only elements and column keys are specified.
 */
it('default-table', () => {
	// create React tree
	const tree = renderer
		.create(<Table elements={elements} columnKeys={TestData.columnKeys} />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

/**
 * Render a table with custom configuration.
 */
it('custom-table', () => {
	// create React tree
	const tree = renderer
		.create(
			<Table
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
 * Render a table with header and default configuration.
 * Header is rendered with default component.
 */
it('default-table-with-header', () => {
	// create React tree
	const tree = renderer
		.create(<Table elements={elements} columnKeys={TestData.columnKeys} withHeader />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

/**
 * Render a table with header and with custom configuration.
 */
it('custom-table-with-header', () => {
	// create React tree
	const tree = renderer
		.create(
			<Table
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
