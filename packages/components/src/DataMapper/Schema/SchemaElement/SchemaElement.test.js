import React from 'react';
import SchemaElement from './SchemaElement.js';
import renderer from 'react-test-renderer';

it('single-element', () => {
	// create React tree
	const tree = renderer.create(<SchemaElement name="Single_element" />).toJSON();
	expect(tree).toMatchSnapshot();
});

it('mapped-element', () => {
	// create React tree
	const tree = renderer.create(<SchemaElement name="Mapped_element" mapped="true" />).toJSON();
	expect(tree).toMatchSnapshot();
});

it('highlighted-element', () => {
	// create React tree
	const tree = renderer
		.create(<SchemaElement name="Highlighted_element" highlighted="true" />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
