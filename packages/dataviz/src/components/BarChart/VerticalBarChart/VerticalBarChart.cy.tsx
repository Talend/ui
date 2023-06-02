import VerticalBarChart from './VerticalBarChart.component';
context('<HorizontalBarChart />', () => {
	it('Should trigger onBarClick', () => {
		const onBarClick = cy.stub().as('onBarClick');
		const entry = {
			key: { min: 2000, max: 2100 },
			label: '[2000, 2100[',
			value: 200,
			filteredValue: 100,
		};
		cy.mount(
			<VerticalBarChart
				data={[entry]}
				height={300}
				width={300}
				onBarClick={onBarClick}
				getTooltipContent={() => <div data-testid="tooltip">tooltip</div>}
			/>,
		);
		cy.get('.recharts-bar-rectangle')
			.first()
			.trigger('mousemove')
			.trigger('click', { force: true });
		cy.get('@onBarClick').should('be.calledWith', Cypress.sinon.match.object, entry);
	});
	it('Should render tooltip on hover', () => {
		const onBarClick = cy.stub().as('onBarClick');
		const getTooltipContent = () => <div data-test="myTooltipContent">myTooltipContent</div>;
		const entry = {
			key: { min: 2000, max: 2100 },
			label: '[2000, 2100[',
			value: 200,
			filteredValue: 100,
		};
		cy.mount(
			<VerticalBarChart
				data={[entry]}
				height={300}
				width={300}
				onBarClick={onBarClick}
				getTooltipContent={getTooltipContent}
			/>,
		);
		cy.get('.recharts-bar-rectangle')
			.first()
			.trigger('mousemove')
			.trigger('click', { force: true });

		cy.get('[data-test="myTooltipContent"]').should('be.visible');
	});
});
