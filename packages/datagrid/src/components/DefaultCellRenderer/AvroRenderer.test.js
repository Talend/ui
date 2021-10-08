import React from 'react';
import { shallow, mount } from 'enzyme';

import AvroRenderer from './AvroRenderer.component';

describe('#AvroRenderer', () => {
	function DummyComponent() {
		return <span>dummy component</span>;
	}

	const registryComponents = {
		stringCellRenderer: DummyComponent,
	};

	function getComponent(id) {
		return registryComponents[id];
	}

	it('should render AvroRenderer and load Injected Component stringCellRenderer', () => {
		const wrapper = shallow(
			<AvroRenderer
				avroRenderer={{ stringCellRenderer: 'stringCellRenderer' }}
				colDef={{ avro: { type: { type: 'string' } } }}
				data={{ value: 'value' }}
				getComponent={getComponent}
			/>,
		);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render AvroRenderer and load default component when no renderer', () => {
		const wrapper = shallow(
			<AvroRenderer
				avroRenderer={{ stringCellRenderer: 'stringCellRenderer' }}
				colDef={{ avro: { type: { type: 'unknow' } } }}
				data={{ value: 'value' }}
				getComponent={getComponent}
			/>,
		);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should mount DummyComponent', () => {
		const wrapper = mount(
			<AvroRenderer
				avroRenderer={{ stringCellRenderer: 'stringCellRenderer' }}
				colDef={{ avro: { type: { type: 'string' } } }}
				data={{ value: 'value' }}
				getComponent={getComponent}
			/>,
		);

		expect(wrapper.find('DummyComponent').length).toBe(1);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});

describe('mapping cellRenderer', () => {
	it('should use intCellRenderer when type is double', () => {
		const getComponent = jest.fn();
		shallow(
			<AvroRenderer
				avroRenderer={{
					stringCellRenderer: 'stringCellRenderer',
					intCellRenderer: 'intCellRenderer',
				}}
				colDef={{ avro: { type: { type: 'double' } } }}
				data={{ value: 'value' }}
				getComponent={getComponent}
			/>,
		);

		expect(getComponent).toHaveBeenCalledWith('intCellRenderer');
	});

	it('should use intCellRenderer when type is float', () => {
		const getComponent = jest.fn();
		shallow(
			<AvroRenderer
				avroRenderer={{
					stringCellRenderer: 'stringCellRenderer',
					intCellRenderer: 'intCellRenderer',
				}}
				colDef={{ avro: { type: { type: 'float' } } }}
				data={{ value: 'value' }}
				getComponent={getComponent}
			/>,
		);

		expect(getComponent).toHaveBeenCalledWith('intCellRenderer');
	});

	it('should use intCellRenderer when type is int', () => {
		const getComponent = jest.fn();
		shallow(
			<AvroRenderer
				avroRenderer={{
					stringCellRenderer: 'stringCellRenderer',
					intCellRenderer: 'intCellRenderer',
				}}
				colDef={{ avro: { type: { type: 'int' } } }}
				data={{ value: 'value' }}
				getComponent={getComponent}
			/>,
		);

		expect(getComponent).toHaveBeenCalledWith('intCellRenderer');
	});

	it('should use intCellRenderer when type is long', () => {
		const getComponent = jest.fn();
		shallow(
			<AvroRenderer
				avroRenderer={{
					stringCellRenderer: 'stringCellRenderer',
					intCellRenderer: 'intCellRenderer',
				}}
				colDef={{ avro: { type: { type: 'long' } } }}
				data={{ value: 'value' }}
				getComponent={getComponent}
			/>,
		);

		expect(getComponent).toHaveBeenCalledWith('intCellRenderer');
	});

	it('should use dateCellRenderer when type is long and logicalType is timestamp-millis', () => {
		const getComponent = jest.fn();
		shallow(
			<AvroRenderer
				avroRenderer={{
					stringCellRenderer: 'stringCellRenderer',
					intCellRenderer: 'intCellRenderer',
					dateCellRenderer: 'dateCellRenderer',
				}}
				colDef={{ avro: { type: { type: 'long', logicalType: 'timestamp-millis' } } }}
				data={{ value: 'value' }}
				getComponent={getComponent}
			/>,
		);

		expect(getComponent).toHaveBeenCalledWith('dateCellRenderer');
	});

	it('should use intCellRenderer when type is int and logicalType is timestamp-millis', () => {
		const getComponent = jest.fn();
		shallow(
			<AvroRenderer
				avroRenderer={{
					stringCellRenderer: 'stringCellRenderer',
					intCellRenderer: 'intCellRenderer',
					dateCellRenderer: 'dateCellRenderer',
				}}
				colDef={{ avro: { type: { type: 'int', logicalType: 'timestamp-millis' } } }}
				data={{ value: 'value' }}
				getComponent={getComponent}
			/>,
		);

		expect(getComponent).toHaveBeenCalledWith('intCellRenderer');
	});
});
