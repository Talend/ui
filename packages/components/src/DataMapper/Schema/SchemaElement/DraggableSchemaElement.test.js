import React from 'react';
import DraggableSchemaElement from './DraggableSchemaElement.js';
import renderer from 'react-test-renderer';

it('single-element', () => {
	// Obtain the reference to the component before React DnD wrapping
	const OriginalSchemaElement = DraggableSchemaElement.DecoratedComponent;
	// Stub the React DnD connector functions with an identity function
	const identity = el => el;
	// create React tree
	const tree = renderer
		.create(
			<OriginalSchemaElement
				name="Single_element"
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
				name="Mapped_element"
				mapped="true"
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
				name="Drag_over_element"
				dragOver="true"
				connectDragSource={identity}
				connectDropTarget={identity}
			/>,
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
