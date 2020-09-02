import React from 'react';
export { Radar } from 'recharts';
import {
	RadarChart as RechartsRadarChart,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis
} from 'recharts';
import PropTypes from 'prop-types';

export function RadarChart({
														children,
														clicker,
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
      <PolarAngleAxis dataKey={dataKey} onClick={clicker} />
      <PolarRadiusAxis domain={domain} tick={tick} tickLine={tickLine} />
			{ children }
    </RechartsRadarChart>
	);
}

// Not used yet
export function RadarAxisLabel({ onClick }) {
	return <button onClick={onClick} />;
}

RadarAxisLabel.propTypes = {
	onClick: PropTypes.func,
};

RadarChart.propTypes = {
	children: PropTypes.node.isRequired,
	clicker: PropTypes.func,
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
