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
	edit,
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
		'tc-badge-edit': edit,
	});
	const badgeClasses = theme('tc-badge-button', {
		'tc-badge-white': white,
	});
	const categoryClasses = theme('tc-badge-category');
	const separatorClasses = theme('tc-badge-separator');
	const separatorIconClasses = theme('tc-badge-separator', 'tc-badge-separator-icon');
	const labelClasses = theme('tc-badge-label');
	const labelTextClasses = theme({
		'tc-badge-label-text': !(!aslink && category),
		'tc-badge-label-text-with-categ': !aslink && category,
	});
	const labelIconClasses = theme('tc-badge-label-icon');

	const children = [
		category && (
			<TooltipTrigger label={category} tooltipPlacement="top">
				<span key="category" aria-label={category} className={categoryClasses}>
					{category}
				</span>
			</TooltipTrigger>
		),
		category && <span className={separatorClasses} />,
		<div className={labelClasses}>
			<TooltipTrigger label={label} tooltipPlacement="top">
				<span key="label" className={labelTextClasses}>
					{label}
				</span>
			</TooltipTrigger>
			{icon && <Icon name={icon} className={labelIconClasses} />}
		</div>,
		icon && <span className={[separatorIconClasses]} />,
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
	display: PropTypes.oneOf([SIZES.small, SIZES.large]),
	aslink: PropTypes.bool,
	edit: PropTypes.bool,
	white: PropTypes.bool,
	icon: PropTypes.string,
};

Badge.defaultProps = {
	selected: false,
	disabled: false,
	t: getDefaultT(),
};

export default translate(I18N_DOMAIN_COMPONENTS)(Badge);
