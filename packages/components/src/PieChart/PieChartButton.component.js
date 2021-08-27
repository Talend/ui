import React from 'react';
import PropTypes from 'prop-types';
import { Button, OverlayTrigger, Popover } from '@talend/react-bootstrap';
import PieChartIcon, { pieChartIconPropTypes } from './PieChartIcon.component';
import pieChartCssModule from './PieChart.scss';
import { getTheme } from '../theme';

const theme = getTheme(pieChartCssModule);

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
	...rest
}) {
	if (!available) {
		return null;
	}
	const rClick = wrapMouseEvent(onClick, overlayComponent, label, rest, model);
	const rMouseDown = wrapMouseEvent(onMouseDown, overlayComponent, label, rest, model);
	const btn = (
		<Button
			className={theme('tc-pie-chart-button', className)}
			onMouseDown={rMouseDown}
			onClick={rClick}
			ref={buttonRef}
			bsStyle="link"
			role="button"
			{...rest}
		>
			<PieChartIcon
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
	return decorateWithOverlay(btn, overlayPlacement, overlayComponent, overlayId, overlayRef);
}

PieChartButtonComponent.propTypes = {
	...pieChartIconPropTypes,
	available: PropTypes.bool,
	buttonRef: PropTypes.func,
	className: PropTypes.string,
	getComponent: PropTypes.func,
	label: PropTypes.string,
	onClick: PropTypes.func,
	onMouseDown: PropTypes.func,
	overlayComponent: PropTypes.element,
	overlayId: PropTypes.string,
	overlayPlacement: OverlayTrigger.propTypes.placement,
	overlayRef: PropTypes.func,
};

PieChartButtonComponent.defaultProps = {
	available: true,
	overlayId: 'pie-chart-popover',
	overlayPlacement: 'bottom',
};

PieChartButtonComponent.displayName = 'PieChartButton';
