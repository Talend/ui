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
import Immutable from 'immutable';

import { PortRecord } from '../../constants/flowdesigner.model';
import * as Port from './port';
import * as Position from '../position/position';

describe('isPortElseThrow', () => {
	it('return true if given parameter is a PortRecord', () => {
		// given
		const testPort = new PortRecord();
		// when
		const test = Port.isPortElseThrow(testPort);
		// expect
		expect(test).toEqual(true);
	});
	it('throw if given parameter is not a PortRecord', () => {
		// given
		const testPort = new Immutable.Map();
		// when
		// expect
		expect(() => Port.isPortElseThrow(testPort)).toThrow();
	});
});

describe('isTopologyElseThrow', () => {
	it('return true if given parameter is a valid Typologu', () => {
		expect(Port.isTopologyElseThrow('SINK')).toBe(true);
	});
	it('throw if given parameter is not  a valid Typologu and doThrow is true', () => {
		const invalidtopology = 'LOOKUP';
		expect(() => Port.isTopologyElseThrow('LOOKUP', true)).toThrow(
			`Should be a topology 'SOURCE' or 'SINK', was given ${invalidtopology}`,
		);
	});
});

describe('port api', () => {
	const id = 'ID';
	const nodeId = 'NODE_ID';
	const position = Position.create(10, 10);
	const index = 1;
	const topology = 'SOURCE';
	const portType = 'PortType';
	const testPort = Port.create(id, nodeId, index, topology, portType);
	const key = 'KEY';
	const value = { whatever: 'whatever' };

	const improperId = 34;
	const improperNodeId = 42;
	const improperIndex = '10';
	const impropertopology = {};
	const improperPosition = new Immutable.Map({ x: 10, y: 10 });
	const improperPortType = {};
	const improperPort = new Immutable.Map();

	describe('create', () => {
		it('given proper id, nodeId, index, topology and componentType return a Node', () => {
			// given
			// when
			const test = Port.create(id, nodeId, index, topology, portType);
			// expect
			expect(Port.isPort(test)).toEqual(true);
		});
		it('throw if given an improper id', () => {
			// given
			// when
			// expect
			expect(() => Port.create(improperId, nodeId, index, topology, portType)).toThrow();
		});
		it('throw if given an improper NodeId', () => {
			// given
			// when
			// expect
			expect(() => Port.create(id, improperNodeId, index, topology, portType)).toThrow();
		});
		it('throw if given an improper index', () => {
			// given
			// when
			// expect
			expect(() => Port.create(id, nodeId, improperIndex, topology, portType)).toThrow();
		});
		it('throw if given an improper topology', () => {
			// given
			// when
			// expect
			expect(() => Port.create(id, nodeId, index, impropertopology, portType)).toThrow();
		});
		it('throw if given an improper componentType', () => {
			// given
			// when
			// expect
			expect(() => Port.create(id, nodeId, index, topology, improperPortType)).toThrow();
		});
	});

	describe('isPort', () => {
		it('return true if given parameter is a PortRecord', () => {
			// given
			// when
			const test = Port.isPort(testPort);
			// expect
			expect(test).toBe(true);
		});
		it('return false if given parameter is not a PortRecord', () => {
			// given
			// when
			const test = Port.isPort(improperPort);
			// expect
			expect(test).toEqual(false);
		});
	});

	describe('getId', () => {
		it('given a proper Node return an Id', () => {
			// given
			// when
			const test = Port.getId(testPort);
			// expect
			expect(test).toEqual(id);
		});
		it('throw given an improper Port', () => {
			expect(() => Port.getId(improperPort)).toThrow();
		});
	});

	describe('getNodeId', () => {
		it('given a proper Port return a NodeId', () => {
			// given
			// when
			const test = Port.getNodeId(testPort);
			// expect
			expect(test).toEqual(nodeId);
		});
		it('throw given an improper Port', () => {
			expect(() => Port.getId(improperPort)).toThrow();
		});
	});
	describe('setNodeId', () => {
		it('given a proper Port and NodeId return a Port with updated NodeId', () => {
			// given
			const newNodeId = 'NEW_NODE_ID';
			// when
			const test = Port.setNodeId(newNodeId, testPort);
			// expect
			expect(Port.getNodeId(test)).toEqual(newNodeId);
		});
		it('throw given an improper NodeId', () => {
			// given
			// when
			// expect
			expect(() => Port.setNodeId(improperNodeId, testPort)).toThrow();
		});
		it('throw given an improper Port', () => {
			// given
			// when
			// expect
			expect(() => Port.setNodeId(nodeId, improperPort)).toThrow();
		});
	});
	describe('getComponentType', () => {
		it('given a proper Port return a ComponentType', () => {
			// given
			// when
			const test = Port.getComponentType(testPort);
			// expect
			expect(test).toEqual(portType);
		});
		it('throw given an improper Port', () => {
			expect(() => Port.getComponentType(improperPort)).toThrow();
		});
	});
	describe('setComponentType', () => {
		it('given a proper Port and ComponentType return a Port with updated ComponentType', () => {
			// given
			const newComponentType = 'NEW_COMPONENT_TYPE';
			// when
			const test = Port.setComponentType(newComponentType, testPort);
			// expect
			expect(Port.getComponentType(test)).toEqual(newComponentType);
		});
		it('throw given an improper ComponentType', () => {
			// given
			// when
			// expect
			expect(() => Port.setComponentType(improperNodeId, testPort)).toThrow();
		});
		it('throw given an improper Port', () => {
			// given
			// when
			// expect
			expect(() => Port.setComponentType(portType, improperPort)).toThrow();
		});
	});
	describe('getPosition', () => {
		it('given a proper Port return a Position', () => {
			// given
			// when
			const test = Port.getPosition(Port.setPosition(position, testPort));
			// expect
			expect(test).toEqual(position);
		});
		it('throw given an improper Port', () => {
			expect(() => Port.getPosition(improperPortType)).toThrow();
		});
	});
	describe('setPosition', () => {
		it('given a proper Port and Position return a Port with updated Position', () => {
			// given
			const newPosition = Position.create(42, 24);
			// when
			const test = Port.setPosition(newPosition, testPort);
			// expect
			expect(Port.getPosition(test)).toEqual(newPosition);
		});
		it('throw given an improper position', () => {
			// given
			// when
			// expect
			expect(() => Port.setPosition(improperPosition, testPort)).toThrow();
		});
		it('throw given an improper Port', () => {
			// given
			// when
			// expect
			expect(() => Port.setPosition(position, improperPort)).toThrow();
		});
	});
	describe('getTopology', () => {
		it('given a proper Port return a topology', () => {
			// given
			// when
			const test = Port.getTopology(testPort);
			// expect
			expect(test).toEqual(topology);
		});
		it('throw given an improper Port', () => {
			expect(() => Port.getTopology(improperPort)).toThrow();
		});
	});
	describe('setTopology', () => {
		it('given a proper Port and topology return a Port with updated topology', () => {
			// given
			const newTopology = 'SINK';
			// when
			const test = Port.setTopology(newTopology, testPort);
			// expect
			expect(Port.getTopology(test)).toEqual(newTopology);
		});
		it('throw given an improper topology', () => {
			// given
			// when
			// expect
			expect(() => Port.setTopology(impropertopology, testPort)).toThrow();
		});
		it('throw given an improper Port', () => {
			// given
			// when
			// expect
			expect(() => Port.setTopology(topology, improperPort)).toThrow();
		});
	});
	describe('getIndex', () => {
		it('given a proper Port return an index', () => {
			// given
			// when
			const test = Port.getIndex(testPort);
			// expect
			expect(test).toEqual(index);
		});
		it('throw given an improper Port', () => {
			expect(() => Port.getIndex(improperPort)).toThrow();
		});
	});
	describe('setIndex', () => {
		it('given a proper Port and Index return a Port with updated Index', () => {
			// given
			const newIndex = 64;
			// when
			const test = Port.setIndex(newIndex, testPort);
			// expect
			expect(Port.getIndex(test)).toEqual(newIndex);
		});
		it('throw given an improper index', () => {
			// given
			// when
			// expect
			expect(() => Port.setTopology(improperIndex, testPort)).toThrow();
		});
		it('throw given an improper Port', () => {
			// given
			// when
			// expect
			expect(() => Port.setTopology(topology, improperPort)).toThrow();
		});
	});
	describe('setData', () => {
		it('given a proper key, value and port return said port with the new key/value', () => {
			// given
			const newKey = 'newKey';
			const newValue = 'newValue';
			// when
			const test = Port.setData(newKey, newValue, testPort);
			// expect
			expect(Port.getData(newKey, test)).toEqual(newValue);
		});
		it('throw given an improper key', () => {
			// given
			const improperKey = 12;
			// when
			// expect
			expect(() => Port.setData(improperKey, value, testPort)).toThrow();
		});
		it('throw given an improper port', () => {
			// given
			// when
			// expect
			expect(() => Port.setData(key, value, improperPort)).toThrow();
		});
	});
	describe('getData', () => {
		it('given a proper key and port return value associated with the key', () => {
			// given
			const newKey = 'newKey';
			const newValue = 'newValue';
			const preparedPort = Port.setData(newKey, newValue, testPort);
			// when
			const test = Port.getData(newKey, preparedPort);
			// expect
			expect(test).toEqual(newValue);
		});
		it('throw given an improper key', () => {
			// given
			const improperKey = 12;
			// when
			// expect
			expect(() => Port.getData(improperKey, testPort)).toThrow();
		});
		it('throw given an improper port', () => {
			// given
			// when
			// expect
			expect(() => Port.getData(key, improperPort)).toThrow();
		});
	});
	describe('hasData', () => {
		it('given a proper key and port return true if key exist', () => {
			// given
			const newKey = 'newKey';
			const newValue = 'newValue';
			const preparedPort = Port.setData(newKey, newValue, testPort);
			// when
			const test = Port.hasData(newKey, preparedPort);
			// expect
			expect(test).toEqual(true);
		});
		it('throw given an improper key', () => {
			// given
			const improperKey = 12;
			// when
			// expect
			expect(() => Port.hasData(improperKey, testPort)).toThrow();
		});
		it('throw given an improper port', () => {
			// given
			// when
			// expect
			expect(() => Port.hasData(key, improperPort)).toThrow();
		});
	});
	describe('deleteData', () => {
		it('given a proper key and port return port without the key in data property if key exist', () => {
			// given
			const newKey = 'newKey';
			const newValue = 'newValue';
			const preparedPort = Port.setData(newKey, newValue, testPort);
			// when
			const test = Port.deleteData(newKey, preparedPort);
			// expect
			expect(Port.hasData(newKey, test)).toEqual(false);
		});
		it('throw given an improper key', () => {
			// given
			const improperKey = 12;
			// when
			// expect
			expect(() => Port.deleteData(improperKey, testPort)).toThrow();
		});
		it('throw given an improper port', () => {
			// given
			// when
			// expect
			expect(() => Port.deleteData(key, improperPort)).toThrow();
		});
	});
	describe('setGraphicalAttribute', () => {
		it('given a proper key, value and port return said port with the new key/value', () => {
			// given
			const newKey = 'newKey';
			const newValue = 'newValue';
			// when
			const test = Port.setGraphicalAttribute(newKey, newValue, testPort);
			// expect
			expect(Port.getGraphicalAttribute(newKey, test)).toEqual(newValue);
		});
		it('throw given a key being part of FORBIDEN_GRAPHICAL_ATTRIBUTES', () => {
			// given
			const improperNewKey = 'portType';
			const newValue = 'newValue';
			// when
			// expect
			expect(() => Port.setGraphicalAttribute(improperNewKey, newValue, testPort)).toThrow();
		});
		it('throw given an improper key', () => {
			// given
			const improperKey = 12;
			// when
			// expect
			expect(() => Port.setGraphicalAttribute(improperKey, value, testPort)).toThrow();
		});
		it('throw given an improper port', () => {
			// given
			// when
			// expect
			expect(() => Port.setGraphicalAttribute(key, value, improperPort)).toThrow();
		});
	});
	describe('getGraphicalAttribute', () => {
		it('given a proper key and port return value associated with the key', () => {
			// given
			const newKey = 'newKey';
			const newValue = 'newValue';
			const preparedPort = Port.setGraphicalAttribute(newKey, newValue, testPort);
			// when
			const test = Port.getGraphicalAttribute(newKey, preparedPort);
			// expect
			expect(test).toEqual(newValue);
		});
		it('throw given a key being part of FORBIDEN_GRAPHICAL_ATTRIBUTES', () => {
			// given
			const improperNewKey = 'portType';
			// when
			// expect
			expect(() => Port.getGraphicalAttribute(improperNewKey, testPort)).toThrow();
		});
		it('throw given an improper key', () => {
			// given
			const improperKey = 12;
			// when
			// expect
			expect(() => Port.getGraphicalAttribute(improperKey, testPort)).toThrow();
		});
		it('throw given an improper port', () => {
			// given
			// when
			// expect
			expect(() => Port.getGraphicalAttribute(key, improperPort)).toThrow();
		});
	});
	describe('hasGraphicalAttribute', () => {
		it('given a proper key and port return true if key exist', () => {
			// given
			const newKey = 'newKey';
			const newValue = 'newValue';
			const preparedPort = Port.setGraphicalAttribute(newKey, newValue, testPort);
			// when
			const test = Port.hasGraphicalAttribute(newKey, preparedPort);
			// expect
			expect(test).toEqual(true);
		});
		it('throw given a key being part of FORBIDEN_GRAPHICAL_ATTRIBUTES', () => {
			// given
			const improperKey = 'portType';
			// when
			// expect
			expect(() => Port.hasGraphicalAttribute(improperKey, testPort)).toThrow();
		});
		it('throw given an improper key', () => {
			// given
			const improperKey = 12;
			// when
			// expect
			expect(() => Port.hasGraphicalAttribute(improperKey, testPort)).toThrow();
		});
		it('throw given an improper port', () => {
			// given
			// when
			// expect
			expect(() => Port.hasGraphicalAttribute(key, improperPort)).toThrow();
		});
	});
	describe('deleteGraphicalAttribute', () => {
		it('given a proper key and port return port without the key in data property if key exist', () => {
			// given
			const newKey = 'newKey';
			const newValue = 'newValue';
			const preparedPort = Port.setGraphicalAttribute(newKey, newValue, testPort);
			// when
			const test = Port.deleteGraphicalAttribute(newKey, preparedPort);
			// expect
			expect(Port.hasGraphicalAttribute(newKey, test)).toEqual(false);
		});

		it('throw given a key being part of FORBIDEN_GRAPHICAL_ATTRIBUTES', () => {
			// given
			const improperKey = 'portType';
			// when
			// expect
			expect(() => Port.deleteGraphicalAttribute(improperKey, testPort)).toThrow();
		});
		it('throw given an improper key', () => {
			// given
			const improperKey = 12;
			// when
			// expect
			expect(() => Port.deleteGraphicalAttribute(improperKey, testPort)).toThrow();
		});
		it('throw given an improper port', () => {
			// given
			// when
			// expect
			expect(() => Port.deleteGraphicalAttribute(key, improperPort)).toThrow();
		});
	});
});
