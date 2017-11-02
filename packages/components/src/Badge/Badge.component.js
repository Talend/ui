import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { translate } from 'react-i18next';

import I18N_DOMAIN_COMPONENTS from '../constants';
import { DEFAULT_I18N } from '../translate';
import Action from '../Actions/Action';
import theme from './Badge.scss';

function renderDeleteIcon(onClick, id, disabled, t) {
	if (onClick) {
		const actionProps = {
			label: t('BADGE_DELETE', { defaultValue: 'delete' }),
			hideLabel: true,
			onClick,
			disabled,
			icon: 'talend-cross',
			className: classNames('tc-badge-delete-icon', theme['tc-badge-delete-icon']),
		};

		if (id) {
			actionProps.id = `tc-badge-delete-${id}`;
		}

		return <Action {...actionProps} />;
	}
	return null;
}

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
}) {
	const containerClasses = classNames(
		'tc-badge',
		theme['tc-badge'],
		selected && ['tc-badge-selected', theme['tc-badge-selected']],
		disabled && ['tc-badge-disabled', theme['tc-badge-disabled']],
		!onDelete && ['tc-badge-readonly', theme['tc-badge-readonly']],
		className,
	);
	const badgeClasses = classNames('tc-badge-button', theme['tc-badge-button']);
	const labelClasses = classNames('tc-badge-label', theme['tc-badge-label']);
	const categoryClasses = classNames('tc-badge-category', theme['tc-badge-category']);

	const badgeProps = {
		className: badgeClasses,
		onClick: onSelect,
		disabled,
	};

	if (id) {
		badgeProps.id = `tc-badge-select-${id}`;
	}

	return (
		<div className={containerClasses} style={style}>
			<button {...badgeProps}>
				{category && <span className={categoryClasses}>{category}</span>}
				<span className={labelClasses}>{label}</span>
			</button>
			{renderDeleteIcon(onDelete, id, disabled, t)}
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
};

Badge.defaultProps = {
	selected: false,
	disabled: false,
};

export default translate(I18N_DOMAIN_COMPONENTS, { i18n: DEFAULT_I18N })(Badge);
