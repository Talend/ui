import React from 'react';
import renderer from 'react-test-renderer';
import Schema from './Schema.js';
import DefaultDataAccessor from '../DefaultDataAccessor';
import DataAccessorWrapper from '../DataAccessorWrapper';
import DefaultRenderer from '../Schema/SchemaRenderers/DefaultRenderer';

const dataAccessor = new DataAccessorWrapper(new DefaultDataAccessor());

const emptySchema = {
	id: 'schema_1',
	name: 'schema',
	elements: [],
};

const element1 = {
	id: '1',
	name: 'element_1',
	type: 'string',
	description: 'bla bla bla',
};

const element2 = {
	id: '2',
	name: 'element_2',
	type: 'string',
	description: 'bla bla bla',
};

const element3 = {
	id: '3',
	name: 'element_3',
	type: 'string',
	description: 'bla bla bla',
};

const schema = {
	id: 'schema_2',
	name: 'schema',
	elements: [element1, element2, element3],
};

const noFilters = [];

it('single-schema', () => {
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

it('empty-schema', () => {
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
