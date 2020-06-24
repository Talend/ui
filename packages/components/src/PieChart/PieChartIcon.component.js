import React from 'react';
import PropTypes from 'prop-types';
import { arc } from 'd3-shape';
import { withTranslation } from 'react-i18next';
import omit from 'lodash/omit';
import I18N_DOMAIN_COMPONENTS from '../constants';
import getDefaultT from '../translate';
import Skeleton from '../Skeleton';
import pieChartCssModule from './PieChart.scss';
import { getTheme } from '../theme';

const theme = getTheme(pieChartCssModule);
export const PIECHART_CONSTANTS = {
	MIN_SIZE: 20,
	MAX_SIZE: 100,
	MAX_PERCENT: 100,
	BASE_INNER_RADIUS: 6,
	BASE_OUTER_RADIUS: 9,
	BASE_PAD_ANGLE: 0.2,
	INNER_RADIUS_PER_PIXEL: 0.4,
	OUTER_RADIUS_PER_PIXEL: 0.45,
	PAD_ANGLE_PER_PIXEL: 0.0013,
};

export const PIECHART_SIZES = {
	SMALL: 'small',
	MEDIUM: 'medium',
	LARGE: 'large',
	XLARGE: 'xlarge',
	XXLARGE: 'xxlarge',
};

const displaySizes = {
	small: 20,
	medium: 35,
	large: 50,
	xlarge: 80,
	xxlarge: 100,
};

// we need just one instance of this, it's just a generator
const arcGen = arc();

/**
 * This function return the angle for a given percentage
 * @param {number} percentage the percentage to calculate the angle
 */
export function getAngle(percentage) {
	return ((percentage * 2) / 100) * Math.PI;
}

/**
 * This function return the showed value on the chart
 * @param {array} model the pie chart model
 * @param {index} index current index showed
 */
function getShowedValue(model, index) {
	if (!model) {
		return {};
	}
	return model[index];
}

/**
 * This function is just a sort
 * @param {object} a an element with a percentageShown to compare
 * @param {object} b an other element with a percentageShown to compare
 */
function sortElements(a, b) {
	return b.percentageShown - a.percentageShown;
}

/**
 * this function generates chart's empty part
 * @param {array} values the values shown in the graph
 * @param {object} size the current size
 * @param {function} arcGen the arc generator
 * @param {number} minimumPercentage the minimum percentage to be shown
 */
export function getEmptyPartCircle(values, size, minimumPercentage) {
	const allPercentages = values.reduce((acc, value) => acc + value.percentageShown, 0);
	if (allPercentages >= PIECHART_CONSTANTS.MAX_PERCENT - minimumPercentage) {
		return null;
	}

	const arcGenerated = arcGen({
		innerRadius: size.innerRadius,
		outerRadius: size.outerRadius,
		padAngle: size.padAngle,
		startAngle: getAngle(allPercentages),
		endAngle: Math.PI * 2,
	});
	return (
		<path
			className={theme('tc-pie-chart-color-alto')}
			d={arcGenerated}
			transform={`translate(${size.svgSize / 2},${size.svgSize / 2})`}
		/>
	);
}

/**
 * It increase values below minPercentage & decrease values above if some are increased
 * setMinimumPercentage([{percentage: 50}, {percentage: 2}], 5) would result on
 * [{percentage: 50, percentageShown: 47}, {percentage: 2, percentageShown: 5}]
 * @param {*} values the set of values
 * @param {*} minimumPercentage the minimum value we have to show
 * @param {*} amountToSubtract the amount to decrease
 */
export function distributePercentages(values, minimumPercentage, amountToSubtract) {
	/**
	 * This function decrease the percentage shown & the amount to subtract by 1
	 * @param {object} element the current element
	 */
	function decreaseElement(element) {
		if (amountToSubtract > 0) {
			// eslint-disable-next-line no-param-reassign
			element.percentageShown -= 1;
			// eslint-disable-next-line no-param-reassign
			amountToSubtract -= 1;
		}
	}

	while (amountToSubtract > 0) {
		const elementsToDecrease = values
			.filter(value => value.percentageShown > minimumPercentage)
			.sort(sortElements);
		if (elementsToDecrease.length > 0) {
			elementsToDecrease.forEach(decreaseElement);
		} else {
			// eslint-disable-next-line no-param-reassign
			amountToSubtract = 0;
		}
	}

	return values;
}

/**
 * This function sets minimum percentage show with the minimum percentage shown
 * @param {array} values the set of values
 * @param {number} minimumPercentage the minimum value we have to show
 */
export function setMinimumPercentage(model, minimumPercentage) {
	if (!model) {
		return [];
	}

	let amountToSubtract = 0;

	const valuesMins = model.map(value => {
		if (value.percentage && value.percentage < minimumPercentage) {
			amountToSubtract += minimumPercentage - value.percentage;
			return { ...value, percentageShown: minimumPercentage };
		}
		return { ...value, percentageShown: value.percentage };
	});

	return distributePercentages(valuesMins, minimumPercentage, amountToSubtract);
}

/**
 * This function return the sum of the percentages below the given index
 * @param {array} values the values to get when we have to start
 * @param {number} index the current index
 */
export function getPercentageToIndex(values, index) {
	return values.reduce((acc, value, i) => {
		if (i < index) {
			return acc + value.percentageShown;
		}
		return acc;
	}, 0);
}

/**
 * This function return the percentage label rounded or with some prefix
 * @param {number} percentage percentage to show as label
 */
