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
		// 	component.find('BarChart').invoke('onMouseMove')!({
		// 		isTooltipActive: true,
		// 		activeTooltipIndex: 0,
		// 	} as any);
		// 	component.update();
		// 	component.find('BarChart').invoke('onClick')!({} as any);
		// 	expect(onBarClick).toHaveBeenCalledWith(undefined, entry);
	});
	it('Should render tooltip on hover', () => {
		const onBarClick = cy.stub().as('onBarClick');
		const getTooltipContent = () => <div data-test="myTooltipContent">tooltip</div>;
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
		// 	component.find('BarChart').invoke('onMouseMove')!({
		// 		isTooltipActive: true,
		// 		activeTooltipIndex: 0,
		// 	} as any);
		// 	component.update();
		// 	expect(getTooltipContent).toHaveBeenCalledWith(entry);
		// 	expect(component.find('Tooltip').text()).toEqual('myTooltipContent');
	});
});
