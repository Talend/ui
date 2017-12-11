import PropTypes from 'prop-types';
import React from 'react';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';

import TooltipTrigger from '../../TooltipTrigger';
import CircularProgress from '../../CircularProgress';
import Icon from '../../Icon';
import getPropsFrom from '../../utils/getPropsFrom';

const LEFT = 'left';
const RIGHT = 'right';

function getIcon({ icon, iconTransform, inProgress }) {
	if (inProgress) {
		return <CircularProgress size="small" key="icon" />;
	}

	if (icon) {
		return <Icon name={icon} transform={iconTransform} key="icon" />;
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
	return <span key="label">{label}</span>;
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
	return adjustContentPlacement(getIcon(props), getLabel(props), props.iconPosition);
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
function ActionButton(props) {
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
		overlayComponent,
		overlayPlacement,
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
	let rClick = null;
	let rMouseDown = null;

	if (!overlayComponent) {
		rClick =
			onClick &&
			(event =>
				onClick(event, {
					action: { label, ...rest },
					model,
				}));
		rMouseDown = event =>
			onMouseDown(event, {
				action: { label, ...rest },
				model,
			});
	}

	const buttonContent = getContent(props);

	let btn = (
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
	if (!inProgress && overlayComponent) {
		btn = (
			// this span is here to allow the tooltip trigger to work
			<span>
				<OverlayTrigger
					trigger="click"
					rootClose
					placement={overlayPlacement}
					overlay={<Popover>{overlayComponent}</Popover>}
				>
					{btn}
				</OverlayTrigger>
			</span>
		);
	}
	if (hideLabel || tooltip || tooltipLabel) {
		btn = (
			<TooltipTrigger label={tooltipLabel || label} tooltipPlacement={tooltipPlacement}>
				{btn}
			</TooltipTrigger>
		);
	}

	return btn;
}

ActionButton.propTypes = {
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
	overlayComponent: PropTypes.element,
	overlayPlacement: OverlayTrigger.propTypes.placement,
	tooltipPlacement: OverlayTrigger.propTypes.placement,
	tooltip: PropTypes.bool,
	tooltipLabel: PropTypes.string,
};

ActionButton.defaultProps = {
	available: true,
	bsStyle: 'default',
	tooltipPlacement: 'top',
	inProgress: false,
	disabled: false,
};

ActionButton.displayName = 'ActionButton';
export default ActionButton;
