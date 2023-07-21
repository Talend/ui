import { render } from '@testing-library/react';
import VerticalBarChart from './VerticalBarChart.component';

describe('Vertical bar chart', () => {
	it('Should render', () => {
		const onBarClick = jest.fn();
		const { container } = render(
			<VerticalBarChart
				data={[
					{
						key: { min: 2000, max: 2100 },
						label: '[2000, 2100[',
						value: 200,
						filteredValue: 100,
					},
				]}
				height={300}
				width={300}
				onBarClick={onBarClick}
				getTooltipContent={jest.fn().mockImplementation(() => 'tooltip')}
			/>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it('Should display x axis label for date chart', () => {
		render(
			<VerticalBarChart
				data={[
					{
						key: {
							min: 946681200000,
							max: 1262300400000,
						},
						label: '[2000, 2010[',
						value: 249,
					},
				]}
				showXAxis
				height={300}
				width={300}
				onBarClick={jest.fn()}
				getTooltipContent={jest.fn()}
			/>,
		);

		expect(
			document.querySelectorAll('.xAxis .recharts-cartesian-axis-tick tspan')[0],
		).toHaveTextContent('[2000, 2010[');
	});

	it('Should not display x axis label for number chart', () => {
		render(
			<VerticalBarChart
				data={[
					{
						key: { min: 2000, max: 2100 },
						label: '[2000, 2100[',
						value: 200,
						filteredValue: 100,
					},
				]}
				height={300}
				width={300}
				onBarClick={jest.fn()}
				getTooltipContent={jest.fn()}
			/>,
		);

		expect(document.querySelectorAll('.xAxis .recharts-cartesian-axis-tick tspan')).toHaveLength(0);
	});
});