function getPercentageAndPrefix(percentage) {
	if (percentage > 0 && percentage < 1) {
		return { prefix: '< ', percentage: 1 };
	} else if (percentage > 99 && percentage < 100) {
		return { prefix: '> ', percentage: 99 };
	}
	return { prefix: '', percentage: Math.round(percentage) };
}

/**
 * This function return the label or nothing if the label is npt passed or hidden
 * @param {boolean} hideLabel tell if the label has to be hidden or not
 * @param {number} labelValue the label value ( percentage )
 * @param {function} t translate function
 */
export function getLabel(hideLabel, labelValue, t) {
	if (!hideLabel && labelValue.percentage != null) {
		const { percentage, prefix } = getPercentageAndPrefix(labelValue.percentage);
		const labelPercentage = t('PIE_CHART_PERCENTAGE', {
			defaultValue: '{{percentage}}%',
			percentage,
		});
		return `${prefix}${labelPercentage}`;
	}
	return '';
}

/**
 * This function generate a part of circle for a value
 * @param {object} value the value to generate
 * @param {number} index the current index
 * @param {array} values the values to get when we have to start
 * @param {object} size the current graph size
 */
export function getCircle(value, index, values, size) {
	const percentagesDone = getPercentageToIndex(values, index);

	const arcGenerated = arcGen({
		innerRadius: size.innerRadius,
		outerRadius: size.outerRadius,
		padAngle: size.padAngle,
		startAngle: getAngle(percentagesDone),
		endAngle: getAngle(percentagesDone + value.percentageShown),
	});

	return (
		<path
			key={index}
			d={arcGenerated}
			className={theme(`tc-pie-chart-color-${value.color}`)}
			transform={`translate(${size.svgSize / 2},${size.svgSize / 2})`}
		/>
	);
}

/**
 * This function return useful stuff to build the graph of the loader
 * @param {number} size the size in px of the graph
 * @param {string} display the chosen display if given
 */
export function getDisplaySize(size, display) {
	let currentSize = size;
	if (!currentSize && display) {
		currentSize = displaySizes[display];
	}

	const pixelNumber = currentSize - PIECHART_CONSTANTS.MIN_SIZE;
	return {
		svgSize: currentSize,
		innerRadius: parseInt(
			PIECHART_CONSTANTS.BASE_INNER_RADIUS +
				PIECHART_CONSTANTS.INNER_RADIUS_PER_PIXEL * pixelNumber,
			10,
		),
		outerRadius: parseInt(
			PIECHART_CONSTANTS.BASE_OUTER_RADIUS +
				PIECHART_CONSTANTS.OUTER_RADIUS_PER_PIXEL * pixelNumber,
			10,
		),
		padAngle:
			PIECHART_CONSTANTS.BASE_PAD_ANGLE - PIECHART_CONSTANTS.PAD_ANGLE_PER_PIXEL * pixelNumber,
	};
}

export function PieChartIconComponent({
	display,
	hideLabel,
	labelIndex,
	loading,
	minimumPercentage,
	model,
	size,
	t,
	...rest
}) {
	const sizeObject = getDisplaySize(size, display);
	if (loading) {
		return (
			<span
				className={theme('tc-pie-chart-loading')}
				aria-busy="true"
				aria-label={t('PIE_CHART_LOADING', { defaultValue: 'Loading chart' })}
			>
				<Skeleton
					type={Skeleton.TYPES.circle}
					width={sizeObject.svgSize}
					height={sizeObject.svgSize}
					className={theme('tc-pie-chart-loading-circle')}
				/>
				{!hideLabel && <Skeleton type={Skeleton.TYPES.text} size={Skeleton.SIZES.small} />}
			</span>
		);
	}
	const labelValue = getShowedValue(model, labelIndex);
	const preparedValues = setMinimumPercentage(model, minimumPercentage);
	// Here we are omitting the props from i18n,
	// to keep only the event listener from the TooltipTrigger.
	const omitI18N = omit(rest, ['i18n', 'tReady']);

	return (
		<span className={theme('tc-pie-chart-icon')}>
			<svg
				width={sizeObject.svgSize}
				height={sizeObject.svgSize}
				className={theme('tc-pie-chart-icon-graph')}
				style={{ width: sizeObject.svgSize, height: sizeObject.svgSize }}
				{...omitI18N}
			>
				{preparedValues.map((value, index) => getCircle(value, index, preparedValues, sizeObject))}
				{getEmptyPartCircle(preparedValues, sizeObject, minimumPercentage)}
			</svg>
			<div className={theme(`tc-pie-chart-color-${labelValue.color}`)}>
				{getLabel(hideLabel, labelValue, t)}
			</div>
		</span>
	);
}

export const pieChartIconPropTypes = {
	display: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'xxlarge']),
	hideLabel: PropTypes.bool,
	labelIndex: PropTypes.number,
	loading: PropTypes.bool,
	minimumPercentage: PropTypes.number,
	model: PropTypes.arrayOf(
		PropTypes.shape({
			color: PropTypes.oneOf([
				'rio-grande',
				'chestnut-rose',
				'lightning-yellow',
				'dove-gray',
				'silver-chalice',
				'jaffa',
			]),
			percentage: PropTypes.number.isRequired,
		}).isRequired,
	),
	size: PropTypes.string,
};

PieChartIconComponent.propTypes = {
	...pieChartIconPropTypes,
	t: PropTypes.func,
};

PieChartIconComponent.defaultProps = {
	labelIndex: 0,
	minimumPercentage: 5,
	display: 'small',
	t: getDefaultT(),
};

PieChartIconComponent.displayName = 'PieChartIcon';

export default withTranslation(I18N_DOMAIN_COMPONENTS)(PieChartIconComponent);
