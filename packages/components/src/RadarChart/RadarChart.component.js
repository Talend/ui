import React from 'react';
export { Radar, PolarAngleAxis } from 'recharts';
import {
	RadarChart as RechartsRadarChart,
	PolarGrid,
	PolarRadiusAxis
} from 'recharts';
import PropTypes from 'prop-types';

export function RadarChart({
														children,
														cx,
														cy,
														data,
														dataKey,
														domain,
														height,
														innerRadius,
														outerRadius,
														tick,
														tickLine,
														width
													})
	{
	return (
		<RechartsRadarChart
			cx={cx}
			cy={cy}
			outerRadius={outerRadius}
			innerRadius={innerRadius}
			width={width}
			height={height}
			data={data}
		>
      <PolarGrid />
      <PolarRadiusAxis domain={domain} tick={tick} tickLine={tickLine} />
			{ children }
    </RechartsRadarChart>
	);
}

// Not currently used
function RadarAxisLabel(payload, x, y, textAnchor, index) {
	return (
  	<text x={x} y={y} textAnchor={textAnchor} data-axis-index={index} role="button" >
    	{payload.value}
    </text>
  );
}

export function customizedTick(props) {
	const { payload, x, y, index, textAnchor } = props;

	return (
  	<text x={x} y={y} textAnchor={textAnchor} data-axis-index={index} role="button" >
    	{payload.value}
    </text>
  );
};

RadarChart.propTypes = {
	children: PropTypes.node.isRequired,
	cx: PropTypes.number,
	cy: PropTypes.number,
	data: PropTypes.array.isRequired,
	dataKey: PropTypes.string.isRequired,
	domain: PropTypes.array,
	height: PropTypes.number,
	innerRadius: PropTypes.number,
	outerRadius: PropTypes.number,
	tick: PropTypes.bool,
	tickLine: PropTypes.bool,
	width: PropTypes.number
};

RadarChart.defaultProps = {
	cx: 200,
	cy: 120,
	height: 230,
	innerRadius: 0,
	outerRadius: 100,
	tick: false,
	tickLine: false,
	width: 400,
};

RadarChart.displayName = 'RadarChart';
