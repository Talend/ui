import PropTypes from 'prop-types';
import {
	PolarAngleAxis,
	PolarGrid,
	PolarRadiusAxis,
	Radar,
	Dot as RechartsDot,
	RadarChart as RechartsRadarChart,
} from 'recharts';

import tokens from '@talend/design-tokens';

import { getTheme } from '../theme';

import radarChartCssModule from './RadarChart.module.scss';

const theme = getTheme(radarChartCssModule);

/**
 * This function renders a Recharts radar chart for a given set of data
 * @param {Array} children required child elements
 * @param {string} className style classes for the component
 * @param {number} cx the horizontal start position of the chart
 * @param {number} cy the vertical start position of the chart
 * @param {Array} data the data to be rendered in the chart
 * @param {Array} domain the minimum and maximum chart values
 * @param {number} height the height of the chart container
 * @param {number} innerRadius the starting radius of the chart
 * @param {number} outerRadius the ending radius of the chart
 * @param {boolean} tick option to show a value scale on the chart
 * @param {boolean} tickLine option to draw a line from the chart to the tick/label
 * @param {number} width the width of the chart container
 */
export function RadarChart({
	children,
	className,
	cx,
	cy,
	data,
	domain,
	height,
	innerRadius,
	outerRadius,
	tick,
	tickLine,
	width,
}) {
	return (
		<RechartsRadarChart
			className={theme('tc-radar-chart', className)}
			cx={cx}
			cy={cy}
			outerRadius={outerRadius}
			innerRadius={innerRadius}
			width={width}
			height={height}
			data={data}
			fill={tokens.coralColorNeutralBorder}
		>
			<PolarGrid />
			<PolarRadiusAxis domain={domain} tick={tick} axisLine={tickLine} />
			{children}
		</RechartsRadarChart>
	);
}
RadarChart.displayName = 'RadarChart';
RadarChart.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	cx: PropTypes.number,
	cy: PropTypes.number,
	data: PropTypes.array.isRequired,
	domain: PropTypes.array,
	height: PropTypes.number,
	innerRadius: PropTypes.number,
	outerRadius: PropTypes.number,
	tick: PropTypes.bool,
	tickLine: PropTypes.bool,
	width: PropTypes.number,
};

RadarChart.defaultProps = {
	cx: 210,
	cy: 140,
	height: 250,
	innerRadius: 0,
	outerRadius: 100,
	tick: false,
	tickLine: false,
	width: 420,
};

/**
 * This function provides a custom clickable axis label with a data link to the index of the chart data
 * @param {Object} props the current props of the PolarAngleAxis
 */
function LabelWithClick(props) {
	const { activeAxis, className, index, payload, y, ...rest } = props;
	let selectedClass = '';

	if (activeAxis === index) {
		selectedClass = theme('tc-radar-chart-label--selected', className);
	}

	return (
		<text {...rest} y={y} data-axis-index={index} role="button" className={selectedClass}>
			{payload.value}
		</text>
	);
}
LabelWithClick.displayName = 'LabelWithClick';
LabelWithClick.propTypes = {
	activeAxis: PropTypes.number,
	className: PropTypes.string,
	index: PropTypes.number,
	payload: PropTypes.object,
	y: PropTypes.number,
};

/**
 * This function provides a custom dot with a data link to the index of the chart data
 * @param {Object} props the current props of the Radar
 */
function Dot(props) {
	const { activeAxis, index } = props;
	let newR = 4;

	if (activeAxis === index) {
		newR = 4;
	} else {
		newR = 2;
	}
	return <RechartsDot {...props} fillOpacity={1} r={newR} />;
}
Dot.displayName = 'Dot';
Dot.propTypes = {
	activeAxis: PropTypes.number,
	index: PropTypes.number,
};

/**
 * This function provides a clickable axis dot element
 * @param {Object} props the current props of the Radar
 */
function DotWithClick(props) {
	const { activeAxis, fill = tokens.coralColorNeutralBorder, index, onClick, ...rest } = props;
	const STATE = {
		DEFAULT_RADIUS: 2,
		DEFAULT_STROKE_WIDTH: 12,
		ACTIVE_RADIUS: 4,
		ACTIVE_STROKE_WIDTH: 8,
	};

	return (
		<RechartsDot
			{...rest}
			fill={fill}
			fillOpacity={1}
			onClick={params => onClick({ ...params, index })}
			r={activeAxis === index ? STATE.ACTIVE_RADIUS : STATE.DEFAULT_RADIUS}
			role="button"
			stroke={fill}
			strokeOpacity={0}
			strokeWidth={activeAxis === index ? STATE.ACTIVE_STROKE_WIDTH : STATE.DEFAULT_STROKE_WIDTH}
			tabIndex={0}
		/>
	);
}
DotWithClick.displayName = 'DotWithClick';
DotWithClick.propTypes = {
	activeAxis: PropTypes.number,
	fill: PropTypes.string,
	index: PropTypes.number,
	onClick: PropTypes.func,
};

RadarChart.LabelWithClick = LabelWithClick;
RadarChart.Dot = Dot;
RadarChart.DotWithClick = DotWithClick;
RadarChart.Radar = Radar;
RadarChart.PolarAngleAxis = PolarAngleAxis;
