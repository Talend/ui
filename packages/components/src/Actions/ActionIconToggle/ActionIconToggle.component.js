import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { Button, OverlayTrigger } from 'react-bootstrap';

import Icon from '../../Icon';
import TooltipTrigger from '../../TooltipTrigger';
import getPropsFrom from '../../utils/getPropsFrom';

import theme from './ActionIconToggle.scss';

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
 <ActionIconToggle {...props} />
 */
function ActionIconToggle(props) {
	const { active, className, icon, id, label, tooltipPlacement, ...rest } = props;

	const cn = classNames(className, 'tc-icon-toggle', theme['tc-icon-toggle'], {
		[theme.active]: active,
	});

	return (
		<TooltipTrigger label={label} tooltipPlacement={tooltipPlacement}>
			<Button
				{...getPropsFrom(Button, rest)}
				id={id}
				className={cn}
				bsStyle="link"
				aria-label={label}
			>
				<Icon name={icon} />
			</Button>
		</TooltipTrigger>
	);
}

ActionIconToggle.propTypes = {
	active: PropTypes.bool,
	className: PropTypes.string,
	icon: PropTypes.string.isRequired,
	id: PropTypes.string,
	label: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	tooltipPlacement: OverlayTrigger.propTypes.placement,
};

ActionIconToggle.defaultProps = {
	tooltipPlacement: 'top',
};

ActionIconToggle.displayName = 'ActionIconToggle';
export default ActionIconToggle;
