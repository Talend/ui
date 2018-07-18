import { mount } from 'enzyme';
import React, { Component } from 'react';
import TestBackend from 'react-dnd-test-backend';
import { DragDropContext } from 'react-dnd';
import TestUtils from 'react-dom/test-utils';
import MapperComponent from './Mapper.component.js';
import DataAccessorWrapper from './DataAccessor/DataAccessorWrapper';
import { Constants } from './index';
import * as TestData from './TestData';

function getElementByName(elements, name) {
	return elements.find(elem => elem.props.element.name === name);
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

const preferences = {
	showAll: false,
};

const input = {
	schema: TestData.schema1,
	columns: TestData.Columns,
};

const output = {
	schema: TestData.schema2,
	columns: TestData.Columns,
};

it('perform-mapping', () => {
	const item = {
		element: TestData.element1,
		side: Constants.MappingSide.INPUT,
	};
	const dndListener = {
		beginDrag: jest.fn().mockReturnValue(item),
		dndInProgress: jest.fn(),
		canDrop: jest.fn().mockReturnValue(true),
		drop: jest.fn(),
		endDrag: jest.fn(),
	};
	const mapping = [];

	const MapperTestContext = wrapInTestContext(MapperComponent);

	const dataAccessor = new DataAccessorWrapper();
	dataAccessor.registerSchema(input.schema, Constant.MappingSide.INPUT);
	dataAccessor.registerSchema(output.schema, Constant.MappingSide.OUTPUT);

	const mapper = (
		<MapperTestContext
			dataAccessor={dataAccessor}
			mapping={mapping}
			input={input}
			output={output}
			dndListener={dndListener}
			preferences={preferences}
		/>
	);

	const root = TestUtils.renderIntoDocument(mapper);

	// Obtain a reference to the test backend
	const backend = root.getManager().getBackend();

	// Find the drag source ID and use it to simulate the dragging operation
	const elements = TestUtils.scryRenderedComponentsWithType(root, DraggableComponent);

	const sourceElem = getElementByName(elements, 'elem_1');

	const decoratedSourceElem = sourceElem.getDecoratedComponentInstance();

	// simulate begin drag source node 'elem_1'
	backend.simulateBeginDrag([decoratedSourceElem.getHandlerId()]);

	const targetElem = getElementByName(elements, 'elem_5');

	// simulate drag node 'elem_1' over target node 'elem_5'
	backend.simulateHover([targetElem.getHandlerId()]);

	// simulate drop the source node on the current target node 'elem_5'
	backend.simulateDrop();

	// dndListener.drop should be called
	expect(dndListener.drop).toBeCalled();

	// The dndListener.drop function is called once
	expect(dndListener.drop.mock.calls.length).toBe(1);

	// The first argument of the first call to the function was 'elem_1'
	expect(dndListener.drop.mock.calls[0][0].element).toBe(element1);

	// The second argument of the first call to the function was 'elem_5'
	expect(dndListener.drop.mock.calls[0][1].element).toBe(element2);
});
