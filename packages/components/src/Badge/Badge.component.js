import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import i18n from 'i18next';
import { translate } from 'react-i18next';

import I18N_DOMAIN from '../constants';
import Action from '../Actions/Action';
import theme from './Badge.scss';

function badgeClasses(tcStyle, onDelete) {
	return classNames({
		[theme['tc-badge']]: true,
		'tc-badge': true,
		[theme['tc-badge-outline']]: tcStyle === 'outline',
		'tc-badge-outline': tcStyle === 'outline',
		[theme['tc-badge-solid']]: tcStyle === 'solid',
		'tc-badge-solid': tcStyle === 'solid',
		[theme['tc-badge-with-icon']]: onDelete,
		'tc-badge-with-icon': onDelete,
	});
}

function badgeLabelClasses(onDelete) {
	return classNames({
		[theme['tc-badge-label']]: true,
		'tc-badge-label': true,
		[theme['tc-badge-label-with-icon']]: onDelete,
		'tc-badge-label-with-icon': onDelete,
	});
}

function renderDeleteIcon(onDelete, t) {
	return (
		<Action
			label={t('BADGE_DELETE', { defaultValue: 'delete' })}
			hideLabel
			onClick={onDelete}
			icon="talend-cross"
			className={`${theme['tc-badge-delete-icon']} tc-badge-delete-icon`}
		/>
	);
}

function Badge({ label, tcStyle, onDelete, t }) {
	return (
		<div className={badgeClasses(tcStyle, onDelete)}>
			<span className={badgeLabelClasses(onDelete)}>
				{label}
			</span>
			{onDelete && renderDeleteIcon(onDelete, t)}
		</div>
	);
}

Badge.propTypes = {
	label: PropTypes.string,
	tcStyle: PropTypes.string,
	onDelete: PropTypes.func,
	t: PropTypes.func.isRequired,
};

Badge.defaultProps = {
	tcStyle: 'solid',
};

export default translate(I18N_DOMAIN, { i18n: i18n.init() })(Badge);
