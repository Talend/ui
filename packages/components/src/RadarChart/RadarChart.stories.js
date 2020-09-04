import React from 'react';
import { storiesOf } from '@storybook/react';
import { Radar, RadarChart, PolarAngleAxis, customizedTick } from './RadarChart.component';

const ExampleDataSingle = [
    { axis: 'Validity', A: 4 },
    { axis: 'Social curation', A: 3 },
    { axis: 'Completeness', A: 2 },
    { axis: 'Discoverability', A: 1 },
    { axis: 'other', A: 1 }
];

const ExampleDataMultiple = [
    { axis: 'Validity', A: 4, B: 2 },
    { axis: 'Social curation', A: 3, B: 5 },
    { axis: 'Completeness', A: 2, B: 1 },
    { axis: 'Discoverability', A: 1, B: 3 },
    { axis: 'other', A: 1, B: 3 }
];

const ExampleDataClickable = [
    { axis: 'Validity', A: 4 },
    { axis: 'Social curation', A: 3 },
    { axis: 'Completeness', A: 2 },
    { axis: 'Discoverability', A: 1 },
];

const chartDomain = [0, 5];

/**
 * A click function provided by the host app
 */
const onClick = function () {
  document.getElementById('clickMessage').innerHTML = "Good job! You clicked " + event.target.innerHTML + ".";
};

const stories = storiesOf('Data/Dataviz/RadarChart', module);
stories
	.addDecorator(story => <div className="col-lg-12">{story()}</div>)
	.add('Radar Chart Single', () => (
		<div>
			<h2>Single Object</h2>
      <p>A radar chart showing axis scores for a single object</p>
			<RadarChart data={ExampleDataSingle} domain={chartDomain}>
        <PolarAngleAxis dataKey="axis" />
				<Radar
					name="Trust score"
					dataKey="A"
          dot={true}
					stroke="#599d85"
					fill="#599d85"
					fillOpacity={0.2}
				/>
			</RadarChart>
		</div>
	))
  .add('Radar Chart Multiple', () => (
		<div>
			<h2>Multiple Objects</h2>
      <p>A radar chart showing axis scores for more than one object</p>
			<RadarChart data={ExampleDataMultiple} domain={chartDomain}>
        <PolarAngleAxis dataKey="axis" />
				<Radar
					name="Trust score 2019"
					dataKey="A"
          dot={true}
					stroke="#599d85"
					fill="#599d85"
					fillOpacity={0.2}
				/>
        <Radar
					name="Trust score 2020"
					dataKey="B"
          dot={true}
					stroke="#6c599d"
					fill="#6c599d"
					fillOpacity={0.2}
				/>
			</RadarChart>
		</div>
	))
  .add('Radar Chart Clickable', () => (
		<div>
			<h2>Single Object</h2>
      <p>A radar chart with clickable axis labels</p>
			<RadarChart data={ExampleDataClickable} domain={chartDomain}>
        <PolarAngleAxis dataKey="axis" tick={customizedTick} onClick={onClick} />
				<Radar
					name="Trust score"
					dataKey="A"
          dot={true}
					stroke="#599d85"
					fill="#599d85"
					fillOpacity={0.2}
				/>
			</RadarChart>

      <div>
        <p id="clickMessage">You haven't clicked anything yet.</p>
      </div>
		</div>
	))
