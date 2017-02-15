import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Action from '../Actions/Action';
import ActionSplitDropdown from '../Actions/ActionSplitDropdown';
import css from './ActionBar.scss';

const TYPE_SPLIT_DROPDOWN = 'splitDropdown';

function ActionBar({ selected, actions, multiSelectActions }) {
	const getActionsToRender = () => (selected > 0 ? multiSelectActions : actions);

	const renderActions = actionsToRender =>
		actionsToRender.map((action, index) => {
			const { displayMode, ...rest } = action;
			if (displayMode === TYPE_SPLIT_DROPDOWN) {
				return (
					<ActionSplitDropdown key={index} {...rest} />
				);
			}

			return (
				<Action key={index} {...rest} />
			);
		});

	const renderSelectedCount = () =>
		<span className={classNames(css['tc-actionbar-selected-count'], 'tc-actionbar-selected-count')}>
			{selected} selected
		</span>;

	const renderActionBar = () => {
		const { left, right } = getActionsToRender();
		const actionBar = [];
		if (left) {
			actionBar.push(
				<div key={0} className={classNames(css['navbar-left'], 'navbar-left')}>
					{ selected > 0 ? renderSelectedCount() : null}
					{ renderActions(left) }
				</div>
			);
		}
		if (right) {
			actionBar.push(
				<div key={1} className={classNames(css['navbar-right'], 'navbar-right')}>
					{ selected > 0 && !left ? renderSelectedCount() : null}
					{ renderActions(right) }
				</div>
			);
		}
		return actionBar;
	};

	return (
		<nav className={classNames(css['tc-actionbar-container'], 'tc-actionbar-container', 'nav')}>
			{ renderActionBar() }
		</nav>
	);
}

const actionsShape = {
	left: PropTypes.arrayOf(PropTypes.oneOfType([
		PropTypes.shape(Action.propTypes),
		PropTypes.shape(ActionSplitDropdown.propTypes),
	])),
	right: PropTypes.arrayOf(PropTypes.oneOfType([
		PropTypes.shape(Action.propTypes),
		PropTypes.shape(ActionSplitDropdown.propTypes),
	])),
};

ActionBar.propTypes = {
	selected: PropTypes.number,
	actions: PropTypes.shape(actionsShape).isRequired,
	multiSelectActions: PropTypes.shape(actionsShape),
};

ActionBar.defaultProps = {
	actions: [],
};

export default ActionBar;
