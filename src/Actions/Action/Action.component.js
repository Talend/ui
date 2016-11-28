import React, { PropTypes } from 'react';
import {
	Button,
	OverlayTrigger,
} from 'react-bootstrap';
import TooltipTrigger from '../../TooltipTrigger';
import CircularProgress from '../../CircularProgress';
import Icon from '../../Icon';
import getPropsFrom from '../../utils/getPropsFrom';

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
		icon,
		inProgress,
		hideLabel,
		label,
		link,
		model,
		onClick,
		tooltipPlacement,
		...rest,
		} = props;

	const buttonProps = getPropsFrom(Button, rest);
	const style = link ? 'link' : bsStyle;
	const rClick = event => onClick(event, {
		action: { label, ...rest },
		model,
	});
	const btn = (
		<Button
			onClick={rClick}
			bsStyle={style}
			disabled={inProgress}
			role={link ? 'link' : null}
			{...buttonProps}
		>
			{icon && !inProgress ? <Icon name={icon} /> : null}
			{inProgress ? <CircularProgress size="small" /> : null}
			{hideLabel ? null : <span>{label}</span>}
		</Button>
	);

	return hideLabel ?
		(<TooltipTrigger label={label} tooltipPlacement={tooltipPlacement}>{btn}</TooltipTrigger>) :
		btn;
}

Action.propTypes = {
	bsStyle: PropTypes.string,
	hideLabel: PropTypes.bool,
	icon: PropTypes.string,
	label: PropTypes.string.isRequired,
	link: PropTypes.bool,
	model: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	onClick: PropTypes.func.isRequired,
	tooltipPlacement: OverlayTrigger.propTypes.placement,
	inProgress: PropTypes.bool,
	id: PropTypes.string,
};

Action.defaultProps = {
	bsStyle: 'default',
	tooltipPlacement: 'top',
	inProgress: false,
};

export default Action;
