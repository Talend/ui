import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { Button, OverlayTrigger as BaseOverlayTrigger } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import CoralButton from '@talend/design-system/lib/components/Button';

import TooltipTrigger from '../../TooltipTrigger';
import CircularProgress from '../../CircularProgress';
import Skeleton from '../../Skeleton';
import Icon from '../../Icon';
import getPropsFrom from '../../utils/getPropsFrom';
import theme from './ActionButton.scss';
import I18N_DOMAIN_COMPONENTS from '../../constants';
import getDefaultT from '../../translate';
import OverlayTrigger, { overlayPropTypes } from '../../OverlayTrigger';

const LEFT = 'left';
const RIGHT = 'right';

function getIcon({ icon, iconTransform, inProgress, loading }) {
	if (inProgress) {
		return <CircularProgress size="small" key="icon" />;
	}

	if (loading) {
		return (
			<Skeleton
				key="icon-skeleton"
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
		return <Skeleton key="label-skeleton" type="text" size="medium" />;
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
		return <Skeleton type="button" />;
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
		ariaLabel = t('SKELETON_LOADING', { defaultValue: '{{type}} (loading)', type: ariaLabel });
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
		<CoralButton.Primary
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
		</CoralButton.Primary>
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
			<TooltipTrigger
				label={tooltipLabel || label}
				tooltipPlacement={tooltipPlacement}
				className={tooltipClassName}
			>
				{btn}
			</TooltipTrigger>
		);
	}
	return btn;
}

ActionButton.propTypes = {
	...getIcon.propTypes,
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
	tooltipPlacement: BaseOverlayTrigger.propTypes.placement,
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
