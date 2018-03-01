import { mount } from 'enzyme';
import React, { Component } from 'react';
import TestBackend from 'react-dnd-test-backend';
import { DragDropContext } from 'react-dnd';
import TestUtils from 'react-dom/test-utils';
import Mapper from './Mapper.js';
import DraggableSchemaElement from '../Schema/SchemaElement/DraggableSchemaElement.js';

it('clear-mapping', () => {
	const clearMapping = jest.fn();
	const performMapping = jest.fn();
	const inputSchema = ['elem_in_1'];
	const outputSchema = ['elem_out_1'];
	const mapping = [{ source: 'elem_in_1', target: 'elem_out_1' }];
	const mapper = (
		<Mapper
			inputSchema={inputSchema}
			mapping={mapping}
			outputSchema={outputSchema}
			performMapping={performMapping}
			clearMapping={clearMapping}
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

function getElementByName(elements, name) {
	return elements.find(elem => elem.props.name === name);
}

it('perform-mapping', () => {
	const clearMapping = jest.fn();
	const performMapping = jest.fn();
	const inputSchema = ['elem_in_1'];
	const outputSchema = ['elem_out_1'];
	const mapping = [];

	const MapperTestContext = wrapInTestContext(Mapper);

	const mapper = (
		<MapperTestContext
			inputSchema={inputSchema}
			mapping={mapping}
			outputSchema={outputSchema}
			performMapping={performMapping}
			clearMapping={clearMapping}
			draggable="true"
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
	expect(performMapping.mock.calls[0][0]).toBe('elem_in_1');

	// The second argument of the first call to the function was 'elem_out_1'
	expect(performMapping.mock.calls[0][1]).toBe('elem_out_1');
});
