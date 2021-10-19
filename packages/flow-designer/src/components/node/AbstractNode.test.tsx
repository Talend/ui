import React from 'react';
import { shallow, mount } from 'enzyme';

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
		const wrapper = mount(
			<AbstractNode node={node} startMoveNodeTo={noOp} moveNodeTo={noOp} moveNodeToEnd={noOp}>
				<rect />
			</AbstractNode>,
		);
		const rect = wrapper.find('g[transform]');
		expect(rect.prop('transform')).toBe('translate(100, 50)');
	});

	it('call the injected onClick action when clicked', () => {
		const onClick = jest.fn();
		const wrapper = mount(
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
		wrapper.find('g[transform]').simulate('click');
		expect(onClick).toHaveBeenCalledTimes(1);
	});

	// if anyone got a clue on how to test react + d3 events

	xit('call the injected onDragStart action when drag action start', done => {
		const evt = document.createEvent('HTMLEvents');
		evt.initEvent('click', false, true);
		const onDragStart = jest.fn();
		mount(
			<AbstractNode
				node={node}
				onClick={onDragStart}
				startMoveNodeTo={noOp}
				moveNodeTo={noOp}
				moveNodeToEnd={noOp}
			>
				<rect />
			</AbstractNode>,
			{ attachTo: document.body },
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
			shallow(
				<AbstractNode
					node={node}
					startMoveNodeTo={noOp}
					moveNodeTo={noOp}
					moveNodeToEnd={noOp}
				/>,
			);
		}).toThrowError(ABSTRACT_NODE_INVARIANT);
	});
});
