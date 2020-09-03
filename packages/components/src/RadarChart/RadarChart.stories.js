import React from 'react';
import { storiesOf } from '@storybook/react';
import { Radar, RadarChart, RadarAxisLabel, PolarAngleAxis, customizedTick } from './RadarChart.component';

const ExampleDataSingle = [
    { axis: 'Validity', A: 4 },
    { axis: 'Social curation', A: 3 },
    { axis: 'Completeness', A: 2 },
    { axis: 'Discoverability', A: 1 }
];

const chartDomain = [0, 5];

// This would be in the host app (TDC)
const onClick = function () {
  var list = document.getElementById('listOfStuff');
  list.querySelector('[data-axis-index="' + event.target.dataset.axisIndex + '"]').style.fontWeight = "900";
};

const stories = storiesOf('Data/Dataviz/RadarChart', module);
stories
	.addDecorator(story => <div className="col-lg-offset-2 col-lg-8">{story()}</div>)
	.add('RadarChartSingle', () => (
		<div>
			<p>Single Objects</p>
			<RadarChart data={ExampleDataSingle} dataKey="axis" domain={chartDomain}>
        <PolarAngleAxis dataKey="axis" tick={customizedTick} onClick={onClick} />
				<Radar
					name="Trust score"
					dataKey="A"
          dot={true}
					stroke="#8884d8"
					fill="#8884d8"
					fillOpacity={0.6}
				/>
			</RadarChart>

      // Test panel for onClick
      <div>
        <ul id="listOfStuff">
          <li data-axis-index="0">Validity</li>
          <li data-axis-index="1">Social curation</li>
          <li data-axis-index="2">Completeness</li>
          <li data-axis-index="3">Discoverability</li>
        </ul>
      </div>
		</div>
	))
