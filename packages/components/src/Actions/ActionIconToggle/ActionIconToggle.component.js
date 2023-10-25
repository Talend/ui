import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from '@talend/react-bootstrap';

import getPropsFrom from '../../utils/getPropsFrom';

import theme from './ActionIconToggle.module.scss';
import { Icon, Tooltip } from '@talend/design-system';

function ActionIconToggle(props) {
	const { active, tick, className, icon, iconTransform, id, label, buttonRef, ...rest } = props;

	const cn = classNames(className, 'tc-icon-toggle', theme['tc-icon-toggle'], {
		[theme.active]: active,
		active,
		[theme.tick]: tick,
		tick,
	});

	return (
		<Tooltip label={label} tooltipPlacement={tooltipPlacement}>
			<Button
				{...getPropsFrom(Button, rest)}
				id={id}
				className={cn}
				aria-label={label}
				aria-pressed={active}
				bsStyle="link"
				ref={buttonRef}
			>
				<Icon name={icon} transform={iconTransform} />
			</Button>
		</Tooltip>
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
	buttonRef: PropTypes.func,
};

ActionIconToggle.defaultProps = {
	active: false,
	tick: false,
	tooltipPlacement: 'top',
};

ActionIconToggle.displayName = 'ActionIconToggle';
export default ActionIconToggle;
