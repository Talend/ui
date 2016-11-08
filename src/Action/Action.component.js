import React, { PropTypes } from 'react';
import {
	Button,
	OverlayTrigger,
	Tooltip,
} from 'react-bootstrap';
import uuid from 'uuid';
import CircularProgress from '../CircularProgress';
import Icon from '../Icon';

function Action(props) {
	const {
		label,
		icon,
		inProgress,
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
			disabled={inProgress}
			role={link ? 'link' : null}
			{...rest}
		>
			{icon && !inProgress ? <Icon name={icon} /> : null}
			{inProgress ? <CircularProgress size="small" /> : null}
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
	inProgress: PropTypes.bool,
};

Action.defaultProps = {
	inProgress: false,
};

export default Action;
