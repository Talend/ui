import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { translate } from 'react-i18next';

import I18N_DOMAIN_COMPONENTS from '../constants';
import Action from '../Actions/Action';
import getDefaultT from '../translate';
import theme from './Badge.scss';

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

	const children = [
		category ? <span className={categoryClasses}>{category}</span> : null,
		<span className={labelClasses}>{label}</span>,
	];
	const badgeProps = {
		id: id && `tc-badge-select-${id}`,
		className: badgeClasses,
		children,
	};

	return (
		<div className={containerClasses} style={style}>
			{onSelect ? (
				<button {...badgeProps} type="button" disabled={disabled} onClick={onSelect} />
			) : (
				<div {...badgeProps} />
			)}
			{onDelete && (
				<Action
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
};

Badge.defaultProps = {
	selected: false,
	disabled: false,
	t: getDefaultT(),
};

export default translate(I18N_DOMAIN_COMPONENTS)(Badge);
