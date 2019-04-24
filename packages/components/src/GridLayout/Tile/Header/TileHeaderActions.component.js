import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import theme from './TileHeader.scss';
import ActionIconToggle from '../../../Actions/ActionIconToggle';

function getContentClassName(left, right, className) {
	return classnames(className, {
		[`${theme['tc-tile-header-left']}`]: left,
		[`${theme['tc-tile-header-right']}`]: right,
		'tc-tile-header-left': left,
		'tc-tile-header-right': right,
	});
}

function renderActions(actions) {
	if (actions && actions.length) {
		return actions.map(action => (
			<ActionIconToggle {...action} />
		));
	}
	return null;
}

function HeaderActions({ left, right, actions, className }) {
	// const { leftActions, rightActions } = props;
	return (
		<div className={getContentClassName(left, right, className)}>
			{ renderActions(actions) }
		</div>
	);
}

HeaderActions.propTypes = {
	left: PropTypes.bool,
	right: PropTypes.bool,
	className: PropTypes.string,
	actions: PropTypes.arrayOf(PropTypes.shape(ActionIconToggle.propTypes)),
};

export default HeaderActions;
