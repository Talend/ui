import { fireEvent, render, screen } from '@testing-library/react';

import {
	NodeGraphicalAttributes,
	NodeRecord,
	PositionRecord,
	SizeRecord,
} from '../../constants/flowdesigner.model';
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

	it('call the injected onClick action when clicked', () => {
		const onClick = jest.fn();
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
		const onDoubleClick = jest.fn();
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
		const onDragStart = jest.fn();
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
