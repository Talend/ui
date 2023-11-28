import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from '@talend/react-bootstrap';
import { withTranslation } from 'react-i18next';

import CircularProgress from '../../CircularProgress';
import getPropsFrom from '../../utils/getPropsFrom';
import theme from './ActionButton.module.scss';
import I18N_DOMAIN_COMPONENTS from '../../constants';
import getDefaultT from '../../translate';
import {
	Icon,
	Popover,
	SizedIcon,
	SkeletonButton,
	SkeletonButtonIcon,
	SkeletonParagraph,
	Tooltip,
} from '@talend/design-system';
import Inject from '../../Inject';

const LEFT = 'left';
const RIGHT = 'right';

function getIcon({ icon, iconName, iconTransform, inProgress, loading }) {
	if (inProgress) {
		return <CircularProgress size="small" key="icon" />;
	}

	if (loading) {
		return <SkeletonButtonIcon />;
	}

	if (iconName) {
		return <SizedIcon name={iconName} transform={iconTransform} key="icon" size="M" />;
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
		return <SkeletonParagraph />;
	}
	return <span>{label}</span>;
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

function getHandler(func, model, label, rest) {
	return (
		func &&
		(event =>
			func(event, {
				action: { label, ...rest },
				model,
			}))
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
function ActionButton(props) {
	const {
		bsStyle,
		buttonRef,
		children,
		inProgress,
		disabled,
		hideLabel,
		label,
		loading,
		download,
		link,
		model,
		onMouseDown = noOp,
		onClick = noOp,
		onMouseEnter,
		onMouseLeave,
		overlayId,
		overlayComponent,
		overlayPlacement,
		overlayRef,
		tooltipPlacement,
		tooltipClassName,
		tooltip,
		tooltipLabel,
		available,
		t,
		...rest
	} = props;
	if (!available) {
		return null;
	}

	if (loading && !link) {
		return <SkeletonButton />;
	}

	const buttonProps = getPropsFrom(Button, rest);
	const buttonContent = getContent(props);
	const btnIsDisabled = inProgress || disabled;
	const style = link ? 'link' : bsStyle;

	const rClick = getHandler(onClick, model, label, rest);
	const rMouseDown = getHandler(onMouseDown, model, label, rest);
	const rMouseEnter = getHandler(onMouseEnter, model, label, rest);
	const rMouseLeave = getHandler(onMouseLeave, model, label, rest);

	buttonProps.className = classNames(buttonProps.className, {
		'btn-icon-only': hideLabel || !label,
		[theme['btn-disabled']]: btnIsDisabled,
	});

	let ariaLabel = tooltipLabel || label;
	if (inProgress) {
		ariaLabel = t('ACTION_IN_PROGRESS', {
			defaultValue: '{{label}} (in progress)',
			label: ariaLabel,
		});
	}
	if (loading) {
		ariaLabel = t('SKELETON_LOADING', { defaultValue: '{{type}} Loading...', type: ariaLabel });
	}

	const hasPopup = !inProgress && overlayComponent;
	if (hasPopup) {
		buttonProps['aria-haspopup'] = true;
	}
	// enforce security on target="_blank"
	if (buttonProps.target === '_blank') {
		buttonProps.rel = 'noopener noreferrer';
	}
	let btn = (
		<Button
			onMouseDown={!overlayComponent ? rMouseDown : null}
			onClick={!overlayComponent ? rClick : null}
			onMouseEnter={!overlayComponent ? rMouseEnter : null}
			onMouseLeave={!overlayComponent ? rMouseLeave : null}
			bsStyle={style}
			disabled={btnIsDisabled}
			role={link ? 'link' : null}
			aria-label={ariaLabel}
			ref={buttonRef}
			download={download}
			{...buttonProps}
		>
			{buttonContent}
			{children}
		</Button>
	);
	if (hasPopup) {
		btn = (
			<Popover
				// onClick={rClick}
				// onMouseEnter={rMouseEnter}
				// onMouseLeave={rMouseLeave}
				// preventScrolling={props.preventScrolling}
				disclosure={btn}
			>
				<Inject
					component={props.overlayComponent}
					getComponent={props.getComponent}
					id={overlayId}
					ref={overlayRef}
				/>
			</Popover>
		);
	}

	// 2 ways to display the tooltip via props: `hideLabel` and `tooltip`.
	// warning: when `tooltip` is set to false, then no tooltip even if `hideLabel` is set
	const shouldDisplayTooltip = (hideLabel || tooltip || tooltipLabel) && tooltip !== false;
	if (ariaLabel && shouldDisplayTooltip) {
		btn = <Tooltip label={ariaLabel}>{btn}</Tooltip>;
	}
	return btn;
}

ActionButton.propTypes = {
	...getIcon.propTypes,
	available: PropTypes.bool,
	inProgress: PropTypes.bool,
	id: PropTypes.string,
	bsStyle: PropTypes.string,
	buttonRef: PropTypes.func,
	disabled: PropTypes.bool,
	download: PropTypes.string,
	hideLabel: PropTypes.bool,
	iconPosition: PropTypes.oneOf([LEFT, RIGHT]),
	label: PropTypes.string.isRequired,
	loading: PropTypes.bool,
	link: PropTypes.bool,
	model: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	name: PropTypes.string,
	onClick: PropTypes.func,
	iconName: PropTypes.string,
	t: PropTypes.func,
	tooltip: PropTypes.bool,
	tooltipLabel: PropTypes.string,
	tooltipClassName: PropTypes.string,
};

ActionButton.defaultProps = {
	available: true,
	bsStyle: 'default',
	tooltipPlacement: 'top',
	inProgress: false,
	loading: false,
	disabled: false,
	t: getDefaultT(),
};

ActionButton.displayName = 'ActionButton';
export default withTranslation(I18N_DOMAIN_COMPONENTS)(ActionButton);
