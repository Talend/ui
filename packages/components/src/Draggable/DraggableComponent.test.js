import React from 'react';
import renderer from 'react-test-renderer';
import TestBackend from 'react-dnd-test-backend';
import { DragDropContext as dndContext } from 'react-dnd';
import PropTypes from 'prop-types';
import TestUtils from 'react-dom/test-utils';
import draggable from './DraggableComponent.js';

function Element({ element }) {
	return (
		<div className="elem-class">
			<span>{element.symbol}</span>
			<span>:</span>
			<span>{element.name}</span>
		</div>
	);
}

Element.propTypes = {
	element: PropTypes.object,
};

function List({ elements, Comp, ...rest }) {
	return (
		<div className="list-class">
			{elements.map(elem => <Comp key={elem.symbol} element={elem} {...rest} />)}
		</div>
	);
}

List.propTypes = {
	elements: PropTypes.array,
	Comp: PropTypes.func,
	extra: PropTypes.object,
};

const ru = {
	symbol: 'ru',
	name: 'Ruthenium',
};

const rh = {
	symbol: 'rh',
	name: 'Rhodium',
};

const pd = {
	symbol: 'pd',
	name: 'Palladium',
};

const elements = [ru, rh, pd];

const type = 'element';

/**
 * Render a single draggable element
 */
it('display simple draggable-element content', () => {
	const draggableElement = draggable(Element, type);
	// Obtain the reference to the component before React DnD wrapping
	const OriginalElement = draggableElement.DecoratedComponent;
	// Stub the React DnD connector functions with an identity function
	const identity = el => el;
	// create React tree
	const tree = renderer
		.create(
			<OriginalElement element={ru} connectDragSource={identity} connectDropTarget={identity} />,
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

function getComponentByName(components, name) {
	return components.find(comp => comp.props.element.name === name);
}

/**
 * Wraps a component into a DragDropContext that uses the TestBackend.
 */
function wrapInTestContext(DecoratedComponent) {
	return dndContext(TestBackend)(props => <DecoratedComponent {...props} />);
}

/**
 * This tests the drag and drop of the element ru onto the element rh.
 */
it('drag-and-drop-on-multiple-elements', () => {
	const draggableElement = draggable(Element, type);

	const beginDrag = jest.fn().mockReturnValue(ru);
	const canDrop = jest.fn().mockReturnValue(true);
	const drop = jest.fn();
	const endDrag = jest.fn();

	const ListTestContext = wrapInTestContext(List);

	const list = (
		<ListTestContext
			elements={elements}
			Comp={draggableElement}
			beginDrag={beginDrag}
			canDrop={canDrop}
			drop={drop}
			endDrag={endDrag}
		/>
	);

	const root = TestUtils.renderIntoDocument(list);

	// Obtain a reference to the test backend
	const backend = root.getManager().getBackend();

	// Find the drag source ID and use it to simulate the dragging operation
	const draggableElements = TestUtils.scryRenderedComponentsWithType(root, draggableElement);

	const sourceElem = getComponentByName(draggableElements, ru.name);

	const decoratedSourceElem = sourceElem.getDecoratedComponentInstance();

	// simulate begin drag source node
	backend.simulateBeginDrag([decoratedSourceElem.getHandlerId()]);

	expect(beginDrag).toBeCalled();

	const targetElem = getComponentByName(draggableElements, rh.name);

	// simulate drag node ru over target node rh
	backend.simulateHover([targetElem.getHandlerId()]);

	// simulate drop the source node on the current target node rh
	backend.simulateDrop();

	// drop should be called
	expect(drop).toBeCalled();

	// The drop function is called once
	expect(drop.mock.calls.length).toBe(1);

	// The first argument of the first call to the function was ru
	expect(drop.mock.calls[0][0].symbol).toBe(ru.symbol);

	// The second argument of the first call to the function was rh
	expect(drop.mock.calls[0][1].symbol).toBe(rh.symbol);

	backend.simulateEndDrag();

	expect(endDrag).toBeCalled();
});
