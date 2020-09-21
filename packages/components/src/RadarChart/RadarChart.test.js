import React from 'react';
import { mount } from 'enzyme';
import RadarChart from '.';

describe('RadarChart', () => {
	it('should render a RadarChart', () => {
		const props = {
			data: [
				{ axis: 'Validity', A: 4 },
				{ axis: 'Social curation', A: 3 },
				{ axis: 'Completeness', A: 2 },
				{ axis: 'Discoverability', A: 1 },
				{ axis: 'other', A: 1 },
			],
			domain: [0, 5],
			dataKey: 'axis',
		};

		// when
		const wrapper = mount(
			<RadarChart data={props.data} domain={props.domain}>
				<RadarChart.PolarAngleAxis dataKey={props.dataKey} />
				<RadarChart.Radar
					name="Trust score"
					dataKey="A"
					dot
					stroke="#19426c"
					fill="#19426c"
					fillOpacity={0.1}
				/>
			</RadarChart>,
		);

		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render a chart with clickable labels', () => {
		const props = {
			data: [
				{ axis: 'Validity', A: 4 },
				{ axis: 'Social curation', A: 3 },
				{ axis: 'Completeness', A: 2 },
				{ axis: 'Discoverability', A: 1 },
				{ axis: 'other', A: 1 },
			],
			domain: [0, 5],
			dataKey: 'axis',
			activeAxis: 2,
			clickMock: jest.fn(),
		};

		// when
		const wrapper = mount(
			<RadarChart data={props.data} domain={props.domain}>
				<RadarChart.PolarAngleAxis
					dataKey="axis"
					tick={<RadarChart.LabelWithClick activeAxis={props.activeAxis} />}
					onClick={props.clickMock}
				/>
				<RadarChart.Radar
					name="Trust score"
					dataKey="A"
					dot={false}
					stroke="#19426c"
					fill="#19426c"
					fillOpacity={0.1}
				/>
			</RadarChart>,
		);

		// when
		wrapper.find('.recharts-polar-angle-axis-tick').at(0).simulate('click');

		// then
		expect(props.clickMock).toHaveBeenCalled();
	});
	it('should render a chart with custom dots', () => {
		const props = {
			data: [
				{ axis: 'Validity', A: 4 },
				{ axis: 'Social curation', A: 3 },
				{ axis: 'Completeness', A: 2 },
				{ axis: 'Discoverability', A: 1 },
				{ axis: 'other', A: 1 },
			],
			domain: [0, 5],
			dataKey: 'axis',
			activeAxis: 2,
		};

		// when
		const wrapper = mount(
			<RadarChart data={props.data} domain={props.domain}>
				<RadarChart.PolarAngleAxis dataKey={props.dataKey} />
				<RadarChart.Radar
					dataKey="A"
					dot={<RadarChart.Dot activeAxis={props.activeAxis} />}
					fill="#19426c"
					fillOpacity={0.1}
					isAnimationActive={false}
					name="Trust score"
					stroke="#19426c"
				/>
			</RadarChart>,
		);

		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
