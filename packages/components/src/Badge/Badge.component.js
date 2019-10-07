import PropTypes from 'prop-types';
import React from 'react';
import { withTranslation } from 'react-i18next';

import I18N_DOMAIN_COMPONENTS from '../constants';
import getDefaultT from '../translate';
import badgeCssModule from './Badge.scss';
import { getTheme } from '../theme';

import BadgeLib from './BadgeComposition';

const theme = getTheme(badgeCssModule);

const SIZES = {
	large: 'large',
	small: 'small',
};

export function Badge({
	aslink,
	category,
	className,
	children,
	disabled,
	display = SIZES.large,
	icon,
	id,
	label,
	onDelete,
	onSelect,
	selected,
	style,
	t,
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

	const defaultContent = [
		category && <BadgeLib.Category label={category} />,
		category && <BadgeLib.Separator />,
		<BadgeLib.Label aslink={aslink} category={category} label={label}>
			{icon && <BadgeLib.Icon name={icon} />}
		</BadgeLib.Label>,
		icon && onDelete && <BadgeLib.Separator iconSeparator />,
		onDelete && <BadgeLib.DeleteAction id={id} onClick={onDelete} disabled={disabled} t={t} />,
	];
	const badgeProps = {
		id: id && `tc-badge-select-${id}`,
		className: badgeClasses,
	};

	return (
		<div className={containerClasses} style={style}>
			{onSelect ? (
				<button {...badgeProps} key="button" type="button" disabled={disabled} onClick={onSelect}>
					{!children ? defaultContent : children}
				</button>
			) : (
				<div {...badgeProps} key="div">
					{!children ? defaultContent : children}
				</div>
			)}
		</div>
	);
}

Badge.propTypes = {
	aslink: PropTypes.bool,
	category: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
	className: PropTypes.string,
	disabled: PropTypes.bool,
	display: PropTypes.oneOf(Object.values(SIZES)),
	icon: PropTypes.string,
	id: PropTypes.string,
	label: PropTypes.string,
	onDelete: PropTypes.func,
	onSelect: PropTypes.func,
	selected: PropTypes.bool,
	style: PropTypes.object,
	t: PropTypes.func.isRequired,
	white: PropTypes.bool,
};

Badge.defaultProps = {
	selected: false,
	disabled: false,
	t: getDefaultT(),
};

const TranslatedBadge = withTranslation(I18N_DOMAIN_COMPONENTS)(Badge);
TranslatedBadge.SIZES = SIZES;
export default TranslatedBadge;
