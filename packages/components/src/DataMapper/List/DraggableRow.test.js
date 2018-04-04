import React from 'react';
import renderer from 'react-test-renderer';
import * as TestData from './TestData';
import DraggableRow from './DraggableRow';

it('single-row', () => {
	// Obtain the reference to the component before React DnD wrapping
	const OriginalRow = DraggableRow.DecoratedComponent;
	// Stub the React DnD connector functions with an identity function
	const identity = el => el;
	// create React tree
	const tree = renderer
		.create(
			<OriginalRow
				element={TestData.element1}
				classNameProvider={TestData.classNameProvider}
				dataKeys={TestData.dataKeys}
				rowDataGetter={TestData.rowDataGetter}
				rowRenderers={TestData.rowRenderers}
				connectDragSource={identity}
				connectDropTarget={identity}
			/>,
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
