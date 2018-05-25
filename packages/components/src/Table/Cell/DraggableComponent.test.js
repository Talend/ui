import React from 'react';
import renderer from 'react-test-renderer';
import draggable from './DraggableComponent.js';
import TableCell from './TableCell';
import * as TestData from '../TestData';

/**
 * Render a single draggable cell
 */
it('display simple draggable-cell content', () => {
	const element = TestData.element1;
	const draggableCell = draggable(TableCell);
	// Obtain the reference to the component before React DnD wrapping
	const OriginalCell = draggableCell.DecoratedComponent;
	// Stub the React DnD connector functions with an identity function
	const identity = el => el;
	// create React tree
	const tree = renderer
		.create(
			<OriginalCell
				element={element}
				data={element.name}
				className={`classname-of-${element.id}`}
				connectDragSource={identity}
				connectDropTarget={identity}
			/>,
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
