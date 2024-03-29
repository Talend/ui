import { action } from '@storybook/addon-actions';
import tokens from '@talend/design-tokens';

import RadarChart from '.';

const ExampleDataSingle = [
	{ axis: 'Validity', A: 4 },
	{ axis: 'Popularity', A: 3 },
	{ axis: 'Completeness', A: 2 },
	{ axis: 'Discoverability', A: 1 },
	{ axis: 'Usage', A: 1 },
];

const ExampleDataMultiple = [
	{ axis: 'Validity', A: 4, B: 2 },
	{ axis: 'Popularity', A: 3, B: 5 },
	{ axis: 'Completeness', A: 2, B: 1 },
	{ axis: 'Discoverability', A: 1, B: 3 },
	{ axis: 'Usage', A: 1, B: 3 },
];

const ExampleDataClickable = [
	{ axis: 'Validity', A: 4 },
	{ axis: 'Popularity', A: 3 },
	{ axis: 'Completeness', A: 2 },
	{ axis: 'Discoverability', A: 1 },
	{ axis: 'Usage', A: 1 },
];

const chartDomain = [0, 5];

export default {
	title: 'Components/Dataviz/RadarChart',
	parameters: { chromatic: { disableSnapshot: true } },
};

export const RadarChartSingle = () => (
	<div>
		<h2>Single Object</h2>
		<p>A radar chart showing axis scores for a single object</p>
		<RadarChart data={ExampleDataSingle} domain={chartDomain}>
			<RadarChart.PolarAngleAxis dataKey="axis" />
			<RadarChart.Radar
				name="Trust score"
				dataKey="A"
				dot={true}
				stroke={tokens.coralColorChartsDefault}
				fill={tokens.coralColorChartsDefault}
				fillOpacity={0.1}
			/>
		</RadarChart>
	</div>
);

export const RadarChartMultiple = () => (
	<div>
		<h2>Multiple Objects</h2>
		<p>A radar chart showing axis scores for more than one object</p>
		<RadarChart data={ExampleDataMultiple} domain={chartDomain}>
			<RadarChart.PolarAngleAxis dataKey="axis" />
			<RadarChart.Radar
				name="Trust score 2019"
				dataKey="A"
				dot={false}
				stroke={tokens.coralColorChartsDefault}
				fill={tokens.coralColorChartsDefault}
				fillOpacity={0.1}
			/>
			<RadarChart.Radar
				name="Trust score 2020"
				dataKey="B"
				dot={false}
				stroke={tokens.coralColorChartsWarning}
				fill={tokens.coralColorChartsWarning}
				fillOpacity={0.1}
			/>
		</RadarChart>
	</div>
);

export const RadarChartClickableLabel = () => (
	<div>
		<h2>Clickable labels</h2>
		<p>A radar chart with clickable axis labels</p>
		<RadarChart data={ExampleDataClickable} domain={chartDomain}>
			<RadarChart.PolarAngleAxis
				dataKey="axis"
				tick={<RadarChart.LabelWithClick activeAxis={2} />}
				onClick={action('Axis label was clicked')}
			/>
			<RadarChart.Radar
				dataKey="A"
				dot={false}
				stroke={tokens.coralColorChartsDefault}
				fill={tokens.coralColorChartsDefault}
				fillOpacity={0.1}
				name="Trust score"
			/>
		</RadarChart>
	</div>
);

export const RadarChartClickableDot = () => (
	<div>
		<h2>Clickable dot</h2>
		<p>A radar chart with clickable dots</p>
		<RadarChart data={ExampleDataClickable} domain={chartDomain}>
			<RadarChart.PolarAngleAxis dataKey="axis" />
			<RadarChart.Radar
				dataKey="A"
				dot={<RadarChart.DotWithClick activeAxis={2} onClick={action('Axis dot was clicked')} />}
				stroke={tokens.coralColorChartsDefault}
				fill={tokens.coralColorChartsDefault}
				fillOpacity={0.1}
				name="Trust score"
			/>
		</RadarChart>
	</div>
);

export const RadarChartCustomDot = () => (
	<div>
		<h2>Custom dot element</h2>
		<p>A radar chart with custom dots</p>
		<RadarChart data={ExampleDataClickable} domain={chartDomain}>
			<RadarChart.PolarAngleAxis dataKey="axis" />
			<RadarChart.Radar
				dataKey="A"
				dot={<RadarChart.Dot activeAxis={2} />}
				stroke={tokens.coralColorChartsDefault}
				fill={tokens.coralColorChartsDefault}
				fillOpacity={0.1}
				name="Trust score"
			/>
		</RadarChart>

		<div>
			<p id="clickMessage"></p>
		</div>
	</div>
);
