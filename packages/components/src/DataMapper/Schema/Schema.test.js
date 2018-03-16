import React from 'react';
import renderer from 'react-test-renderer';
import Schema from './Schema.js';
import DefaultDataAccessor from '../DefaultDataAccessor';
import DataAccessorWrapper from '../DataAccessorWrapper';

const dataAccessor = new DataAccessorWrapper(new DefaultDataAccessor());

const emptySchema = {
	name: 'schema',
	elements: [],
};
const schema = {
	name: 'schema',
	elements: ['element_1', 'element_2', 'element_3'],
};

it('single-schema', () => {
	// create React tree
	const tree = renderer.create(<Schema dataAccessor={dataAccessor} schema={schema} />).toJSON();
	expect(tree).toMatchSnapshot();
});

it('empty-schema', () => {
	// create React tree
	const tree = renderer
		.create(<Schema dataAccessor={dataAccessor} schema={emptySchema} />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
