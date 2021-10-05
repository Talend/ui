/**
 * test are not exhaustive in this section related to functions :
 * 	setData,
 *	getData,
 *	hasData,
 *	deleteData,
 *	setGraphicalAttribute,
 *	getGraphicalAttribute,
 *	hasGraphicalAttribute,
 *	deleteGraphicalAttribute

    because the underlying module data is itself tested.
 */
import { Map } from 'immutable';

import { NodeRecord, NestedNodeRecord } from '../../constants/flowdesigner.model';

import * as Node from './node';
import * as Position from '../position/position';
import * as Size from '../size/size';

const isNotNodeException = `NodeRecord should be a NodeRecord, was given
"""
object
"""
Map {}
"""`;

const improperSizeMessage = `SizeRecord should be a SizeRecord, was given
"""
object
"""
Map { "width": 20, "height": 50 }
"""
you should use Size module functions to create and transform Size`;

const improperPositionMessage = `PositionRecord should be a PositionRecord, was given
"""
object
"""
Map { "x": 10, "y": 10 }
"""
`;

const protectedValueException =
	'position is a protected value of the Node, please use getPosition setPosition from this module to make change on those values';

describe('isNodeElseThrow', () => {
	it('return true if parameter node is a NodeRecord', () => {
		// given
		const testNode = new NodeRecord();
		// when
		const test = Node.isNodeElseThrow(testNode);
		// expect
		expect(test).toEqual(true);
	});

	it('return true if parameter node is a NestedNodeRecord', () => {
		// given
		const testNode = new NestedNodeRecord();
		// when
		const test = Node.isNodeElseThrow(testNode);
		// expect
		expect(test).toEqual(true);
	});

	it('thow an error if parameter is not a NodeRecord', () => {
		// given
		const testNode = Map();
		// when
		// expect
		expect(() => Node.isNodeElseThrow(testNode)).toThrow(isNotNodeException);
	});
});

