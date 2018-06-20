import React from 'react';
import renderer from 'react-test-renderer';
import Schema from './Schema.js';
import MappingAccessor from '../DataAccessor/MappingAccessor';
import DataAccessorWrapper from '../DataAccessor/DataAccessorWrapper';
import * as TestData from '../TestData';
import { Constants } from '../index';

const dataAccessor = new DataAccessorWrapper(new MappingAccessor());

const emptySchema = {
	id: 'empty_schema',
	name: 'Empty schema',
	elements: [],
};

const element1 = {
	id: 'elem_1',
	name: 'element 1',
	type: 'string',
	description: 'bla bla bla',
};

const element2 = {
	id: 'elem_2',
	name: 'element 2',
	type: 'string',
	description: 'bla bla bla',
};

const element3 = {
	id: 'elem_3',
	name: 'element 3',
	type: 'string',
	description: 'bla bla bla',
};

const schema = {
	id: 'schema',
	name: 'Schema',
	elements: [element1, element2, element3],
};

const noFilters = [];

const columns = [
	TestData.Columns.NAME,
	TestData.Columns.TYPE,
	TestData.Columns.DESC,
];

it('single-schema', () => {
	// create React tree
	const tree = renderer
		.create(
			<Schema
				dataAccessor={dataAccessor}
				schema={schema}
				columns={columns}
			/>,
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

it('empty-schema', () => {
	// create React tree
	const tree = renderer
		.create(
			<Schema
				dataAccessor={dataAccessor}
				schema={emptySchema}
				columns={columns}
			/>,
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
