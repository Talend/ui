import React, { PropTypes } from 'react';
import {
	OverlayTrigger,
	Tooltip,
} from 'react-bootstrap';
import uuid from 'uuid';
import classNames from 'classnames';
import theme from './TooltipTrigger.scss';

function getTooltipClass() {
	return classNames({ [theme['tooltip-container']]: true, 'tooltip-container': true });
}

/**
 * @param {object} props react props
 * @example
const props = {
	label: 'Help content here',
	tooltipPlacement: 'top',
};
<TooltipTrigger {...props} >
	<Icon name="my-icon" />
</TooltipTrigger>
 */
function TooltipTrigger(props) {
	const tooltip = (<Tooltip className={getTooltipClass()} id={uuid.v4()}>{props.label}</Tooltip>);
	return (
		<OverlayTrigger
			placement={props.tooltipPlacement}
			overlay={tooltip}
			delayShow={400}
		>
			{props.children}
		</OverlayTrigger>
	);
}

TooltipTrigger.propTypes = {
	children: PropTypes.element,
	label: PropTypes.string,
	tooltipPlacement: OverlayTrigger.propTypes.placement,
};

export default TooltipTrigger;
