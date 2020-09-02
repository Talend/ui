import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ActionButton from '../Actions/ActionButton';
import { Radar, RadarChart, RadarLabel } from './RadarChart.component';

const onClick = function () {
  var tab = document.querySelector('[data-axis="' + event.target.innerHTML + '"]')
  console.log(tab);
};

const ExampleDataSingle = [
    { axis: 'Validity', A: 4 },
    { axis: 'Social curation', A: 3 },
    { axis: 'Completeness', A: 2 },
    { axis: 'Discoverability', A: 1 }
];

const ExampleDataMultiple = [
    { axis: 'Validity', A: 4, B: 5 },
    { axis: 'Social curation', A: 3, B: 4 },
    { axis: 'Completeness', A: 2, B: 3 },
    { axis: 'Discoverability', A: 1, B: 2 }
];

const chartDomain = [0, 5];

const stories = storiesOf('Data/Dataviz/RadarChart', module);
stories
	.addDecorator(story => <div className="col-lg-offset-2 col-lg-8">{story()}</div>)
	.add('RadarChartSingle', () => (
		<div>
			<p>Single Objects</p>
			<RadarChart data={ExampleDataSingle} dataKey="axis" domain={chartDomain} clicker={onClick}>
				<Radar
					name="Trust score"
					dataKey="A"
          dot={true}
					stroke="#8884d8"
					fill="#8884d8"
					fillOpacity={0.6}
				/>
			</RadarChart>
      <div>
        <ul>
          <li data-axis="Validity">Validity</li>
          <li data-axis="Social curation">Social curation</li>
          <li data-axis="Completeness">Completeness</li>
          <li data-axis="Discoverability">Discoverability</li>
        </ul>
      </div>
		</div>
	))
  .add('RadarChartMultiple', () => (
		<div>
			<p>Multiple Objects</p>
			<RadarChart data={ExampleDataMultiple} dataKey="axis" domain={chartDomain}>
				<Radar
					name="Trust score before"
					dataKey="A"
          dot={true}
					stroke="#8884d8"
					fill="#8884d8"
					fillOpacity={0.6}
				/>
        <Radar
					name="Trust score after"
					dataKey="B"
          dot={true}
					stroke="#8884d8"
					fill="#8884d8"
					fillOpacity={0.6}
				/>
			</RadarChart>
		</div>
	))
