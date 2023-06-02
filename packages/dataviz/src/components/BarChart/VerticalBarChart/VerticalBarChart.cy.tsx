// it('Should trigger onBarClick', () => {
// 	const onBarClick = jest.fn();
// 	const entry = {
// 		key: { min: 2000, max: 2100 },
// 		label: '[2000, 2100[',
// 		value: 200,
// 		filteredValue: 100,
// 	};
// 	const component = mount(
// 		<VerticalBarChart
// 			data={[entry]}
// 			height={300}
// 			width={300}
// 			onBarClick={onBarClick}
// 			getTooltipContent={jest.fn().mockImplementation(() => 'tooltip')}
// 		/>,
// 	);

// 	component.find('BarChart').invoke('onMouseMove')!({
// 		isTooltipActive: true,
// 		activeTooltipIndex: 0,
// 	} as any);
// 	component.update();
// 	component.find('BarChart').invoke('onClick')!({} as any);

// 	expect(onBarClick).toHaveBeenCalledWith(undefined, entry);
// });
// it('Should render tooltip on hover', () => {
// 	const getTooltipContent = jest.fn().mockImplementation(() => 'myTooltipContent');
// 	const entry = {
// 		key: { min: 2000, max: 2100 },
// 		label: '[2000, 2100[',
// 		value: 200,
// 		filteredValue: 100,
// 	};
// 	const component = mount(
// 		<VerticalBarChart
// 			data={[entry]}
// 			height={300}
// 			width={300}
// 			onBarClick={jest.fn()}
// 			getTooltipContent={getTooltipContent}
// 		/>,
// 	);

// 	component.find('BarChart').invoke('onMouseMove')!({
// 		isTooltipActive: true,
// 		activeTooltipIndex: 0,
// 	} as any);
// 	component.update();

// 	expect(getTooltipContent).toHaveBeenCalledWith(entry);
// 	expect(component.find('Tooltip').text()).toEqual('myTooltipContent');
// });
