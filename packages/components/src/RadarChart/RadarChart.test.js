import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RadarChart } from './RadarChart.component';

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
		const { container } = render(
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

		expect(container.firstChild).toMatchSnapshot();
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
		render(
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
		userEvent.click(document.querySelectorAll('.recharts-polar-angle-axis-tick')[0]);

		// then
		expect(props.clickMock).toHaveBeenCalledWith(
			expect.objectContaining({
				index: 0,
			}),
			0,
			expect.any(Object),
		);
	});
	it('should render a chart with clickable dots', () => {
		const props = {
			data: [
				{ axis: 'Validity', A: 4 },
				{ axis: 'Social curation', A: 3 },
				{ axis: 'Completeness', A: 2 },
				{ axis: 'Discoverability', A: 1 },
				{ axis: 'Usage', A: 1 },
			],
			domain: [0, 5],
			dataKey: 'axis',
			activeAxis: 2,
			clickMock: jest.fn(),
		};

		// when
		render(
			<RadarChart data={props.data} domain={props.domain}>
				<RadarChart.PolarAngleAxis dataKey={props.dataKey} />
				<RadarChart.Radar
					dataKey="A"
					dot={<RadarChart.DotWithClick activeAxis={2} onClick={props.clickMock} />}
					fill="#19426c"
					fillOpacity={0.1}
					name="Trust score"
					stroke="#19426c"
				/>
			</RadarChart>,
		);

		// when
		userEvent.click(document.querySelectorAll('.recharts-dot')[0]);

		// then
		expect(props.clickMock).toHaveBeenCalledWith(
			expect.objectContaining({
				index: 0,
			}),
		);
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
		render(
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
		const dots = document.querySelectorAll('circle');
		expect(dots.length).toBe(5);
		expect(dots[0]).toHaveAttribute('fill-opacity', '1');
	});
});
