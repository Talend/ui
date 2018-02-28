import React from 'react';
import PropTypes from 'prop-types';
import { arc } from 'd3-shape';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import classnames from 'classnames';
import TooltipTrigger from '../TooltipTrigger';
import theme from './PieChartButton.scss';

const SCOOTER = '#66BDFF';
const MIN_SIZE = 20;
const MAX_SIZE = 50;
const BASE_INNER_RADIUS = 6;
const BASE_OUTER_RADIUS = 9;
const BASE_PAD_ANGLE = 0.2;
const INNER_RADIUS_PER_PIXEL = 0.4;
const OUTER_RADIUS_PER_PIXEL = 0.45;
const PAD_ANGLE_PER_PIXEL = 0.0033;

const displaySizes = {
	small: 20,
	medium: 35,
	large: 50,
};

/**
 * this function generate the empty part of the chart
 * @param {array} values the values shown in the graph
 * @param {object} size the current size
 * @param {function} arcGen the arc generator
 * @param {boolean} hover known if the component is hovered
 * @param {number} minimumPercentage the minimum percentage to be shown
 */
export function getEmptyPartCircle(values, size, arcGen, hover, minimumPercentage) {
	const allPercentages = values ? values.reduce((acc, value) => acc + value.percentageShown, 0) : 0;
	if (allPercentages >= 100 - minimumPercentage) {
		return null;
	}

	const arcGenerated = arcGen({
		innerRadius: size.innerRadius,
		outerRadius: size.outerRadius,
		padAngle: size.padAngle,
		startAngle: allPercentages * 2 / 100 * Math.PI,
		endAngle: Math.PI * 2,
	});
	return (
		<path
			className={classnames(
				theme['tc-pie-chart-empty-part-circle'],
				'tc-pie-chart-empty-part-circle',
			)}
			d={arcGenerated}
			transform={`translate(${size.svgSize / 2},${size.svgSize / 2})`}
		/>
	);
}

/**
 * This function generate a part of circle for a value
 * @param {object} value the value to generate
 * @param {number} index the current index
 * @param {array} values the values to get when we have to start
 * @param {object} size the current graph size
 * @param {function} arcGen the arc generator
 * @param {boolean} hover known if the component is hovered
 */
export function getCircle(value, index, values, size, arcGen, hover) {
	let percentagesDone = 0;
	for (let i = 0; i < index; i += 1) {
		percentagesDone += values[i].percentageShown;
	}

	const arcGenerated = arcGen({
		innerRadius: size.innerRadius,
		outerRadius: size.outerRadius,
		padAngle: size.padAngle,
		startAngle: percentagesDone * 2 / 100 * Math.PI,
		endAngle: (percentagesDone + value.percentageShown) * 2 / 100 * Math.PI,
	});

	return (
		<path
			key={index}
			d={arcGenerated}
			transform={`translate(${size.svgSize / 2},${size.svgSize / 2})`}
			stroke={hover ? SCOOTER : value.color}
			fill={hover ? SCOOTER : value.color}
		/>
	);
}

/**
 * This function is just a sort
 * @param {object} a an element with a percentageShown to compare
 * @param {object} b an other element with a percentageShown to compare
 */
function sortElements(a, b) {
	if (a.percentageShown > b.percentageShown) return -1;
	if (a.percentageShown < b.percentageShown) return 1;
	return 0;
}

/**
 * This function set percentage show with the minimum percentage shown
 * @param {array} values the set of values
 * @param {number} minimumPercentage the minimum value we have to show
 */
