import React, { PropTypes } from 'react';
import {
	Button,
	OverlayTrigger,
	Tooltip,
} from 'react-bootstrap';
import uuid from 'uuid';

function Action(props) {
	const {
		label,
		icon,
		onClick,
		model,
		hideLabel,
		tooltipPlacement,
		link,
		...rest,
	} = props;

	function rClick(event) {
		return onClick(
			event,
			{
				action: {
					label,
					...rest,
				},
				model,
			}
		);
	}

	let bsStyle = props.bsStyle;
	if (!bsStyle) {
		if (link) {
			bsStyle = 'link';
		} else {
			bsStyle = 'default';
		}
	}
	let btn = (
		<Button
			onClick={rClick}
			bsStyle={bsStyle}
			role={link ? 'link' : null}
			{...rest}
		>
			{icon ? <i className={icon} /> : null}
			{hideLabel ? null : <span>{label}</span>}
		</Button>
	);
	if (hideLabel) {
		const tooltip = (<Tooltip id={uuid.v4()}>{label}</Tooltip>);
		btn = (
			<OverlayTrigger placement={tooltipPlacement || 'top'} overlay={tooltip}>
				{btn}
			</OverlayTrigger>
		);
	}
	return btn;
}

Action.propTypes = {
	icon: PropTypes.string,
	label: PropTypes.string.isRequired,
	link: PropTypes.bool,
	onClick: PropTypes.func.isRequired,
	model: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	tooltipPlacement: OverlayTrigger.propTypes.placement,
	hideLabel: PropTypes.bool,
};

export default Action;
