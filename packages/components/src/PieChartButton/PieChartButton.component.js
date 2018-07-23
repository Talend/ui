import React from 'react';
import PropTypes from 'prop-types';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import classnames from 'classnames';
import getDefaultT from '../translate';
import TooltipTrigger from '../TooltipTrigger';
import theme from './PieChartButton.scss';
import PieChart from './PieChart.component';

const MIN_SIZE = 20;
const MAX_SIZE = 50;

/**
 * This function add an OverlayTrigger wrapping the button if defined
 * @param {Element} btn the current button
 * @param {string} overlayPlacement the overlay placement
 * @param {Element} overlayComponent the overlay component
 * @param {string} overlayId the id to be set for the overlay
 * @param {callback} overlayRef the callback to be set for the overlay to bind ref
 */
export function decorateWithOverlay(
	btn,
	overlayPlacement,
	overlayComponent,
	overlayId,
	overlayRef,
) {
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
				ref={overlayRef}
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

export default function PieChartButtonComponent({
	available,
	buttonRef,
	className,
	display,
	hideLabel,
	label,
	labelIndex,
	loading,
	minimumPercentage,
	model,
	onClick,
	onMouseDown,
	overlayComponent,
	overlayId,
	overlayPlacement,
	overlayRef,
	size,
	tooltip,
	tooltipPlacement,
	...rest
}) {
	if (!available) {
		return null;
	}
	const rClick = wrapMouseEvent(onClick, overlayComponent, label, rest, model);
	const rMouseDown = wrapMouseEvent(onMouseDown, overlayComponent, label, rest, model);
	let btn = (
		<Button
			className={classnames(theme['tc-pie-chart-button'], 'tc-pie-chart-button', className)}
			onMouseDown={rMouseDown}
			onClick={rClick}
			ref={buttonRef}
			bsStyle="link"
			role="button"
			{...rest}
		>
			<PieChart
				display={display}
				hideLabel={hideLabel}
				labelIndex={labelIndex}
				loading={loading}
				minimumPercentage={minimumPercentage}
				model={model}
				size={size}
			/>
		</Button>
	);

	btn = decorateWithOverlay(btn, overlayPlacement, overlayComponent, overlayId, overlayRef);
	btn = decorateWithTooltip(btn, tooltip, label, tooltipPlacement);

	return btn;
}

PieChartButtonComponent.propTypes = {
	available: PropTypes.bool,
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
	buttonRef: PropTypes.func,
	overlayRef: PropTypes.func,
};

PieChartButtonComponent.defaultProps = {
	available: true,
	labelIndex: 0,
	minimumPercentage: 5,
	display: 'small',
	tooltipPlacement: 'top',
	overlayPlacement: 'bottom',
	overlayId: 'pie-chart-popover',
	t: getDefaultT(),
};

PieChartButtonComponent.displayName = 'PieChartButton';

