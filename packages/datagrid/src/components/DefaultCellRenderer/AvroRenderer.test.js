import React from 'react';

import { render, screen } from '@testing-library/react';

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
	it('should render AvroRenderer and load default component when no renderer', () => {
		const wrapper = render(<AvroRenderer avro={{ type: 'any' }} value={'value'} />);

		expect(wrapper.asFragment()).toMatchSnapshot();
	});
});

describe('mapping cellRenderer', () => {
	it('should use intCellRenderer when type is double', () => {
		render(
			<AvroRenderer
				avroRenderer={{
					stringCellRenderer: StringDummyComponent,
					intCellRenderer: IntDummyComponent,
				}}
				avro={{ type: 'double' }}
				value={'value'}
			/>,
		);

		expect(screen.getByText('int dummy component')).toBeInTheDocument();
	});

	it('should use intCellRenderer when type is float', () => {
		render(
			<AvroRenderer
				avroRenderer={{
					stringCellRenderer: StringDummyComponent,
					intCellRenderer: IntDummyComponent,
				}}
				avro={{ type: 'float' }}
				value={{ value: 'value' }}
			/>,
		);

		expect(screen.getByText('int dummy component')).toBeInTheDocument();
	});

	it('should use intCellRenderer when type is int', () => {
		render(
			<AvroRenderer
				avroRenderer={{
					stringCellRenderer: StringDummyComponent,
					intCellRenderer: IntDummyComponent,
				}}
				avro={{ type: 'int' }}
				value={'value'}
			/>,
		);

		expect(screen.getByText('int dummy component')).toBeInTheDocument();
	});

	it('should use intCellRenderer when type is long', () => {
		render(
			<AvroRenderer
				avroRenderer={{
					stringCellRenderer: StringDummyComponent,
					intCellRenderer: IntDummyComponent,
				}}
				avro={{ type: 'long' }}
				value={'value'}
			/>,
		);

		expect(screen.getByText('int dummy component')).toBeInTheDocument();
	});

	it('should use dateCellRenderer when type is long and logicalType is timestamp-millis', () => {
		render(
			<AvroRenderer
				avroRenderer={{
					dateCellRenderer: DateDummyComponent,
				}}
				avro={{ type: 'long', logicalType: 'timestamp-millis' }}
				value={'value'}
			/>,
		);

		expect(screen.getByText('date dummy component')).toBeInTheDocument();
	});

	it('should use intCellRenderer when type is int and logicalType is timestamp-millis', () => {
		render(
			<AvroRenderer
				avroRenderer={{
					intCellRenderer: IntDummyComponent,
					dateCellRenderer: DateDummyComponent,
				}}
				avro={{ type: 'int', logicalType: 'timestamp-millis' }}
				value={'value'}
			/>,
		);

		expect(screen.getByText('int dummy component')).toBeInTheDocument();
	});
});
