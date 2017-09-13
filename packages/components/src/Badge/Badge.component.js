import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import i18n, { init } from 'i18next';
import { translate } from 'react-i18next';

import I18N_DOMAIN_COMPONENTS from '../constants';
import Action from '../Actions/Action';
import theme from './Badge.scss';

function renderDeleteIcon(onClick, disabled, t) {
	if (onClick) {
		return (
			<Action
				label={t('BADGE_DELETE', { defaultValue: 'delete' })}
				hideLabel
				onClick={onClick}
				disabled={disabled}
				icon="talend-cross"
				className={classNames('tc-badge-delete-icon', theme['tc-badge-delete-icon'])}
			/>
		);
	}
	return null;
}

function Badge({ label, category, onDelete, onSelect, selected, disabled, t }) {
	const containerClasses = classNames(
		'tc-badge', theme['tc-badge'],
		selected && ['tc-badge-selected', theme['tc-badge-selected']],
		disabled && ['tc-badge-disabled', theme['tc-badge-disabled']],
		!onDelete && ['tc-badge-readonly', theme['tc-badge-readonly']],
	);
	const badgeClasses = classNames('tc-badge-button', theme['tc-badge-button']);
	const labelClasses = classNames('tc-badge-label', theme['tc-badge-label']);
	const categoryClasses = classNames('tc-badge-category', theme['tc-badge-category']);

	return (
		<div className={containerClasses}>
			<button className={badgeClasses} onClick={onSelect} disabled={disabled}>
				{category && <span className={categoryClasses}>
					{category}
				</span>}
				<span className={labelClasses}>
					{label}
				</span>
			</button>
			{renderDeleteIcon(onDelete, disabled, t)}
		</div>
	);
}

Badge.propTypes = {
	label: PropTypes.string,
	category: PropTypes.string,
	onDelete: PropTypes.func,
	onSelect: PropTypes.func,
	selected: PropTypes.bool,
	disabled: PropTypes.bool,
	t: PropTypes.func.isRequired,
};

Badge.defaultProps = {
	selected: false,
	disabled: false,
};

export default translate(I18N_DOMAIN_COMPONENTS, { i18n: init.call(i18n) })(Badge);
