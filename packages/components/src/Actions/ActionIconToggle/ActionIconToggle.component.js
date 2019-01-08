import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { Button, OverlayTrigger } from 'react-bootstrap';

import Icon from '../../Icon';
import TooltipTrigger from '../../TooltipTrigger';
import getPropsFrom from '../../utils/getPropsFrom';

import theme from './ActionIconToggle.scss';

function ActionIconToggle(props) {
	const { active, className, icon, id, label, tooltipPlacement, ...rest } = props;

	const cn = classNames(className, 'tc-icon-toggle', theme['tc-icon-toggle'], {
		[theme.active]: active,
		active,
	});

	return (
		<TooltipTrigger label={label} tooltipPlacement={tooltipPlacement}>
			<Button
				{...getPropsFrom(Button, rest)}
				id={id}
				className={cn}
				aria-label={label}
				aria-pressed={active}
				bsStyle=""
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
	active: false,
	tooltipPlacement: 'top',
};

ActionIconToggle.displayName = 'ActionIconToggle';
export default ActionIconToggle;