describe('Node', () => {
	const id = 'ID';
	const position = Position.create(10, 10);
	const size = Size.create(50, 80);
	const nodeType = 'NodeType';
	const testNode = Node.create(id, position, size, nodeType);
	const key = 'KEY';
	const value = { whatever: 'whatever' };

	const improperId = 34;
	const improperPosition = Map({ x: 10, y: 10 });
	const improperSize = Map({ width: 20, height: 50 });
	const improperNodeType = {};
	const improperNode = Map();
	describe('create', () => {
		it('given proper id, position, size and componentType return a Node', () => {
			// given
			// when
			const test = Node.create(id, position, size, nodeType);
			// expect
			expect(Node.isNode(test)).toEqual(true);
		});
		it('throw if given an improper id', () => {
			// given
			// when
			// expect
			expect(() => Node.create(improperId as any, position, size, nodeType)).toThrow(
				'nodeId should be a string, was given 34',
			);
		});
		it('throw if given an improper Position', () => {
			// given
			// when
			// expect
			expect(() => Node.create(id, improperPosition, size, nodeType)).toThrow(
				improperPositionMessage,
			);
		});
		it('throw if given an improper Size', () => {
			// given
			// when
			// expect
			expect(() => Node.create(id, position, improperSize, nodeType)).toThrow(
				improperSizeMessage,
			);
		});
		it('throw if given an improper componentType', () => {
			// given
			// when
			// expect
			expect(() => Node.create(id, position, size, improperNodeType as any)).toThrow(
				'nodeType should be a string, was given [object Object]',
			);
		});
	});

	describe('isNode', () => {
		it('return true if parameter node is a NodeRecord', () => {
			// given
			// when
			const test = Node.isNode(testNode);
			// expect
			expect(test).toEqual(true);
		});

		it('thow an error if parameter is not a NodeRecord', () => {
			// given
			// when
			const test = Node.isNode(improperNode);
			// expect
			expect(test).toEqual(false);
		});
	});

	describe('getId', () => {
		it('given a proper Node return an Id', () => {
			// given
			// when
			const test = Node.getId(testNode);
			// expect
			expect(test).toEqual(id);
		});
		it('throw given an improper node', () => {
			expect(() => Node.getId(improperNode)).toThrow(isNotNodeException);
		});
	});

	describe('getPosition', () => {
		it('given a proper Node return a Position', () => {
			// given
			// when
			const test = Node.getPosition(testNode);
			// expect
			expect(test).toEqual(position);
		});
		it('throw given an improper node', () => {
			expect(() => Node.getPosition(improperNode)).toThrow(isNotNodeException);
		});
	});
	describe('setPosition', () => {
		it('given a proper Node and Position return a Node with updated Position', () => {
			// given
			const newPosition = Position.create(100, 100);
			// when
			const test = Node.setPosition(newPosition, testNode);
			// expect
			expect(Node.getPosition(test)).toEqual(newPosition);
		});
		it('throw given an improper Position', () => {
			// given
			// when
			// expect
			expect(() => Node.setPosition(improperPosition, testNode))
				.toThrow(`PositionRecord should be a PositionRecord, was given
"""
object
"""
Map { "x": 10, "y": 10 }
"""
you should use Position module functions to create and transform Position`);
		});
		it('throw given an improper Node', () => {
			// given
			// when
			// expect
			expect(() => Node.setPosition(position, improperNode)).toThrow(isNotNodeException);
		});
	});
	describe('getSize', () => {
		it('given a proper Node return a Size', () => {
			// given
			// when
			const test = Node.getSize(testNode);
			// expect
			expect(test).toEqual(size);
		});
		it('throw given an improper node', () => {
			// given
			// when
			// expect
			expect(() => Node.getSize(improperNode)).toThrow(isNotNodeException);
		});
	});
	describe('setSize', () => {
		it('given a proper Node and Size return a Node with updated Size', () => {
			// given
			const newSize = Size.create(100, 100);
			// when
			const test = Node.setSize(newSize, testNode);
			// expect
			expect(Node.getSize(test)).toEqual(newSize);
		});
		it('throw given an improper Size', () => {
			// given
			// when
			// expect
			expect(() => Node.setSize(improperSize, testNode)).toThrow(improperSizeMessage);
		});
		it('throw given an improper Node', () => {
			// given
			// when
			// expect
			expect(() => Node.setSize(size, improperNode)).toThrow(isNotNodeException);
		});
	});
	describe('getComponentType', () => {
		it('given a proper Node return a ComponentType', () => {
			// given
			// when
			const test = Node.getComponentType(testNode);
			// expect
			expect(test).toEqual(nodeType);
		});
		it('throw given an improper Link', () => {
			// given
			// when
			// expect
			expect(() => Node.getComponentType(improperNode)).toThrow(isNotNodeException);
		});
	});
	describe('setComponentType', () => {
		it('given a proper Node and ComponentType return a Node with updated ComponentType', () => {
			// given
			const newComponentType = 'squareOne';
			// when
			const test = Node.setComponentType(newComponentType, testNode);
			// expect
			expect(Node.getComponentType(test)).toEqual(newComponentType);
		});
		it('throw given an improper ComponentType', () => {
			// given
			const newComponentType = { type: 'squareOne' };
			// when
			// expect
			expect(() => Node.setComponentType(newComponentType as any, testNode)).toThrow(
				'nodeType should be a string, was given [object Object]',
			);
		});
		it('throw given an improper Node', () => {
			// given
			// when
			// expect
			expect(() => Node.setComponentType(nodeType, improperNode)).toThrow(isNotNodeException);
		});
	});
	describe('setData', () => {
		it('given a proper key, value and node return said node with the new key/value', () => {
			// given
			const newKey = 'newKey';
			const newValue = 'newValue';
			// when
			const test = Node.setData(newKey, newValue, testNode);
			// expect
			expect(Node.getData(newKey, test)).toEqual(newValue);
		});
		it('throw given an improper key', () => {
			// given
			const improperKey = 8;
			// when
			// expect
			expect(() => Node.setData(improperKey as any, value, testNode)).toThrow(
				`key should be a string, was given ${
					improperKey && improperKey.toString()
				} of type ${typeof improperKey}`,
			);
		});
		it('throw given an improper node', () => {
			// given
			// when
			// expect
			expect(() => Node.setData(key, value, improperNode)).toThrow(isNotNodeException);
		});
	});
	describe('getData', () => {
		it('given a proper key and node return value associated with the key', () => {
			// given
			const newKey = 'newKey';
			const newValue = 'newValue';
			const preparedNode = Node.setData(newKey, newValue, testNode);
			// when
			const test = Node.getData(newKey, preparedNode);
			// expect
			expect(test).toEqual(newValue);
		});
		it('throw given an improper key', () => {
			// given
			const improperKey = 8;
			// when
			// expect
			expect(() => Node.getData(improperKey as any, testNode)).toThrow(
				`key should be a string, was given ${
					improperKey && improperKey.toString()
				} of type ${typeof improperKey}`,
			);
		});
		it('throw given an improper node', () => {
			// given
			// when
			// expect
			expect(() => Node.getData(key, improperNode)).toThrow(isNotNodeException);
		});
	});
	describe('hasData', () => {
		it('given a proper key and node return true if key exist', () => {
			// given
			const newKey = 'newKey';
			const newValue = 'newValue';
			const preparedNode = Node.setData(newKey, newValue, testNode);
			// when
			const test = Node.hasData(newKey, preparedNode);
			// expect
			expect(test).toEqual(true);
		});
		it('throw given an improper key', () => {
			// given
			const improperKey = 8;
			// when
			// expect
			expect(() => Node.hasData(improperKey as any, testNode)).toThrow(
				`key should be a string, was given ${
					improperKey && improperKey.toString()
				} of type ${typeof improperKey}`,
			);
		});
		it('throw given an improper node', () => {
			// given
			// when
			// expect
			expect(() => Node.hasData(key, improperNode)).toThrow(isNotNodeException);
		});
	});
	describe('deleteData', () => {
		it('given a proper key and node return node without the key in data property if key exist', () => {
			// given
			const newKey = 'newKey';
			const newValue = 'newValue';
			const preparedNode = Node.setData(newKey, newValue, testNode);
			// when
			const test = Node.deleteData(newKey, preparedNode);
			// expect
			expect(Node.hasData(newKey, test)).toEqual(false);
		});
		it('throw given an improper key', () => {
			// given
			const improperKey = 8;
			// when
			// expect
			expect(() => Node.deleteData(improperKey as any, testNode)).toThrow(
				`key should be a string, was given ${
					improperKey && improperKey.toString()
				} of type ${typeof improperKey}`,
			);
		});
		it('throw given an improper node', () => {
			// given
			// when
			// expect
			expect(() => Node.deleteData(key, improperNode)).toThrow(isNotNodeException);
		});
	});
	describe('setGraphicalAttribute', () => {
		it('given a proper key, value and node return said node with the new key/value', () => {
			// given
			const newKey = 'newKey';
			const newValue = 'newValue';
			// when
			const test = Node.setGraphicalAttribute(newKey, newValue, testNode);
			// expect
			expect(Node.getGraphicalAttribute(newKey, test)).toEqual(newValue);
		});
		it('throw given a key being part of FORBIDEN_GRAPHICAL_ATTRIBUTES', () => {
			// given
			const improperNewKey = 'position';
			const newValue = 'newValue';
			// when
			// expect
			expect(() => Node.setGraphicalAttribute(improperNewKey, newValue, testNode)).toThrow(
				protectedValueException,
			);
		});
		it('throw given an improper key', () => {
			// given
			const improperKey = 8;
			// when
			// expect
			expect(() => Node.setGraphicalAttribute(improperKey as any, value, testNode)).toThrow(
				`key should be a string, was given ${
					improperKey && improperKey.toString()
				} of type ${typeof improperKey}`,
			);
		});
		it('throw given an improper node', () => {
			// given
			// when
			// expect
			expect(() => Node.setGraphicalAttribute(key, value, improperNode)).toThrow(
				isNotNodeException,
			);
		});
	});
	describe('getGraphicalAttribute', () => {
		it('given a proper key and node return value associated with the key', () => {
			// given
			const newKey = 'newKey';
			const newValue = 'newValue';
			const preparedNode = Node.setGraphicalAttribute(newKey, newValue, testNode);
			// when
			const test = Node.getGraphicalAttribute(newKey, preparedNode);
			// expect
			expect(test).toEqual(newValue);
		});
		it('throw given a key being part of FORBIDEN_GRAPHICAL_ATTRIBUTES', () => {
			// given
			const improperNewKey = 'position';
			// when
			// expect
			expect(() => Node.getGraphicalAttribute(improperNewKey, testNode)).toThrow(
				protectedValueException,
			);
		});
		it('throw given an improper key', () => {
			// given
			const improperKey = 8;
			// when
			// expect
			expect(() => Node.getGraphicalAttribute(improperKey as any, testNode)).toThrow(
				`key should be a string, was given ${
					improperKey && improperKey.toString()
				} of type ${typeof improperKey}`,
			);
		});
		it('throw given an improper node', () => {
			// given
			// when
			// expect
			expect(() => Node.getGraphicalAttribute(key, improperNode)).toThrow(isNotNodeException);
		});
	});
	describe('hasGraphicalAttribute', () => {
		it('given a proper key and node return true if key exist', () => {
			// given
			const newKey = 'newKey';
			const newValue = 'newValue';
			const preparedNode = Node.setGraphicalAttribute(newKey, newValue, testNode);
			// when
			const test = Node.hasGraphicalAttribute(newKey, preparedNode);
			// expect
			expect(test).toEqual(true);
		});
		it('throw given a key being part of FORBIDEN_GRAPHICAL_ATTRIBUTES', () => {
			// given
			const improperKey = 'position';
			// when
			// expect
			expect(() => Node.hasGraphicalAttribute(improperKey, testNode)).toThrow(
				protectedValueException,
			);
		});
		it('throw given an improper key', () => {
			// given
			const improperKey = 8;
			// when
			// expect
			expect(() => Node.hasGraphicalAttribute(improperKey as any, testNode)).toThrow(
				`key should be a string, was given ${
					improperKey && improperKey.toString()
				} of type ${typeof improperKey}`,
			);
		});
		it('throw given an improper node', () => {
			// given
			// when
			// expect
			expect(() => Node.hasGraphicalAttribute(key, improperNode)).toThrow(isNotNodeException);
		});
	});
	describe('deleteGraphicalAttribute', () => {
		it('given a proper key and node return node without the key in data property if key exist', () => {
			// given
			const newKey = 'newKey';
			const newValue = 'newValue';
			const preparedNode = Node.setGraphicalAttribute(newKey, newValue, testNode);
			// when
			const test = Node.deleteGraphicalAttribute(newKey, preparedNode);
			// expect
			expect(Node.hasGraphicalAttribute(newKey, test)).toEqual(false);
		});

		it('throw given a key being part of FORBIDEN_GRAPHICAL_ATTRIBUTES', () => {
			// given
			const improperKey = 'position';
			// when
			// expect
			expect(() => Node.deleteGraphicalAttribute(improperKey, testNode)).toThrow(
				protectedValueException,
			);
		});
		it('throw given an improper key', () => {
			// given
			const improperKey = 8;
			// when
			// expect
			expect(() => Node.deleteGraphicalAttribute(improperKey as any, testNode)).toThrow(
				`key should be a string, was given ${
					improperKey && improperKey.toString()
				} of type ${typeof improperKey}`,
			);
		});
		it('throw given an improper node', () => {
			// given
			// when
			// expect
			expect(() => Node.deleteGraphicalAttribute(key, improperNode)).toThrow(
				isNotNodeException,
			);
		});
	});
});
