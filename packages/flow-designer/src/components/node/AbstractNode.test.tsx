import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Map } from 'immutable';

import {
	NodeGraphicalAttributes,
	NodeRecord,
	PortRecord,
	PositionRecord,
	SizeRecord,
} from '../../constants/flowdesigner.model';
import { PORT_SOURCE } from '../../constants/flowdesigner.constants';
import AbstractNode, { ABSTRACT_NODE_INVARIANT } from './AbstractNode.component';

const node = new NodeRecord({
	id: 'id',
	graphicalAttributes: new NodeGraphicalAttributes({
		position: new PositionRecord({ x: 100, y: 50 }),
		nodeSize: new SizeRecord({ width: 125, height: 75 }),
	}),
});

function noOp() {}

describe('Testing <AbstractNode>', () => {
	it('should create a bare node component with provided position', () => {
		render(
			<AbstractNode node={node} startMoveNodeTo={noOp} moveNodeTo={noOp} moveNodeToEnd={noOp}>
				<rect />
			</AbstractNode>,
		);
		const rect = document.querySelector('g[transform]');
		expect(rect).toHaveAttribute('transform', 'translate(100, 50)');
	});

	it('updates source port positions from node geometry', () => {
		const port = new PortRecord({
			id: 'port-id',
			nodeId: 'node-id',
			graphicalAttributes: Map({ properties: Map({ type: PORT_SOURCE, index: 0 }) }),
		});

		const positionedPorts = AbstractNode.calculatePortPosition(
			Map({ 'port-id': port }),
			new PositionRecord({ x: 100, y: 50 }),
			new SizeRecord({ width: 125, height: 75 }),
		);
		const position = positionedPorts.get('port-id')?.getPosition();

		expect(position?.get('x')).toBe(225);
		expect(position?.get('y')).toBe(87.5);
	});

	it('call the injected onClick action when clicked', () => {
		const onClick = vi.fn();
		render(
			<AbstractNode
				node={node}
				onClick={onClick}
				startMoveNodeTo={noOp}
				moveNodeTo={noOp}
				moveNodeToEnd={noOp}
			>
				<rect />
			</AbstractNode>,
		);
		const elem = document.querySelector('g[transform]');
		if (elem) {
			fireEvent.click(elem);
		}
		expect(onClick).toHaveBeenCalledTimes(1);
	});

	it('call the onDoubleClick props when double clicked', async () => {
		const onDoubleClick = vi.fn();
		render(
			<AbstractNode
				node={node}
				onDoubleClick={onDoubleClick}
				startMoveNodeTo={noOp}
				moveNodeTo={noOp}
				moveNodeToEnd={noOp}
			>
				<rect />
			</AbstractNode>,
		);
		const nodeGroup = await screen.findByTestId(/group./, { exact: false });
		fireEvent.doubleClick(nodeGroup);

		expect(onDoubleClick).toHaveBeenCalledTimes(1);
	});

	// if anyone got a clue on how to test react + d3 events

	xit('call the injected onDragStart action when drag action start', done => {
		const evt = document.createEvent('HTMLEvents');
		evt.initEvent('click', false, true);
		const onDragStart = vi.fn();
		render(
			<AbstractNode
				node={node}
				onClick={onDragStart}
				startMoveNodeTo={noOp}
				moveNodeTo={noOp}
				moveNodeToEnd={noOp}
			>
				<rect />
			</AbstractNode>,
		);

		const element = document.querySelector('g g') || new HTMLDivElement();

		element.addEventListener('click', () => {
			done();
		});
		element.dispatchEvent(new window.MouseEvent('click'));
		expect(onDragStart.mock.calls.length).toEqual(1);
		fail();
	});

	xit('call the injected onDrag action when drag action start', () => {
		fail();
	});

	xit('call the injected onDragEnd action when drag action start', () => {
		fail();
	});

	it('should fire an error if its rendered without a children set up', () => {
		expect(() => {
			render(
				<AbstractNode node={node} startMoveNodeTo={noOp} moveNodeTo={noOp} moveNodeToEnd={noOp} />,
			);
		}).toThrowError(ABSTRACT_NODE_INVARIANT);
	});
});
