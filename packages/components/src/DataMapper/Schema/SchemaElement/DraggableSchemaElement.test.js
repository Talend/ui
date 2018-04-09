import React from 'react';
import renderer from 'react-test-renderer';
import DraggableSchemaElement from './DraggableSchemaElement.js';
import DefaultDataAccessor from '../../DefaultDataAccessor';
import DataAccessorWrapper from '../../DataAccessorWrapper';

const dataAccessor = new DataAccessorWrapper(new DefaultDataAccessor());

it('single-element', () => {
	// Obtain the reference to the component before React DnD wrapping
	const OriginalSchemaElement = DraggableSchemaElement.DecoratedComponent;
	// Stub the React DnD connector functions with an identity function
	const identity = el => el;
	// create React tree
	const tree = renderer
		.create(
			<OriginalSchemaElement
				dataAccessor={dataAccessor}
				element="Single_element"
				connectDragSource={identity}
				connectDropTarget={identity}
			/>,
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

it('mapped-element', () => {
	// Obtain the reference to the component before React DnD wrapping
	const OriginalSchemaElement = DraggableSchemaElement.DecoratedComponent;
	// Stub the React DnD connector functions with an identity function
	const identity = el => el;
	// create React tree
	const tree = renderer
		.create(
			<OriginalSchemaElement
				dataAccessor={dataAccessor}
				element="Mapped_element"
				mapped={true}
				connectDragSource={identity}
				connectDropTarget={identity}
			/>,
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

it('drag-over-element', () => {
	// Obtain the reference to the component before React DnD wrapping
	const OriginalSchemaElement = DraggableSchemaElement.DecoratedComponent;
	// Stub the React DnD connector functions with an identity function
	const identity = el => el;
	// create React tree
	const tree = renderer
		.create(
			<OriginalSchemaElement
				dataAccessor={dataAccessor}
				element="Drag_over_element"
				dragOver={true}
				connectDragSource={identity}
				connectDropTarget={identity}
			/>,
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
