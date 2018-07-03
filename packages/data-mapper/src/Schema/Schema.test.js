import React from 'react';
import renderer from 'react-test-renderer';
import Schema from './Schema.js';
import DataAccessorWrapper from '../DataAccessor/DataAccessorWrapper';
import * as TestData from '../TestData';
import { Constants } from '../index';

const dataAccessor = new DataAccessorWrapper();

const columns = [TestData.Columns.NAME, TestData.Columns.TYPE, TestData.Columns.DESC];

describe('Schema', () => {
	it('should accept a single schema', () => {
		// create React tree
		const tree = renderer
			.create(<Schema dataAccessor={dataAccessor} schema={TestData.schema1} columns={columns} />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('empty-schema', () => {
		// create React tree
		const tree = renderer
			.create(
				<Schema dataAccessor={dataAccessor} schema={TestData.emptySchema} columns={columns} />,
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
