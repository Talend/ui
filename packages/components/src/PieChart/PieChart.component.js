import PropTypes from 'prop-types';
import PieChartIcon from './PieChartIcon.component';
import PieChartButton from './PieChartButton.component';
import { Tooltip } from '@talend/design-system';

/**
 * This function wrap the button with a TooltipTrigger
 * @param {Element} btn the button element ( may be wrapped by overlay trigger )
 * @param {boolean} tooltip tell if the tooltip has to be showed
 * @param {string} label the label to show on the tooltip
 * @param {string} tooltipPlacement the tooltip placement
 */
function decorateWithTooltip(tooltip, label, Component, props) {
	if (!tooltip || !label) {
		return <Component {...props} />;
	}

	return (
		<Tooltip title={label}>
			<span>
				<Component {...props} />
			</span>
		</Tooltip>
	);
}

function getPieChartComponent(onClick) {
	return onClick ? PieChartButton : PieChartIcon;
}

export default function PieChart({ tooltip, tooltipPlacement, ...props }) {
	return decorateWithTooltip(tooltip, props.label, getPieChartComponent(props.onClick), props);
}

PieChart.propTypes = {
	label: PropTypes.string,
	onClick: PropTypes.func,
	tooltip: PropTypes.bool,
};

PieChart.displayName = 'PieChart';
