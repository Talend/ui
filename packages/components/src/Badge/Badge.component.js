import PropTypes from 'prop-types';
import React from 'react';
import { translate } from 'react-i18next';

import I18N_DOMAIN_COMPONENTS from '../constants';
import Action from '../Actions/Action';
import getDefaultT from '../translate';
import Icon from '../Icon';
import TooltipTrigger from '../TooltipTrigger';
import badgeCssModule from './Badge.scss';
import { getTheme } from '../theme';

const theme = getTheme(badgeCssModule);

const SIZES = {
	large: 'large',
	small: 'small',
};

function Badge({
	id,
	label,
	category,
	onDelete,
	onSelect,
	selected,
	disabled,
	t,
	style,
	className,
	display = SIZES.large,
	aslink,
	icon,
	white,
}) {
	const displayClass =
		display === SIZES.small ? 'tc-badge-display-small' : 'tc-badge-display-large';

	const containerClasses = theme('tc-badge', displayClass, className, {
		'tc-badge-selected': selected,
		'tc-badge-disabled': disabled,
		'tc-badge-readonly': !onDelete,
		'tc-badge-aslink': aslink,
		'tc-badge-edit': onDelete && onSelect,
	});
	const badgeClasses = theme('tc-badge-button', {
		'tc-badge-white': white,
	});
	const labelTextClasses = theme({
		'tc-badge-label-text': !(!aslink && category),
		'tc-badge-label-text-with-categ': !aslink && category,
	});

	const children = [
		category && (
			<TooltipTrigger label={category} tooltipPlacement="top">
				<span key="category" aria-label={category} className={theme('tc-badge-category')}>
					{category}
				</span>
			</TooltipTrigger>
		),
		category && <span className={theme('tc-badge-separator')} />,
		<div className={theme('tc-badge-label')}>
			<TooltipTrigger label={label} tooltipPlacement="top">
				<span key="label" className={labelTextClasses}>
					{label}
				</span>
			</TooltipTrigger>
			{icon && <Icon name={icon} className={theme('tc-badge-label-icon')} />}
		</div>,
		icon && onDelete && (
			<span className={[theme('tc-badge-separator', 'tc-badge-separator-icon')]} />
		),
		onDelete && (
			<Action
				key="delete"
				id={id && `tc-badge-delete-${id}`}
				label={t('BADGE_DELETE', { defaultValue: 'delete' })}
				hideLabel
				onClick={onDelete}
				disabled={disabled}
				icon={'talend-cross'}
				className={theme('tc-badge-delete-icon')}
				link
				role="button"
			/>
		),
	];
	const badgeProps = {
		id: id && `tc-badge-select-${id}`,
		className: badgeClasses,
		children,
	};

	return (
		<div className={containerClasses} style={style}>
			{onSelect ? (
				<button {...badgeProps} key="button" type="button" disabled={disabled} onClick={onSelect} />
			) : (
				<div {...badgeProps} key="div" />
			)}
		</div>
	);
}

Badge.SIZES = SIZES;

Badge.propTypes = {
	id: PropTypes.string,
	label: PropTypes.string,
	category: PropTypes.string,
	onDelete: PropTypes.func,
	onSelect: PropTypes.func,
	selected: PropTypes.bool,
	disabled: PropTypes.bool,
	t: PropTypes.func.isRequired,
	style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	className: PropTypes.string,
	display: PropTypes.oneOf([Badge.SIZES.small, Badge.SIZES.large]),
	aslink: PropTypes.bool,
	white: PropTypes.bool,
	icon: PropTypes.string,
};

Badge.defaultProps = {
	selected: false,
	disabled: false,
	t: getDefaultT(),
};

export default translate(I18N_DOMAIN_COMPONENTS)(Badge);
