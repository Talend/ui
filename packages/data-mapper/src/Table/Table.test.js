import React from 'react';
import renderer from 'react-test-renderer';
import Table from './Table';
import * as TestData from './TestData';

const elements = [TestData.element1, TestData.element2];

/**
 * Render a table with default configuration.
 * Only elements and column keys are specified.
 */
describe('Render a table width default configuration', () => {
	it('default-table', () => {
		// create React tree
		const tree = renderer
			.create(<Table elements={elements} columns={TestData.columns1} />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});

/**
 * Render a table with custom configuration.
 */
describe('Render a table width custom configuration', () => {
	it('custom-table', () => {
		// create React tree
		const tree = renderer
			.create(
				<Table
					elements={elements}
					columns={TestData.columns1}
					rowsClassName={TestData.rowsClassName}
				/>,
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});

/**
 * Render a table with header and default configuration.
 * Header is rendered with default component.
 */
describe('Render a table width default header', () => {
	it('default-table-with-header', () => {
		// create React tree
		const tree = renderer
			.create(<Table elements={elements} columns={TestData.columns1} withHeader />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});

/**
 * Render a table with header and with custom configuration.
 */
describe('Render a table width custom header', () => {
	it('custom-table-with-header', () => {
		// create React tree
		const tree = renderer
			.create(
				<Table
					elements={elements}
					rowsClassName={TestData.rowsClassName}
					columns={TestData.columns1}
					withHeader
				/>,
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
