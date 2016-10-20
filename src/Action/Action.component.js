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
	const restBtn = {};
	Object.keys(Button.propTypes).forEach((key) => {
		if (
			key === 'bsStyle' ||
			key === 'onClick' ||
			key === 'role' ||
			rest[key] !== undefined
		) {
			return;
		}
		restBtn[key] = rest[key];
	});
	let btn = (
		<Button
			onClick={rClick}
			bsStyle={bsStyle}
			role={link ? 'link' : null}
			{...restBtn}
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
	label: PropTypes.string.isRequired,
	link: PropTypes.bool,
	icon: PropTypes.string,
	onClick: PropTypes.func.isRequired,
	model: PropTypes.object,
	tooltipPlacement: OverlayTrigger.propTypes.placement,
	hideLabel: PropTypes.bool,
};

export default Action;
