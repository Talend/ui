import { render, screen } from '@testing-library/react';
import CellMappedData from './CellMappedData.component';

describe('CellMappedData', () => {
	const valuesMap = {
		value_1: 'Value 1',
		value_2: 'Value 2',
		1: 'One',
		two: 2,
	};

	const defaultColumnData = { valuesMap };

	it('should render checked mapped data cell for a string value', () => {
		// given
		const cellData = 'value_1';

		// when
		const { container } = render(
			<CellMappedData cellData={cellData} columnData={defaultColumnData} />,
		);

		// then
		expect(container.firstChild).toMatchSnapshot();
		expect(screen.getByText('Value 1')).toBeVisible();
	});

	it('should render checked mapped data cell for a collection of values', () => {
		// given
		const cellData = ['value_1', null, 'not_mapped', 1, 'two', undefined];

		// when
		render(<CellMappedData cellData={cellData} columnData={defaultColumnData} />);

		// then
		expect(screen.getByText('2, not_mapped, One, Value 1')).toBeVisible();
	});

	it('should render checked mapped data cell for a collection of values', () => {
		// given
		const cellData = ['value_1', 'value_2'];
		const columnData = {
			...defaultColumnData,
			separator: ' / ',
		};

		// when
		render(<CellMappedData cellData={cellData} columnData={columnData} />);

		// then
		expect(screen.getByText('Value 1 / Value 2')).toBeVisible();
	});
});
