import React from 'react';
import renderer from 'react-test-renderer';
import draggable from './DraggableComponent.js';
import TableCell from './TableCell';
import * as TestData from './TestData';

/**
 * Render a single draggable cell
 */
it('display simple draggable-cell content', () => {
	const draggableCell = draggable(TableCell);
	// Obtain the reference to the component before React DnD wrapping
	const OriginalCell = draggableCell.DecoratedComponent;
	// Stub the React DnD connector functions with an identity function
	const identity = el => el;
	// create React tree
	const tree = renderer
		.create(
			<OriginalCell
				element={TestData.element1}
				data={TestData.element1.name}
				className={`classname-of-${TestData.element1.id}`}
				connectDragSource={identity}
				connectDropTarget={identity}
			/>,
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
