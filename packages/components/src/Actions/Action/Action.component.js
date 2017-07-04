import React, { PropTypes } from 'react';
import classnames from 'classnames';
import {
	Button,
	OverlayTrigger,
} from 'react-bootstrap';

import TooltipTrigger from '../../TooltipTrigger';
import CircularProgress from '../../CircularProgress';
import Icon from '../../Icon';
import getPropsFrom from '../../utils/getPropsFrom';

const LEFT = 'left';
const RIGHT = 'right';

function getIcon({ icon, iconTransform, inProgress }) {
	if (inProgress) {
		return (<CircularProgress size="small" key="icon" />);
	}

	if (icon) {
		return (<Icon name={icon} transform={iconTransform} key="icon" />);
	}

	return null;
}
getIcon.propTypes = {
	icon: PropTypes.string,
	iconTransform: PropTypes.string,
	inProgress: PropTypes.bool,
};

function getLabel({ hideLabel, label }) {
	if (hideLabel) {
		return null;
	}
	return (<span key="label">{label}</span>);
}

getLabel.propTypes = {
	label: PropTypes.string,
	hideLabel: PropTypes.bool,
};

function adjustContentPlacement(icon, label, iconPosition) {
	if (iconPosition === RIGHT) {
		return [label, icon];
	}
	return [icon, label];
}

function getContent(props) {
	return adjustContentPlacement(
		getIcon(props),
		getLabel(props),
		props.iconPosition,
	);
}

function noOp() {}

/**
 * @param {object} props react props
 * @example
 const props = {
	label: 'edit',
	icon: 'fa fa-edit',
	onClick: action('onEdit'),
	tooltipPlacement: 'right',
	hideLabel: true,
	link: true,
};
 <Action {...props} />
 */
function Action(props) {
	const {
		bsStyle,
		inProgress,
		disabled,
		hideLabel,
		label,
		link,
		model,
		onMouseDown = noOp,
		onClick = noOp,
		tooltipPlacement,
		tooltip,
		tooltipLabel,
		available,
		...rest
	} = props;

	if (!available) {
		return null;
	}

	const buttonProps = getPropsFrom(Button, rest);
	const style = link ? 'link' : bsStyle;
	const rClick = onClick && (event => onClick(event, {
		action: { label, ...rest },
		model,
	}));

	const rMouseDown = event => onMouseDown(event, {
		action: { label, ...rest },
		model,
	});

	const buttonContent = getContent(props);

	const btn = (
		<Button
			onMouseDown={rMouseDown}
			onClick={rClick}
			bsStyle={style}
			disabled={inProgress || disabled}
			role={link ? 'link' : null}
			{...buttonProps}
		>
			{buttonContent}
		</Button>
	);
	if (hideLabel || tooltip || tooltipLabel) {
		return (
			<TooltipTrigger label={tooltipLabel || label} tooltipPlacement={tooltipPlacement}>
				{btn}
			</TooltipTrigger>
		);
	}
	return btn;
}

Action.propTypes = {
	...getIcon.propTypes,
	id: PropTypes.string,
	bsStyle: PropTypes.string,
	disabled: PropTypes.bool,
	hideLabel: PropTypes.bool,
	iconPosition: PropTypes.oneOf([LEFT, RIGHT]),
	label: PropTypes.string.isRequired,
	link: PropTypes.bool,
	model: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	name: PropTypes.string,
	onClick: PropTypes.func,
	tooltipPlacement: OverlayTrigger.propTypes.placement,
	tooltip: PropTypes.bool,
	tooltipLabel: PropTypes.string,
};

Action.defaultProps = {
	available: true,
	bsStyle: 'default',
	tooltipPlacement: 'top',
	inProgress: false,
	disabled: false,
};

export default Action;
