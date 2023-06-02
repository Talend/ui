/* eslint-disable testing-library/await-async-query */
/* eslint-disable testing-library/prefer-screen-queries */

import HorizontalBarChart from './HorizontalBarChart.component';
import { ChartStyle } from '../../../types';

context('<HorizontalBarChart />', () => {
	it('Should trigger onBarClick', () => {
		const onBarClick = cy.stub().as('onBarClick');
		cy.mount(
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
				getTooltipContent={() => <div data-testid="tooltip">tooltip</div>}
			/>,
		);

		cy.get('.recharts-bar-rectangle')
			.first()
			.trigger('mousemove')
			.trigger('click', { force: true });
		cy.get('@onBarClick').should('be.calledWith', Cypress.sinon.match.object, {
			filteredValue: 2145,
			key: 'Entry fully matching filter',
			value: 2145,
		});
	});

	// it('Should render tooltip on hover', () => {
	// 	const getTooltipContent = jest.fn().mockImplementation(() => 'myTooltipContent');
	// 	const component = mount(
	// 		<HorizontalBarChart
	// 			data={[
	// 				{
	// 					key: 'Entry fully matching filter',
	// 					value: 2145,
	// 					filteredValue: 2145,
	// 				},
	// 			]}
	// 			chartStyle={ChartStyle.VALUE}
	// 			height={300}
	// 			width={400}
	// 			onBarClick={jest.fn()}
	// 			getTooltipContent={getTooltipContent}
	// 		/>,
	// 	);

	// 	component.find('BarChart').invoke('onMouseMove')!({
	// 		isTooltipActive: true,
	// 		activeTooltipIndex: 0,
	// 	} as any);
	// 	component.update();

	// 	expect(getTooltipContent).toHaveBeenCalledWith({
	// 		filteredValue: 2145,
	// 		key: 'Entry fully matching filter',
	// 		value: 2145,
	// 	});
	// 	expect(component.find('Tooltip').text()).toEqual('myTooltipContent');
	// });
	// it('Should not grow to available size if not enough data provided', () => {
	// 	const component = mount(
	// 		<HorizontalBarChart
	// 			data={[
	// 				{
	// 					key: 'Entry fully matching filter',
	// 					value: 2145,
	// 					filteredValue: 2145,
	// 				},
	// 			]}
	// 			chartStyle={ChartStyle.VALUE}
	// 			onBarClick={jest.fn()}
	// 			getTooltipContent={jest.fn()}
	// 		/>,
	// 	);
	// 	expect(component.find('ForwardRef').prop('height')).toEqual(65);
	// });
});
