import React from 'react';
import PropTypes from 'prop-types';
import { arc } from 'd3-shape';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import classnames from 'classnames';
import TooltipTrigger from '../TooltipTrigger';
import theme from './PieChartButton.scss';

const SCOOTER = '#66BDFF';
const displaySizes = {
	small: {
		svgSize: 20,
		innerRadius: 6,
		outerRadius: 9,
		padAngle: 0.2,
	},
	medium: {
		svgSize: 35,
		innerRadius: 11,
		outerRadius: 15,
		padAngle: 0.15,
	},
	large: {
		padAngle: 0.1,
		svgSize: 50,
		innerRadius: 17,
		outerRadius: 22,
	},
};

/**
 * this function generate the empty part of the chart
 * @param {array} values the values shown in the graph
 * @param {object} size the current size
 * @param {function} arcGen the arc generator
 * @param {string} emptyColor the empty color to complete the graph
 */
function getEmptyPartCircle(values, size, arcGen, emptyColor, hover) {
	const allPercentages = values.reduce((acc, value) => acc + value.percentageShown, 0);
	if (allPercentages >= 98) {
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
			d={arcGenerated}
			transform={`translate(${size.svgSize / 2},${size.svgSize / 2})`}
			stroke={hover ? SCOOTER : emptyColor}
			fill={hover ? SCOOTER : emptyColor}
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
 */
function getCircle(value, index, values, size, arcGen, hover) {
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
function setMinimum(model, minimumPercentage) {
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

function decorateWithOverlay(btn, overlayPlacement, overlayComponent, overlayId) {
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

function decorateWithTooltip(btn, tooltip, label, tooltipPlacement) {
	if (!tooltip || !label) {
		return btn;
	}
	return (
		<TooltipTrigger label={label} tooltipPlacement={tooltipPlacement}>
			{btn}
		</TooltipTrigger>
	);
}

function wrapMouseEvent(mouseEvent, overlayComponent, label, rest, model) {
	if (overlayComponent || !mouseEvent) {
		return null;
	}
	return event =>
		mouseEvent(event, {
			action: { label, ...rest },
			model,
		});
}

class PieChartButton extends React.Component {
	static displayName = 'PieChartButton';

	static propTypes = {
		className: PropTypes.string,
		display: PropTypes.oneOf(['small', 'medium', 'large']),
		labelIndex: PropTypes.number,
		inProgress: PropTypes.bool,
		minimumPercentage: PropTypes.number.isRequired,
		hideLabel: PropTypes.bool,
		label: PropTypes.string,
		overlayComponent: PropTypes.element,
		overlayPlacement: OverlayTrigger.propTypes.placement,
		tooltipPlacement: OverlayTrigger.propTypes.placement,
		onMouseDown: PropTypes.func,
		onClick: PropTypes.func,
		emptyColor: PropTypes.string,
		tooltip: PropTypes.bool,
		overlayId: PropTypes.string,
		model: PropTypes.arrayOf(
			PropTypes.shape({
				color: PropTypes.string.isRequired,
				percentage: PropTypes.number.isRequired,
			}).isRequired,
		),
	};

	static defaultProps = {
		labelIndex: 0,
		minimumPercentage: 5,
		display: 'small',
		emptyColor: '#ABABAB',
		tooltipPlacement: 'top',
		overlayPlacement: 'bottom',
		overlayId: 'pie-chart-popover',
	};

	/**
	 * This is the PieChart component
	 * @param {object} props the props of the object
	 * @param {array} props.values the values to build the graph
	 * @param {number} props.labelIndex the index to get the label
	 * @param {string} props.className some classes to pass to component
	 * @param {boolean} props.inProgress show loader
	 * @param {number} props.minimumPercentage minimum percentage to show in the graph
	 * @param {string} props.display choose the size of the chart
	 * @param {string} props.emptyColor the color for the empty segment
	 */
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
			emptyColor,
			overlayComponent,
			overlayPlacement,
			overlayId,
			onClick,
			onMouseDown,
			hideLabel,
			tooltip,
			tooltipPlacement,
			...rest
		} = this.props;

		if (inProgress) {
			return (
				<Button className={classnames(theme['tc-pie-chart-loading'], 'tc-pie-chart-loading')}>
					<div
						className={classnames(
							theme[`tc-pie-chart-loading-${display}-circle`],
							`tc-pie-chart-loading-${display}-circle`,
						)}
					/>
					<div
						className={classnames(
							theme['tc-pie-chart-loading-skeleton-label'],
							'tc-pie-chart-loading-skeleton-label',
						)}
					/>
				</Button>
			);
		}

		const labelValue = model[labelIndex];
		const labelStyle = { color: this.state.hover ? SCOOTER : labelValue.color };
		const preparedValues = setMinimum(model, minimumPercentage);
		const size = displaySizes[display];
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
				<svg width={size.svgSize} height={size.svgSize}>
					{preparedValues.map((value, index) =>
						getCircle(value, index, preparedValues, size, this.state.arcGen, this.state.hover),
					)}
					{getEmptyPartCircle(
						preparedValues,
						size,
						this.state.arcGen,
						emptyColor,
						this.state.hover,
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
