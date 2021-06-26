import React, { Component } from 'react';
import renderer from 'react-test-renderer';
import TestBackend from 'react-dnd-test-backend';
import { DragDropContext } from 'react-dnd';
import Schema from './Schema';
import DataAccessorWrapper from '../DataAccessor/DataAccessorWrapper';
import * as TestData from '../TestData';
import Constants from '../Constants';

const columns = [TestData.Columns.NAME, TestData.Columns.TYPE, TestData.Columns.DESC];
const sorters = {};

/**
 * Wraps a component into a DragDropContext that uses the TestBackend.
 */
function wrapInTestContext(DecoratedComponent) {
	return DragDropContext(TestBackend)(
		class TestContextContainer extends Component {
			render() {
				return <DecoratedComponent {...this.props} />;
			}
		},
	);
}

describe('Schema', () => {
	it('should accept a single schema', () => {
		const dataAccessor = new DataAccessorWrapper();
		dataAccessor.registerSchema(TestData.schema1, Constants.MappingSide.INPUT);
		const SchemaTestContext = wrapInTestContext(Schema);
		// create React tree
		const tree = renderer
			.create(
				<SchemaTestContext
					dataAccessor={dataAccessor}
					schema={TestData.schema1}
					columns={columns}
					sorters={sorters}
				/>,
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('empty-schema', () => {
		const dataAccessor = new DataAccessorWrapper();
		dataAccessor.registerSchema(TestData.emptySchema, Constants.MappingSide.INPUT);
		// create React tree
		const tree = renderer
			.create(
				<Schema
					dataAccessor={dataAccessor}
					schema={TestData.emptySchema}
					columns={columns}
					sorters={sorters}
				/>,
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
