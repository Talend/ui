import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import {
	Button as CoralButton,
	Toggle as CoralToggle,
	Tooltip as CoralTooltip,
} from '@talend/design-system';

import getPropsFrom from '../../utils/getPropsFrom';

import theme from './ActionIconToggle.scss';

function ActionIconToggle(props) {
	const {
		active,
		tick,
		className,
		icon,
		iconTransform,
		id,
		label,
		tooltipPlacement,
		buttonRef,
		...rest
	} = props;

	const cn = classNames(className, 'tc-icon-toggle', theme['tc-icon-toggle'], {
		active,
		[theme.tick]: tick,
		tick,
	});

	return (
		<CoralTooltip title={label} placement={tooltipPlacement}>
			<CoralToggle
				{...getPropsFrom(CoralButton, rest)}
				id={id}
				className={cn}
				isActive={active}
				icon={icon}
				ref={buttonRef}
			>
				{label}
			</CoralToggle>
		</CoralTooltip>
	);
}

ActionIconToggle.propTypes = {
	active: PropTypes.bool,
	tick: PropTypes.bool,
	className: PropTypes.string,
	icon: PropTypes.string.isRequired,
	iconTransform: PropTypes.string,
	id: PropTypes.string,
	label: PropTypes.string.isRequired,
	onClick: PropTypes.func,
	tooltipPlacement: CoralTooltip.propTypes.placement,
	buttonRef: PropTypes.func,
};

ActionIconToggle.defaultProps = {
	active: false,
	tick: false,
	tooltipPlacement: 'top',
};

ActionIconToggle.displayName = 'ActionIconToggle';

export default ActionIconToggle;
