import React from 'react';
import renderer from 'react-test-renderer';
import SchemaElement from './SchemaElement.js';
import DefaultDataAccessor from '../../DefaultDataAccessor';
import DataAccessorWrapper from '../../DataAccessorWrapper';

const dataAccessor = new DataAccessorWrapper(new DefaultDataAccessor());

it('single-element', () => {
	// create React tree
	const tree = renderer
		.create(<SchemaElement dataAccessor={dataAccessor} element="Single_element" />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

it('mapped-element', () => {
	// create React tree
	const tree = renderer
		.create(
			<SchemaElement
				dataAccessor={dataAccessor}
				element="Mapped_element"
				mapped={true}
			/>
		).toJSON();
	expect(tree).toMatchSnapshot();
});

it('highlighted-element', () => {
	// create React tree
	const tree = renderer
		.create(
			<SchemaElement
				dataAccessor={dataAccessor}
				element="Highlighted_element"
				highlighted={true}
			/>,
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
