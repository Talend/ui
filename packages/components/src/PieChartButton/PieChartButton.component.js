import React from 'react';
import PropTypes from 'prop-types';
import { arc } from 'd3-shape';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import classnames from 'classnames';
import TooltipTrigger from '../TooltipTrigger';
import Skeleton from '../Skeleton';
import theme from './PieChartButton.scss';

const MIN_SIZE = 20;
const MAX_SIZE = 50;
const MAX_PERCENT = 100;
const BASE_INNER_RADIUS = 6;
const BASE_OUTER_RADIUS = 9;
const BASE_PAD_ANGLE = 0.2;
const INNER_RADIUS_PER_PIXEL = 0.4;
const OUTER_RADIUS_PER_PIXEL = 0.45;
const PAD_ANGLE_PER_PIXEL = 0.0033;

// we need just one instance of this, it's just a generator
const arcGen = arc();

const displaySizes = {
	small: 20,
	medium: 35,
	large: 50,
};

/**
 * This function return the angle for a given percentage
 * @param {number} percentage the percentage to calculate the angle
 */
export function getAngle(percentage) {
	return percentage * 2 / 100 * Math.PI;
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
	if (allPercentages >= MAX_PERCENT - minimumPercentage) {
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
			className={classnames(theme['tc-pie-chart-color-alto'], 'tc-pie-chart-color-alto')}
			d={arcGenerated}
			transform={`translate(${size.svgSize / 2},${size.svgSize / 2})`}
		/>
	);
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
			className={classnames(
				theme[`tc-pie-chart-color-${value.color}`],
				`tc-pie-chart-color-${value.color}`,
			)}
			transform={`translate(${size.svgSize / 2},${size.svgSize / 2})`}
		/>
	);
}

/**
 * This function is just a sort
 * @param {object} a an element with a percentageShown to compare
 * @param {object} b an other element with a percentageShown to compare
 */
