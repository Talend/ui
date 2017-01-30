import React, { PropTypes } from 'react';
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
		return (<CircularProgress size="small" />);
	}

	if (icon) {
		return (<Icon name={icon} transform={iconTransform} />);
	}

	return null;
}
getIcon.propTypes = {
	icon: PropTypes.string,
	iconTransform: PropTypes.string,
	inProgress: PropTypes.bool,
};

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
		hideLabel,
		label,
		link,
		model,
		iconPosition,
		onClick,
		tooltipPlacement,
		...rest
	} = props;

	const buttonProps = getPropsFrom(Button, rest);
	const style = link ? 'link' : bsStyle;
	const rClick = event => onClick(event, {
		action: { label, ...rest },
		model,
	});

	const btnIcon = getIcon(props);
	const btnLabel = hideLabel ? null : <span>{label}</span>;
	const buttonContent = iconPosition === RIGHT ?
			[btnLabel, btnIcon] :
			[btnIcon, btnLabel];

	const btn = (
		<Button
			onClick={rClick}
			bsStyle={style}
			disabled={inProgress}
			role={link ? 'link' : null}
			{...buttonProps}
		>
			{buttonContent.map(content => content)}
		</Button>
	);

	return hideLabel ?
		(<TooltipTrigger label={label} tooltipPlacement={tooltipPlacement}>{btn}</TooltipTrigger>) :
		btn;
}

Action.propTypes = {
	...getIcon.propTypes,
	id: PropTypes.string,
	bsStyle: PropTypes.string,
	hideLabel: PropTypes.bool,
	iconPosition: PropTypes.oneOf([LEFT, RIGHT]),
	label: PropTypes.string.isRequired,
	link: PropTypes.bool,
	model: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	onClick: PropTypes.func.isRequired,
	tooltipPlacement: OverlayTrigger.propTypes.placement,
};

Action.defaultProps = {
	bsStyle: 'default',
	tooltipPlacement: 'top',
	inProgress: false,
};

export default Action;
