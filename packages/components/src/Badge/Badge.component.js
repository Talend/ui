import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { translate } from 'react-i18next';

import I18N_DOMAIN_COMPONENTS from '../constants';
import Action from '../Actions/Action';
import getDefaultT from '../translate';
import theme from './Badge.scss';
import Icon from '../Icon';
import TooltipTrigger from '../TooltipTrigger';

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
	display = 'large',
	aslink,
	edit,
	icon,
	white,
}) {
	const displayClass = display === 'small' ? 'tc-badge-display-small' : 'tc-badge-display-large';

	const containerClasses = classNames(
		'tc-badge',
		theme['tc-badge'],
		selected && ['tc-badge-selected', theme['tc-badge-selected']],
		disabled && ['tc-badge-disabled', theme['tc-badge-disabled']],
		!onDelete && ['tc-badge-readonly', theme['tc-badge-readonly']],
		[displayClass, theme[displayClass]],
		aslink && ['tc-badge-aslink', theme['tc-badge-aslink']],
		edit && ['tc-badge-edit', theme['tc-badge-edit']],
		className,
	);
	const badgeClasses = classNames('tc-badge-button', theme['tc-badge-button']);
	const badgeWhiteClasses = classNames(
		'tc-badge-button',
		'tc-badge-white',
		theme['tc-badge-button'],
		theme['tc-badge-white'],
	);
	const categoryClasses = classNames('tc-badge-category', theme['tc-badge-category']);
	const separatorClasses = classNames('tc-badge-separator', theme['tc-badge-separator']);
	const separatorIconClasses = classNames(
		'tc-badge-separator',
		'tc-badge-separator-icon',
		theme['tc-badge-separator'],
		theme['tc-badge-separator-icon'],
	);
	const labelClasses = classNames('tc-badge-label', theme['tc-badge-label']);
	const labelTextClasses = classNames('tc-badge-label-text', theme['tc-badge-label-text']);
	const labelTextWithCategClasses = classNames(
		'tc-badge-label-text-with-categ',
		theme['tc-badge-label-text-with-categ'],
	);
	const labelIconClasses = classNames('tc-badge-label-icon', theme['tc-badge-label-icon']);

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
				<span
					key="label"
					className={!aslink && category ? labelTextWithCategClasses : labelTextClasses}
				>
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
				className={classNames('tc-badge-delete-icon', theme['tc-badge-delete-icon'])}
				link
				role="button"
			/>
		),
	];
	const badgeProps = {
		id: id && `tc-badge-select-${id}`,
		className: white ? badgeWhiteClasses : badgeClasses,
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
	display: PropTypes.string,
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
