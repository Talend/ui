import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { Button, OverlayTrigger } from 'react-bootstrap';

import CoralToggle from '@talend/design-system/lib/components/Toggle';
import CoralTooltip from '@talend/design-system/lib/components/Tooltip';

import Icon from '../../Icon';
import TooltipTrigger from '../../TooltipTrigger';
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
		[theme.active]: active,
		active,
		[theme.tick]: tick,
		tick,
	});

	return (
		<CoralTooltip title={label} placement={tooltipPlacement}>
			<CoralToggle
				{...getPropsFrom(Button, rest)}
				id={id}
				className={cn}
				aria-label={label}
				aria-pressed={active}
				bsStyle="link"
				ref={buttonRef}
			>
				<Icon name={icon} transform={iconTransform} />
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
	tooltipPlacement: OverlayTrigger.propTypes.placement,
	buttonRef: PropTypes.func,
};

ActionIconToggle.defaultProps = {
	active: false,
	tick: false,
	tooltipPlacement: 'top',
};

ActionIconToggle.displayName = 'ActionIconToggle';
export default ActionIconToggle;
