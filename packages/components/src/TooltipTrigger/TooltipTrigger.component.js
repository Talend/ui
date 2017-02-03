import React, { PropTypes } from 'react';
import {
	OverlayTrigger,
	Tooltip,
} from 'react-bootstrap';
import uuid from 'uuid';

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
	const tooltip = (<Tooltip id={uuid.v4()}>{props.label}</Tooltip>);
	return (
		<OverlayTrigger placement={props.tooltipPlacement} overlay={tooltip}>
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
