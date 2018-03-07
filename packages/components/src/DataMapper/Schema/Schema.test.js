import React from 'react';
import renderer from 'react-test-renderer';
import Schema from './Schema.js';

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
	const tree = renderer.create(<Schema schema={schema} />).toJSON();
	expect(tree).toMatchSnapshot();
});

it('empty-schema', () => {
	// create React tree
	const tree = renderer.create(<Schema schema={emptySchema} />).toJSON();
	expect(tree).toMatchSnapshot();
});
