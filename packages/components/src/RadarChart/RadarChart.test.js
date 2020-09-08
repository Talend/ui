import React from 'react';
import { mount } from 'enzyme';
import { Radar, RadarChart, PolarAngleAxis, Dot, LabelWithClick } from './RadarChart.component';

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
				<PolarAngleAxis dataKey={props.dataKey} />
				<Radar
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
			func: true,
		};

		// when
		const wrapper = mount(
			<RadarChart data={props.data} domain={props.domain}>
				<PolarAngleAxis
					dataKey="axis"
					tick={<LabelWithClick activeAxis={props.activeAxis} />}
					onClick={props.func}
				/>
				<Radar
					name="Trust score"
					dataKey="A"
					dot={false}
					stroke="#19426c"
					fill="#19426c"
					fillOpacity={0.1}
				/>
			</RadarChart>,
		);

		expect(wrapper.getElement()).toMatchSnapshot();
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
				<PolarAngleAxis dataKey={props.dataKey} />
				<Radar
					dataKey="A"
					dot={<Dot activeAxis={props.activeAxis} />}
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
