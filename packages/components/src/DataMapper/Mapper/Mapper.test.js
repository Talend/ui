import { mount } from 'enzyme';
import React, { Component } from 'react';
import TestBackend from 'react-dnd-test-backend';
import { DragDropContext } from 'react-dnd';
import TestUtils from 'react-dom/test-utils';
import Mapper from './Mapper.js';
import DraggableSchemaElement from '../Schema/SchemaElement/DraggableSchemaElement.js';
import DefaultDataAccessor from '../DefaultDataAccessor';
import DataAccessorWrapper from '../DataAccessorWrapper';
import * as Constants from '../Constants';
import DefaultRenderer from '../Schema/SchemaRenderers/DefaultRenderer';

const dataAccessor = new DataAccessorWrapper(new DefaultDataAccessor());
const defaultSchemaRenderer = new DefaultRenderer();

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

const clearMapping = jest.fn();
const performMapping = jest.fn();
const preferences = {
	showAll: false,
	withGradient: false,
};

it('clear-mapping', () => {

	const mapping = [{ source: 'elem_in_1', target: 'elem_out_1' }];
	const MapperTestContext = wrapInTestContext(Mapper);

	const mapper = (
		<MapperTestContext
			dataAccessor={dataAccessor}
			inputSchema={inputSchema}
			mapping={mapping}
			outputSchema={outputSchema}
			performMapping={performMapping}
			clearMapping={clearMapping}
			inputSchemaRenderer={defaultSchemaRenderer}
			outputSchemaRenderer={defaultSchemaRenderer}
			filters={noFilters}
			preferences={preferences}
		/>
	);
	const wrapper = mount(mapper);
	wrapper
		.find('#clear-mapping')
		.at(0)
		.simulate('click');

	expect(clearMapping).toBeCalled();
	expect(performMapping).not.toBeCalled();
});

it('perform-mapping', () => {

	const item = {
		element: element1,
		side: Constants.MappingSide.INPUT,
	};
	const beginDrag = jest.fn().mockReturnValue(item);
	const dndInProgress = jest.fn();
	const canDrop = jest.fn().mockReturnValue(true);
	const drop = jest.fn();
	const endDrag = jest.fn();
	const mapping = [];
	const draggable = true;

	const MapperTestContext = wrapInTestContext(Mapper);

	const mapper = (
		<MapperTestContext
			dataAccessor={dataAccessor}
			inputSchema={inputSchema}
			mapping={mapping}
			outputSchema={outputSchema}
			performMapping={performMapping}
			clearMapping={clearMapping}
			beginDrag={beginDrag}
			dndInProgress={dndInProgress}
			canDrop={canDrop}
			drop={drop}
			endDrag={endDrag}
			draggable={draggable}
			inputSchemaRenderer={defaultSchemaRenderer}
			outputSchemaRenderer={defaultSchemaRenderer}
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

	// performMapping should be called
	expect(performMapping).toBeCalled();

	// The performMapping function is called once
	expect(performMapping.mock.calls.length).toBe(1);

	// The first argument of the first call to the function was 'elem_in_1'
	expect(performMapping.mock.calls[0][0]).toBe(element1);

	// The second argument of the first call to the function was 'elem_out_1'
	expect(performMapping.mock.calls[0][1]).toBe(element2);
});
