import { mount } from 'enzyme';
// rewrite tests using react-testing-library
import { screen, render, fireEvent } from '@testing-library/react';
import HorizontalBarChart from './HorizontalBarChart.component';
import { ChartStyle } from '../../../types';

describe('Horizontal bar chart', () => {
	xit('should render', () => {
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
	it('Should trigger onBarClick', () => {
		const onBarClick = jest.fn();
		render(
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
		screen.debug();
		const chart = document.querySelector('.theme-horizontal-bar-chart');
		const bar = document.querySelectorAll('.recharts-bar-rectangle')[0];
		fireEvent.mouseMove(bar, { isTooltipActive: true, activeTooltipIndex: 0 });
		// , new MouseMove {
		// 	clientX: 0,
		// 	clientY: 10,
		// });
		fireEvent.focus(bar);
		fireEvent.click(bar);
		// component.find('BarChart').invoke('onMouseMove')!({
		// 	isTooltipActive: true,
		// 	activeTooltipIndex: 0,
		// } as any);
		// component.update();
		// component.find('BarChart').invoke('onClick')!({} as any);

		expect(onBarClick).toHaveBeenCalledWith(undefined, {
			filteredValue: 2145,
			key: 'Entry fully matching filter',
			value: 2145,
		});
	});

	xit('Should render tooltip on hover', () => {
		const getTooltipContent = jest.fn().mockImplementation(() => 'myTooltipContent');
		const component = mount(
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
				onBarClick={jest.fn()}
				getTooltipContent={getTooltipContent}
			/>,
		);

		component.find('BarChart').invoke('onMouseMove')!({
			isTooltipActive: true,
			activeTooltipIndex: 0,
		} as any);
		component.update();

		expect(getTooltipContent).toHaveBeenCalledWith({
			filteredValue: 2145,
			key: 'Entry fully matching filter',
			value: 2145,
		});
		expect(component.find('Tooltip').text()).toEqual('myTooltipContent');
	});
	xit('Should not grow to available size if not enough data provided', () => {
		const component = mount(
			<HorizontalBarChart
				data={[
					{
						key: 'Entry fully matching filter',
						value: 2145,
						filteredValue: 2145,
					},
				]}
				chartStyle={ChartStyle.VALUE}
				onBarClick={jest.fn()}
				getTooltipContent={jest.fn()}
			/>,
		);
		expect(component.find('ForwardRef').prop('height')).toEqual(65);
	});
});
