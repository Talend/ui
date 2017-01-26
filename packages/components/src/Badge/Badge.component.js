import React from 'react';
import classNames from 'classnames';
import Action from '../Actions/Action';
import theme from './Badge.scss';

const badgeClasses = (tcStyle, onDelete) => classNames({
	[theme['tc-badge']]: true,
	'tc-badge': true,
	[theme['tc-badge-outline']]: tcStyle === 'outline',
	'tc-badge-outline': tcStyle === 'outline',
	[theme['tc-badge-solid']]: tcStyle === 'solid',
	'tc-badge-solid': tcStyle === 'solid',
	[theme['tc-badge-with-icon']]: onDelete,
	'tc-badge-with-icon': onDelete,
});

const badgeLabelClasses = onDelete => classNames({
	[theme['tc-badge-label']]: true,
	'tc-badge-label': true,
	[theme['tc-badge-label-with-icon']]: onDelete,
	'tc-badge-label-with-icon': onDelete,
});

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
	label: React.PropTypes.string,
	tcStyle: React.PropTypes.string,
	onDelete: React.PropTypes.func,
};

Badge.defaultProps = {
	tcStyle: 'solid',
};

export default Badge;
