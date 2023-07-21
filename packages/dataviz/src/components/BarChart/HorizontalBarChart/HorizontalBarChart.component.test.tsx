import { render } from '@testing-library/react';
import HorizontalBarChart from './HorizontalBarChart.component';
import { ChartStyle } from '../../../types';

describe('Horizontal bar chart', () => {
	it('should render', () => {
		const onBarClick = jest.fn();
		const { container } = render(
			<HorizontalBarChart
				data={[
					{
						key: 'Entry fully matching filter',
						value: 2145,
						filteredValue: 2145,
					},
				]}
				chartStyle={ChartStyle.VALUE}
				height={300}
				width={400}
				onBarClick={onBarClick}
				getTooltipContent={jest.fn().mockImplementation(() => 'tooltip')}
			/>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});
});
