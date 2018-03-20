import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';

import TooltipTrigger from '../../TooltipTrigger';
import CircularProgress from '../../CircularProgress';
import Skeleton from '../../Skeleton';
import Icon from '../../Icon';
import getPropsFrom from '../../utils/getPropsFrom';
import theme from './ActionButton.scss';

const LEFT = 'left';
const RIGHT = 'right';

function getIcon({ icon, iconTransform, inProgress, loading }) {
	if (inProgress) {
		return <CircularProgress size="small" key="icon" />;
	}

	if (loading) {
		return (
			<Skeleton
				size="small"
				type="circle"
				className={classNames(
					theme['tc-action-button-skeleton-circle'],
					'tc-action-button-skeleton-circle',
				)}
			/>
		);
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

function getLabel({ hideLabel, label, loading }) {
	if (hideLabel) {
		return null;
	}
	if (loading) {
		return <Skeleton type="text" size="medium" />;
	}
	return <span key="label">{label}</span>;
}

getLabel.propTypes = {
	label: PropTypes.string,
	loading: PropTypes.bool,
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
		feature,
		hideLabel,
		label,
		loading,
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

	if (loading && !link) {
		return <Skeleton type="button" />;
	}

	const buttonProps = getPropsFrom(Button, rest);
	const buttonContent = getContent(props);
	const btnIsDisabled = inProgress || disabled;
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

	if (btnIsDisabled) {
		buttonProps.className = classNames(buttonProps.className, theme['btn-disabled']);
	}

	let btn = (
		<Button
			onMouseDown={rMouseDown}
			onClick={rClick}
			bsStyle={style}
			disabled={btnIsDisabled}
			data-feature={feature}
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
				{btnIsDisabled ? <span>{btn}</span> : btn}
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
	feature: PropTypes.string,
	hideLabel: PropTypes.bool,
	iconPosition: PropTypes.oneOf([LEFT, RIGHT]),
	label: PropTypes.string.isRequired,
	loading: PropTypes.bool,
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
	loading: false,
	disabled: false,
};

ActionButton.displayName = 'ActionButton';
export default ActionButton;
