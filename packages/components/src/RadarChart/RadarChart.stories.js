import React from 'react';
import { storiesOf } from '@storybook/react';
import { Radar, RadarChart, RadarAxisLabel, PolarAngleAxis } from './RadarChart.component';

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
  list.querySelector('[data-axis="' + event.target.dataset.index + '"]').style.fontWeight = "900";
};

// This needs to be contained within <RadarAxisLabel />?
const customizedTick = (props) => {
	const { payload, x, y, index, textAnchor } = props;
  const item = ExampleDataSingle[index];

  return (
  	<text x={x} y={y} textAnchor={textAnchor} data-index={index} onClick={onClick} >
    	{payload.value}
    </text>
  );
};

const stories = storiesOf('Data/Dataviz/RadarChart', module);
stories
	.addDecorator(story => <div className="col-lg-offset-2 col-lg-8">{story()}</div>)
	.add('RadarChartSingle', () => (
		<div>
			<p>Single Objects</p>
			<RadarChart data={ExampleDataSingle} dataKey="axis" domain={chartDomain}>
        <PolarAngleAxis dataKey="axis" tick={ customizedTick } /> // Should pass <RadarAxisLabel /> to 'tick' here
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
        <ul id="listOfStuff">
          <li data-axis="0">Validity</li>
          <li data-axis="1">Social curation</li>
          <li data-axis="2">Completeness</li>
          <li data-axis="3">Discoverability</li>
        </ul>
      </div>
		</div>
	))
