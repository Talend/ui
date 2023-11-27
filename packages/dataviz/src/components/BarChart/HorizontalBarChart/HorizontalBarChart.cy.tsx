/* eslint-disable testing-library/await-async-queries */

/* eslint-disable testing-library/prefer-screen-queries */
import { ChartStyle } from '../../../types';
import HorizontalBarChart from './HorizontalBarChart.component';

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

		// eslint-disable-next-line cypress/unsafe-to-chain-command
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

	it('Should render tooltip on hover', () => {
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

		// eslint-disable-next-line cypress/unsafe-to-chain-command
		cy.get('.recharts-bar-rectangle')
			.first()
			.trigger('mousemove')
			.trigger('click', { force: true });
		cy.get('[data-test="tooltip"]').should('be.visible');
	});
	it('Should not grow to available size if not enough data provided', () => {
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
				onBarClick={onBarClick}
				getTooltipContent={() => <div data-testid="tooltip">tooltip</div>}
			/>,
		);
		// expect(component.find('ForwardRef').prop('height')).toEqual(65);
	});
});
