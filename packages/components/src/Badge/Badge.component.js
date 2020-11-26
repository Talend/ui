import PropTypes from 'prop-types';
import React from 'react';

import badgeCssModule from './Badge.scss';
import { getTheme } from '../theme';

import BadgeLib from './BadgeComposition';

const theme = getTheme(badgeCssModule);

const SIZES = {
	large: 'large',
	small: 'small',
};

const TYPES = {
	VALID: 'valid',
	INVALID: 'invalid',
	EMPTY: 'empty',
	PATTERN: 'pattern',
	VALUE: 'value',
};

const DefaultBadge = ({ aslink, category, disabled, icon, id, label, onDelete, dropdown }) => (
	<React.Fragment>
		{category && <BadgeLib.Category label={category} />}
		{category && <BadgeLib.Separator />}
		<BadgeLib.Label aslink={aslink} category={category} label={label}>
			{icon && <BadgeLib.Icon name={icon} />}
		</BadgeLib.Label>
		{icon && onDelete && <BadgeLib.Separator iconSeparator />}
		{dropdown && <BadgeLib.Dropdown id={id} props={dropdown} />}
		{onDelete && <BadgeLib.DeleteAction id={id} onClick={onDelete} disabled={disabled} />}
	</React.Fragment>
);

DefaultBadge.propTypes = {
	aslink: PropTypes.bool,
	category: PropTypes.string,
	disabled: PropTypes.bool,
	icon: PropTypes.string,
	id: PropTypes.string,
	label: PropTypes.string,
	onDelete: PropTypes.func,
	dropdown: PropTypes.object,
};

const BadgeType = ({ disabled, onSelect, children, ...rest }) => {
	if (onSelect) {
		return (
			<button {...rest} key="button" type="button" disabled={disabled} onClick={onSelect}>
				{children}
			</button>
		);
	}
	return (
		<div {...rest} key="div">
			{children}
		</div>
	);
};

BadgeType.propTypes = {
	children: PropTypes.any,
	disabled: PropTypes.bool,
	onSelect: PropTypes.func,
};

function Badge({
	aslink,
	category,
	className,
	children,
	disabled = false,
	display = SIZES.large,
	icon,
	id,
	label,
	onDelete,
	onSelect,
	selected = false,
	style,
	white,
	type,
	dropdown,
}) {
	const displayClass =
		display === SIZES.small ? 'tc-badge-display-small' : 'tc-badge-display-large';

	const containerClasses = theme('tc-badge', displayClass, className, {
		'tc-badge-selected': selected,
		'tc-badge-disabled': disabled,
		'tc-badge-readonly': !onDelete,
		'tc-badge-aslink': aslink,
		'tc-badge-edit': onDelete && onSelect,
		[`tc-badge--${type}`]: !!type,
		'tc-badge-dropdown': dropdown,
	});
	const badgeClasses = theme('tc-badge-button', {
		'tc-badge-white': white,
	});

	const badgeProps = {
		id: id && `tc-badge-select-${id}`,
		className: badgeClasses,
	};

	return (
		<div className={containerClasses} style={style}>
			<BadgeType {...badgeProps} disabled={disabled} onSelect={onSelect}>
				{!children ? (
					<DefaultBadge
						aslink={aslink}
						category={category}
						disabled={disabled}
						icon={icon}
						id={id}
						label={label}
						onDelete={onDelete}
						dropdown={dropdown}
					/>
				) : (
					children
				)}
			</BadgeType>
		</div>
	);
}

Badge.propTypes = {
	aslink: PropTypes.bool,
	category: PropTypes.string,
	children: PropTypes.any,
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
	white: PropTypes.bool,
	type: PropTypes.oneOf(Object.values(TYPES)),
	dropdown: PropTypes.object,
};
Badge.displayName = 'Badge';
Badge.SIZES = SIZES;
Badge.TYPES = TYPES;
export default Badge;