export function setMinimum(model, minimumPercentage) {
	let amountToSubtract = 0;

	const valuesMins = model.map(value => {
		if (value.percentage < minimumPercentage && value.percentage > 0) {
			amountToSubtract += minimumPercentage - value.percentage;
			return { ...value, percentageShown: minimumPercentage };
		}
		return { ...value, percentageShown: value.percentage };
	});

	/**
	 * This function decrease the percentage shown & the amount to subtract by 1
	 * @param {object} element the current element
	 */
	function decreaseElement(element) {
		if (amountToSubtract > 0) {
			// eslint-disable-next-line no-param-reassign
			element.percentageShown -= 1;
			amountToSubtract -= 1;
		}
	}

	while (amountToSubtract > 0) {
		const elementsToDecrease = valuesMins
			.filter(value => value.percentageShown > minimumPercentage)
			.sort(sortElements);
		if (elementsToDecrease.length > 0) {
			elementsToDecrease.forEach(decreaseElement);
		} else {
			amountToSubtract = 0;
		}
	}

	return valuesMins;
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
		// this span is here to allow the tooltip trigger to work
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
 */
export function getDisplaySize(size) {
	const pixelNumber = size - MIN_SIZE;
	return {
		svgSize: size,
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
	if (typeof props[propName] !== 'number') {
		return new Error(
			`Invalid type of ${propName} supplied to ${componentName}. Validation failed.`,
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

class PieChartButton extends React.Component {
	static displayName = 'PieChartButton';

	static propTypes = {
		className: PropTypes.string,
		display: PropTypes.oneOf(['small', 'medium', 'large']),
		inProgress: PropTypes.bool,
		hideLabel: PropTypes.bool,
		label: PropTypes.string,
		labelIndex: PropTypes.number,
		getComponent: PropTypes.func,
		minimumPercentage: PropTypes.number.isRequired,
		model: PropTypes.arrayOf(
			PropTypes.shape({
				color: PropTypes.string.isRequired,
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

	static defaultProps = {
		labelIndex: 0,
		minimumPercentage: 5,
		display: 'small',
		tooltipPlacement: 'top',
		overlayPlacement: 'bottom',
		overlayId: 'pie-chart-popover',
	};

	constructor(props) {
		super(props);
		// we need to access the component state
		this.onMouseEnter = this.onMouseEnter.bind(this);
		this.onMouseLeave = this.onMouseLeave.bind(this);
		this.state = {
			hover: false,
			arcGen: arc(),
		};
	}

	onMouseEnter() {
		this.setState({ hover: true });
	}

	onMouseLeave() {
		this.setState({ hover: false });
	}

	render() {
		const {
			model,
			labelIndex,
			className,
			inProgress,
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
		} = this.props;

		let currentSize = size;
		if (!size && display) {
			currentSize = displaySizes[display];
		}
		const sizeObject = getDisplaySize(currentSize);

		if (inProgress) {
			const loadingCircleStyle = {
				width: `${sizeObject.svgSize}px`,
				height: `${sizeObject.svgSize}px`,
				borderRadius: `${sizeObject.svgSize / 2}px`,
			};
			return (
				<Button
					className={classnames(theme['tc-pie-chart-loading'], 'tc-pie-chart-loading', {
						[theme['tc-pie-chart-loading-no-label']]: hideLabel,
						'tc-pie-chart-loading-no-label': hideLabel,
					})}
				>
					<div style={loadingCircleStyle} />
					{!hideLabel && (
						<div
							className={classnames(
								theme['tc-pie-chart-loading-skeleton-label'],
								'tc-pie-chart-loading-skeleton-label',
							)}
						/>
					)}
				</Button>
			);
		}

		let labelValue = null;
		let labelStyle = null;
		let preparedValues = null;
		if (model) {
			labelValue = model[labelIndex];
			labelStyle = { color: this.state.hover ? SCOOTER : labelValue.color };
			preparedValues = setMinimum(model, minimumPercentage);
		}

		const rClick = wrapMouseEvent(onClick, overlayComponent, label, rest, model);
		const rMouseDown = wrapMouseEvent(onMouseDown, overlayComponent, label, rest, model);

		let btn = (
			<Button
				className={classnames(theme['tc-pie-chart'], 'tc-pie-chart', className)}
				onMouseEnter={this.onMouseEnter}
				onMouseLeave={this.onMouseLeave}
				onMouseDown={rMouseDown}
				onClick={rClick}
				{...rest}
			>
				<svg width={sizeObject.svgSize} height={sizeObject.svgSize}>
					{preparedValues &&
						preparedValues.map((value, index) =>
							getCircle(
								value,
								index,
								preparedValues,
								sizeObject,
								this.state.arcGen,
								this.state.hover,
							),
						)}
					{getEmptyPartCircle(
						preparedValues,
						sizeObject,
						this.state.arcGen,
						this.state.hover,
						minimumPercentage,
					)}
				</svg>
				<div
					className={classnames(theme['tc-pie-chart-label'], 'tc-pie-chart-label')}
					style={labelStyle}
				>
					{!hideLabel && labelValue && `${labelValue.percentage} %`}
				</div>
			</Button>
		);

		btn = decorateWithOverlay(btn, overlayPlacement, overlayComponent, overlayId);
		btn = decorateWithTooltip(btn, tooltip, label, tooltipPlacement);

		return btn;
	}
}

export default PieChartButton;
