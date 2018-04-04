import React from 'react';
import renderer from 'react-test-renderer';
import Schema from './Schema.js';
import DefaultDataAccessor from '../DefaultDataAccessor';
import DataAccessorWrapper from '../DataAccessorWrapper';
import DefaultRenderer from '../Schema/SchemaRenderers/DefaultRenderer';
import ListRenderer from '../Schema/SchemaRenderers/ListRenderer';
import * as Constants from '../Constants';

const dataAccessor = new DataAccessorWrapper(new DefaultDataAccessor());

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

const columnKeys = [
	Constants.Schema.DATA_KEYS.NAME,
	Constants.Schema.DATA_KEYS.TYPE,
	Constants.Schema.DATA_KEYS.DESC,
];

it('single-schema [default renderer]', () => {
	// create React tree
	const tree = renderer
		.create(
			<Schema
				dataAccessor={dataAccessor}
				schema={schema}
				SchemaRenderer={DefaultRenderer}
				filters={noFilters}
			/>,
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

it('empty-schema [default renderer]', () => {
	// create React tree
	const tree = renderer
		.create(
			<Schema
				dataAccessor={dataAccessor}
				schema={emptySchema}
				SchemaRenderer={DefaultRenderer}
				filters={noFilters}
			/>,
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

it('single-schema [list renderer]', () => {
	// create React tree
	const tree = renderer
		.create(
			<Schema
				dataAccessor={dataAccessor}
				schema={schema}
				SchemaRenderer={ListRenderer}
				filters={noFilters}
				columnKeys={columnKeys}
			/>,
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

it('empty-schema [list renderer]', () => {
	// create React tree
	const tree = renderer
		.create(
			<Schema
				dataAccessor={dataAccessor}
				schema={emptySchema}
				SchemaRenderer={ListRenderer}
				filters={noFilters}
				columnKeys={columnKeys}
			/>,
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
