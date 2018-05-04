import React, { Component } from 'react';
import TestBackend from 'react-dnd-test-backend';
import { DragDropContext } from 'react-dnd';
import TestUtils from 'react-dom/test-utils';
import SimpleTable from './SimpleTable';
import Cell from './Cell';
import DraggableComponent from './DraggableComponent';
import * as TestData from './TestData';

const elements = [TestData.element1, TestData.element2];

function getComponentByName(components, name) {
	return components.find(comp => comp.props.element.name === name);
}

/**
 * Wraps a component into a DragDropContext that uses the TestBackend.
 */
function wrapInTestContext(DecoratedComponent) {
	return DragDropContext(TestBackend)(
		class TestContextContainer extends Component {
			render() {
				return <DecoratedComponent {...this.props} />;
			}
		},
	);
}

const draggableCell = DraggableComponent(Cell);

/**
* This tests the drag and drop of the element1 onto the element2.
*/
it('drag-and-drop-on-simple-table', () => {

	const dndListener = {
		beginDrag: jest.fn().mockReturnValue(TestData.element1),
		canDrop: jest.fn().mockReturnValue(true),
		drop: jest.fn(),
		endDrag: jest.fn(),
	};

	const draggableRowRenderer = {
		needRowUpdate() {
			return true;
		},
		getCellComponent(columnKey) {
			if (columnKey === TestData.KEYS.NAME) {
				return draggableCell;
			}
			return Cell;
		},
		getExtraProps() {
			return dndListener;
		},
	};

	const TableTestContext = wrapInTestContext(SimpleTable);

	const table = (
		<TableTestContext
			elements={elements}
			classNameProvider={TestData.classNameProvider}
			columnKeys={TestData.columnKeys}
			rowDataGetter={TestData.rowDataGetter}
			rowRenderer={draggableRowRenderer}
			headerRenderer={TestData.headerRenderer}
		/>
	);

	const root = TestUtils.renderIntoDocument(table);

	// Obtain a reference to the test backend
	const backend = root.getManager().getBackend();

	// Find the drag source ID and use it to simulate the dragging operation
	const draggableCells = TestUtils.scryRenderedComponentsWithType(root, draggableCell);

	const sourceElem = getComponentByName(draggableCells, TestData.element1.name);

	const decoratedSourceElem = sourceElem.getDecoratedComponentInstance();

	// simulate begin drag source node
	backend.simulateBeginDrag([decoratedSourceElem.getHandlerId()]);

	expect(dndListener.beginDrag).toBeCalled();

	const targetElem = getComponentByName(draggableCells, TestData.element2.name);

	// simulate drag node element1 over target node element2
	backend.simulateHover([targetElem.getHandlerId()]);

	// simulate drop the source node on the current target node element2
	backend.simulateDrop();

	// dndListener.drop should be called
	expect(dndListener.drop).toBeCalled();

	// The dndListener.drop function is called once
	expect(dndListener.drop.mock.calls.length).toBe(1);

	// The first argument of the first call to the function was element1
	expect(dndListener.drop.mock.calls[0][0].id).toBe(TestData.element1.id);

	// The second argument of the first call to the function was element2
	expect(dndListener.drop.mock.calls[0][1].id).toBe(TestData.element2.id);

	backend.simulateEndDrag();

	expect(dndListener.endDrag).toBeCalled();

});
