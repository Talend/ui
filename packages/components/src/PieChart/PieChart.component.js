import React from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger } from '@talend/react-bootstrap';
import PieChartIcon from './PieChartIcon.component';
import PieChartButton from './PieChartButton.component';
import TooltipTrigger from '../TooltipTrigger';

/**
 * This function wrap the button with a TooltipTrigger
 * @param {Element} btn the button element ( may be wrapped by overlay trigger )
 * @param {boolean} tooltip tell if the tooltip has to be showed
 * @param {string} label the label to show on the tooltip
 * @param {string} tooltipPlacement the tooltip placement
 */
function decorateWithTooltip(tooltip, label, tooltipPlacement, Component, props) {
	if (!tooltip || !label) {
		return <Component {...props} />;
	}
	return (
		<TooltipTrigger label={label} tooltipPlacement={tooltipPlacement}>
			<span>
				<Component {...props} />
			</span>
		</TooltipTrigger>
	);
}

function getPieChartComponent(onClick) {
	return onClick ? PieChartButton : PieChartIcon;
}

export default function PieChart({ tooltip, tooltipPlacement, ...props }) {
	return decorateWithTooltip(
		tooltip,
		props.label,
		tooltipPlacement,
		getPieChartComponent(props.onClick),
		props,
	);
}

PieChart.propTypes = {
	label: PropTypes.string,
	onClick: PropTypes.func,
	tooltip: PropTypes.bool,
	tooltipPlacement: OverlayTrigger.propTypes.placement,
};

PieChart.defaultProps = {
	tooltipPlacement: 'top',
};

PieChart.displayName = 'PieChart';
