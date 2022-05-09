import React from 'react';
import { shallow, mount } from 'enzyme';

import AvroRenderer from './AvroRenderer.component';

function StringDummyComponent() {
	return <span>string dummy component</span>;
}
function IntDummyComponent() {
	return <span>int dummy component</span>;
}
function DateDummyComponent() {
	return <span>date dummy component</span>;
}

describe('#AvroRenderer', () => {
	it('should render AvroRenderer and load Injected Component stringCellRenderer', () => {
		const wrapper = shallow(
			<AvroRenderer
				avroRenderer={{ stringCellRenderer: StringDummyComponent }}
				colDef={{ avro: { type: { type: 'string' } } }}
				data={{ value: 'value' }}
			/>,
		);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render AvroRenderer and load default component when no renderer', () => {
		const wrapper = shallow(
			<AvroRenderer
				avroRenderer={{ stringCellRenderer: StringDummyComponent }}
				colDef={{ avro: { type: { type: 'unknow' } } }}
				data={{ value: 'value' }}
			/>,
		);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should mount stringCellRenderer', () => {
		const wrapper = mount(
			<AvroRenderer
				avroRenderer={{ stringCellRenderer: StringDummyComponent }}
				colDef={{ avro: { type: { type: 'string' } } }}
				data={{ value: 'value' }}
			/>,
		);

		expect(wrapper.find('StringDummyComponent').length).toBe(1);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});

describe('mapping cellRenderer', () => {
	it('should use intCellRenderer when type is double', () => {
		const wrapper = shallow(
			<AvroRenderer
				avroRenderer={{
					stringCellRenderer: StringDummyComponent,
					intCellRenderer: IntDummyComponent,
				}}
				colDef={{ avro: { type: { type: 'double' } } }}
				data={{ value: 'value' }}
			/>,
		);

		expect(wrapper.getElement().type).toEqual(IntDummyComponent);
	});

	it('should use intCellRenderer when type is float', () => {
		const wrapper = shallow(
			<AvroRenderer
				avroRenderer={{
					stringCellRenderer: StringDummyComponent,
					intCellRenderer: IntDummyComponent,
				}}
				colDef={{ avro: { type: { type: 'float' } } }}
				data={{ value: 'value' }}
			/>,
		);

		expect(wrapper.getElement().type).toEqual(IntDummyComponent);
	});

	it('should use intCellRenderer when type is int', () => {
		const wrapper = shallow(
			<AvroRenderer
				avroRenderer={{
					stringCellRenderer: StringDummyComponent,
					intCellRenderer: IntDummyComponent,
				}}
				colDef={{ avro: { type: { type: 'int' } } }}
				data={{ value: 'value' }}
			/>,
		);

		expect(wrapper.getElement().type).toEqual(IntDummyComponent);
	});

	it('should use intCellRenderer when type is long', () => {
		const wrapper = shallow(
			<AvroRenderer
				avroRenderer={{
					stringCellRenderer: StringDummyComponent,
					intCellRenderer: IntDummyComponent,
				}}
				colDef={{ avro: { type: { type: 'long' } } }}
				data={{ value: 'value' }}
			/>,
		);

		expect(wrapper.getElement().type).toEqual(IntDummyComponent);
	});

	it('should use dateCellRenderer when type is long and logicalType is timestamp-millis', () => {
		const wrapper = shallow(
			<AvroRenderer
				avroRenderer={{
					dateCellRenderer: DateDummyComponent,
				}}
				colDef={{ avro: { type: { type: 'long', logicalType: 'timestamp-millis' } } }}
				data={{ value: 'value' }}
			/>,
		);

		expect(wrapper.getElement().type).toEqual(DateDummyComponent);
	});

	it('should use intCellRenderer when type is int and logicalType is timestamp-millis', () => {
		const wrapper = shallow(
			<AvroRenderer
				avroRenderer={{
					intCellRenderer: IntDummyComponent,
					dateCellRenderer: DateDummyComponent,
				}}
				colDef={{ avro: { type: { type: 'int', logicalType: 'timestamp-millis' } } }}
				data={{ value: 'value' }}
			/>,
		);

		expect(wrapper.getElement().type).toEqual(IntDummyComponent);
	});
});
