import { mount } from 'enzyme';
import React, { Component } from 'react';
import TestBackend from 'react-dnd-test-backend';
import { DragDropContext } from 'react-dnd';
import TestUtils from 'react-dom/test-utils';
import MapperComponent from './Mapper.js';
import DataAccessorWrapper from '../DataAccessorWrapper';
import { Constants } from '../index';

const dataAccessor = new DataAccessorWrapper();

const element1 = {
	id: '1',
	name: 'elem_in_1',
	type: 'string',
	description: 'bla bla bla',
};

const element2 = {
	id: '2',
	name: 'elem_out_1',
	type: 'string',
	description: 'bla bla bla',
};

const inputSchema = {
	id: 'schema_1',
	name: 'input',
	elements: [element1],
};

const outputSchema = {
	id: 'schema_2',
	name: 'output',
	elements: [element2],
};

const noFilters = {
	input: [],
	output: [],
};

function isNamed(element, name) {
	const elementName = dataAccessor.getElementName(element);
	return elementName === name;
}

function getElementByName(elements, name) {
	return elements.find(elem => isNamed(elem.props.element, name));
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

const autoMap = jest.fn();

const preferences = {
	showAll: false,
};

it('auto-mapping', () => {
	const mapping = [{ source: 'elem_in_1', target: 'elem_out_1' }];
	const MapperTestContext = wrapInTestContext(MapperComponent);

	const mapper = (
		<MapperTestContext
			dataAccessor={dataAccessor}
			inputSchema={inputSchema}
			mapping={mapping}
			outputSchema={outputSchema}
			autoMap={autoMap}
			schemaConfiguration={schemaConfiguration}
			mappingConfiguration={mappingConfig}
			filters={noFilters}
			preferences={preferences}
		/>
	);
	const wrapper = mount(mapper);
	wrapper
		.find('#auto-map')
		.at(0)
		.simulate('click');

	expect(autoMap).toBeCalled();
});

it('perform-mapping', () => {
	const item = {
		element: element1,
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
	const draggable = true;

	const MapperTestContext = wrapInTestContext(MapperComponent);

	const mapper = (
		<MapperTestContext
			dataAccessor={dataAccessor}
			inputSchema={inputSchema}
			mapping={mapping}
			outputSchema={outputSchema}
			dndListener={dndListener}
			draggable={draggable}
			schemaConfiguration={schemaConfiguration}
			mappingConfiguration={mappingConfig}
			filters={noFilters}
			preferences={preferences}
		/>
	);

	const root = TestUtils.renderIntoDocument(mapper);

	// Obtain a reference to the test backend
	const backend = root.getManager().getBackend();

	// Find the drag source ID and use it to simulate the dragging operation
	const elements = TestUtils.scryRenderedComponentsWithType(root, DraggableSchemaElement);

	const sourceElem = getElementByName(elements, 'elem_in_1');

	const decoratedSourceElem = sourceElem.getDecoratedComponentInstance();

	// simulate begin drag source node 'elem_in_1'
	backend.simulateBeginDrag([decoratedSourceElem.getHandlerId()]);

	const targetElem = getElementByName(elements, 'elem_out_1');

	// simulate drag node 'elem_in_1' over target node 'elem_out_1'
	backend.simulateHover([targetElem.getHandlerId()]);

	// simulate drop the source node on the current target node 'elem_out_1'
	backend.simulateDrop();

	// dndListener.drop should be called
	expect(dndListener.drop).toBeCalled();

	// The dndListener.drop function is called once
	expect(dndListener.drop.mock.calls.length).toBe(1);

	// The first argument of the first call to the function was 'elem_in_1'
	expect(dndListener.drop.mock.calls[0][0].element).toBe(element1);

	// The second argument of the first call to the function was 'elem_out_1'
	expect(dndListener.drop.mock.calls[0][1].element).toBe(element2);
});
