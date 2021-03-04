import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { withTranslation } from 'react-i18next';
import {
	Button as CoralButton,
	Skeleton as CoralSkeleton,
	Link as CoralLink,
	Tooltip as CoralTooltip,
} from '@talend/design-system';
import I18N_DOMAIN_COMPONENTS from '../../constants';
import getDefaultT from '../../translate';
import OverlayTrigger, { overlayPropTypes } from '../../OverlayTrigger';

const LEFT = 'left';
const RIGHT = 'right';

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
		return <CoralSkeleton.Button />;
	}
	const buttonProps = rest; // getPropsFrom(Button, rest);
	const buttonContent = props.label;
	const btnIsDisabled = inProgress || disabled;
	const style = link ? 'link' : bsStyle;
	const rClick = getHandler(onClick, model, label, rest);
	const rMouseDown = getHandler(onMouseDown, model, label, rest);
	const rMouseEnter = getHandler(onMouseEnter, model, label, rest);
	const rMouseLeave = getHandler(onMouseLeave, model, label, rest);
	buttonProps.className = classNames(buttonProps.className, {
		'btn-icon-only': hideLabel || !label,
		// [theme['btn-disabled']]: btnIsDisabled,
	});
	let ariaLabel = tooltipLabel || label;
	if (inProgress) {
		ariaLabel = t('ACTION_IN_PROGRESS', {
			defaultValue: '{{label}} (in progress)',
			label: ariaLabel,
		});
	}
	if (loading) {
		ariaLabel = t('SKELETON_LOADING', { defaultValue: '{{type}} (loading)', type: ariaLabel });
	}
	const hasPopup = !inProgress && overlayComponent;
	if (hasPopup) {
		buttonProps['aria-haspopup'] = true;
	}
	let StyledCoralComponent = CoralButton;
	switch (style) {
		case 'primary':
		case 'info':
			StyledCoralComponent = CoralButton.Primary;
			break;
		case 'success':
			StyledCoralComponent = CoralButton.Tertiary;
			break;
		case 'danger':
			StyledCoralComponent = CoralButton.Destructive;
			break;
		default:
			break;
	}
	if (bsStyle.includes('inverse')) {
		StyledCoralComponent = CoralButton.Secondary;
	}
	if (props.href) {
		StyledCoralComponent = CoralLink;
	}
	let btn = (
		<StyledCoralComponent
			onMouseDown={!overlayComponent ? rMouseDown : null}
			onClick={!overlayComponent ? rClick : null}
			onMouseEnter={!overlayComponent ? rMouseEnter : null}
			onMouseLeave={!overlayComponent ? rMouseLeave : null}
			disabled={btnIsDisabled}
			aria-label={ariaLabel}
			ref={buttonRef}
			download={download}
			icon={props.icon}
			hideText={hideLabel}
			{...buttonProps}
			className={`${buttonProps.className} btn btn-${bsStyle}`}
		>
			{buttonContent}
		</StyledCoralComponent>
	);
	if (hasPopup) {
		btn = (
			<OverlayTrigger
				onClick={rClick}
				onMouseEnter={rMouseEnter}
				onMouseLeave={rMouseLeave}
				overlayRef={overlayRef}
				overlayId={overlayId}
				overlayPlacement={overlayPlacement}
				overlayComponent={props.overlayComponent}
				getComponent={props.getComponent}
				preventScrolling={props.preventScrolling}
			>
				{btn}
			</OverlayTrigger>
		);
	}
	if (hideLabel || tooltip || tooltipLabel) {
		btn = (
			<CoralTooltip title={tooltipLabel || label} placement={tooltipPlacement}>
				{btn}
			</CoralTooltip>
		);
	}
	return btn;
}

ActionButton.propTypes = {
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
	// tooltipPlacement: BaseOverlayTrigger.propTypes.placement,
	t: PropTypes.func,
	tooltip: PropTypes.bool,
	tooltipLabel: PropTypes.string,
	tooltipClassName: PropTypes.string,
	...overlayPropTypes,
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
