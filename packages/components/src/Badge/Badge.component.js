import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

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

function renderDeleteIcon(onDelete) {
	return (
		<Action
			label="delete"
			hideLabel
			onClick={onDelete}
			icon="talend-cross"
			className={`${theme['tc-badge-delete-icon']} tc-badge-delete-icon`}
		/>
	);
}

function Badge({ label, tcStyle, onDelete }) {
	return (
		<div className={badgeClasses(tcStyle, onDelete)}>
			<span className={badgeLabelClasses(onDelete)}>
				{label}
			</span>
			{onDelete && renderDeleteIcon(onDelete)}
		</div>
	);
}

Badge.propTypes = {
	label: PropTypes.string,
	tcStyle: PropTypes.string,
	onDelete: PropTypes.func,
};

Badge.defaultProps = {
	tcStyle: 'solid',
};

export default Badge;