function sortElements(a, b) {
	if (a.percentageShown > b.percentageShown) {
		return -1;
	}
	if (a.percentageShown < b.percentageShown) {
		return 1;
	}
	return 0;
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
 * This function add an OverlayTrigger wrapping the button if defined
 * @param {Element} btn the current button
 * @param {string} overlayPlacement the overlay placement
 * @param {Element} overlayComponent the overlay component
 * @param {string} overlayId the id to be set for the overlay
 */
export function decorateWithOverlay(btn, overlayPlacement, overlayComponent, overlayId) {
	if (!overlayComponent) {
		return btn;
	}

	return (
		<span>
			<OverlayTrigger
				trigger="click"
				rootClose
				placement={overlayPlacement}
				overlay={<Popover id={overlayId}>{overlayComponent}</Popover>}
			>
				{btn}
			</OverlayTrigger>
		</span>
	);
}

/**
 * This function wrap the button with a TooltipTrigger
 * @param {Element} btn the button element ( may be wrapped by overlay trigger )
 * @param {boolean} tooltip tell if the tooltip has to be showed
 * @param {string} label the label to show on the tooltip
 * @param {string} tooltipPlacement the tooltip placement
 */
export function decorateWithTooltip(btn, tooltip, label, tooltipPlacement) {
	if (!tooltip || !label) {
		return btn;
	}
	return (
		<TooltipTrigger label={label} tooltipPlacement={tooltipPlacement}>
			{btn}
		</TooltipTrigger>
	);
}

/**
 * This function wrap the event when we don't have an overlay component
 * @param {function} mouseEvent the event to wrap ( mouseClick )
 * @param {Element} overlayComponent tell if there is an overlay component
 * @param {string} label the label of the component
 * @param {object} rest the rest of the props
 * @param {object} model the model of the component
 */
export function wrapMouseEvent(mouseEvent, overlayComponent, label, rest, model) {
	if (overlayComponent || !mouseEvent) {
		return null;
	}
	return event =>
		mouseEvent(event, {
			action: { label, ...rest },
			model,
		});
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

	const pixelNumber = currentSize - MIN_SIZE;
	return {
		svgSize: currentSize,
		innerRadius: parseInt(BASE_INNER_RADIUS + INNER_RADIUS_PER_PIXEL * pixelNumber, 10),
		outerRadius: parseInt(BASE_OUTER_RADIUS + OUTER_RADIUS_PER_PIXEL * pixelNumber, 10),
		padAngle: BASE_PAD_ANGLE - PAD_ANGLE_PER_PIXEL * pixelNumber,
	};
}

/**
 * This function check if the type is a number & check with min/max
 * @param {object} props list of component props
 * @param {string} propName current prop name
 * @param {string} componentName component name
 */
function propTypeCheckSize(props, propName, componentName) {
	if (props[propName] == null) {
		return null;
	}
	if (typeof props[propName] !== 'number') {
		return new Error(
			`Invalid type of ${propName} supplied to ${componentName} : ${typeof props[
				propName
			]}. Validation failed.`,
		);
	} else if (props[propName] < MIN_SIZE || props[propName] > MAX_SIZE) {
		return new Error(
			`Invalid prop ${propName} supplied to ${componentName} : ${
				props[propName]
			}. Validation failed.`,
		);
	}
	return null;
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

function PieChartButton({
	model,
	labelIndex,
	className,
	loading,
	minimumPercentage,
	display,
	label,
	overlayComponent,
	overlayPlacement,
	overlayId,
	onClick,
	onMouseDown,
	hideLabel,
	size,
	tooltip,
	tooltipPlacement,
	...rest
}) {
	const sizeObject = getDisplaySize(size, display);

	if (loading) {
		return (
			<Button
				className={classnames(theme['tc-pie-chart-loading'], 'tc-pie-chart-loading', {
					[theme['tc-pie-chart-loading-no-label']]: hideLabel,
					'tc-pie-chart-loading-no-label': hideLabel,
				})}
			>
				<Skeleton
					type={Skeleton.TYPES.circle}
					width={sizeObject.svgSize}
					height={sizeObject.svgSize}
					className={classnames(
						theme['tc-pie-chart-loading-circle'],
						'tc-pie-chart-loading-circle',
					)}
				/>
				{!hideLabel && <Skeleton type={Skeleton.TYPES.text} size={Skeleton.SIZES.small} />}
			</Button>
		);
	}

	const labelValue = getShowedValue(model, labelIndex);
	const preparedValues = setMinimumPercentage(model, minimumPercentage);
	const rClick = wrapMouseEvent(onClick, overlayComponent, label, rest, model);
	const rMouseDown = wrapMouseEvent(onMouseDown, overlayComponent, label, rest, model);

	let btn = (
		<Button
			className={classnames(theme['tc-pie-chart'], 'tc-pie-chart', className)}
			onMouseDown={rMouseDown}
			onClick={rClick}
			{...rest}
		>
			<svg
				width={sizeObject.svgSize}
				height={sizeObject.svgSize}
				className={classnames(theme['tc-pie-chart-graph'], 'tc-pie-chart-graph')}
			>
				{preparedValues.map((value, index) => getCircle(value, index, preparedValues, sizeObject))}
				{getEmptyPartCircle(preparedValues, sizeObject, minimumPercentage)}
			</svg>
			<div
				className={classnames(
					theme['tc-pie-chart-label'],
					'tc-pie-chart-label',
					theme[`tc-pie-chart-color-${labelValue.color}`],
					`tc-pie-chart-color-${labelValue.color}`,
				)}
			>
				{!hideLabel && labelValue.percentage && `${labelValue.percentage} %`}
			</div>
		</Button>
	);

	btn = decorateWithOverlay(btn, overlayPlacement, overlayComponent, overlayId);
	btn = decorateWithTooltip(btn, tooltip, label, tooltipPlacement);

	return btn;
}

PieChartButton.propTypes = {
	className: PropTypes.string,
	display: PropTypes.oneOf(['small', 'medium', 'large']),
	loading: PropTypes.bool,
	hideLabel: PropTypes.bool,
	label: PropTypes.string,
	labelIndex: PropTypes.number,
	getComponent: PropTypes.func,
	minimumPercentage: PropTypes.number.isRequired,
	model: PropTypes.arrayOf(
		PropTypes.shape({
			color: PropTypes.oneOf([
				'rio-grande',
				'chestnut-rose',
				'lightning-yellow',
				'slate-gray',
				'silver-chalice',
			]),
			percentage: PropTypes.number.isRequired,
		}).isRequired,
	),
	onClick: PropTypes.func,
	onMouseDown: PropTypes.func,
	overlayComponent: PropTypes.element,
	overlayId: PropTypes.string,
	overlayPlacement: OverlayTrigger.propTypes.placement,
	size: propTypeCheckSize,
	tooltip: PropTypes.bool,
	tooltipPlacement: OverlayTrigger.propTypes.placement,
};

PieChartButton.defaultProps = {
	labelIndex: 0,
	minimumPercentage: 5,
	display: 'small',
	tooltipPlacement: 'top',
	overlayPlacement: 'bottom',
	overlayId: 'pie-chart-popover',
};

PieChartButton.displayName = 'PieChartButton';

export default PieChartButton;
