import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { Action } from '../Actions';
import theme from './ActionList.scss';

/**
 * return the formatted action id
 * if there is no action id, it is generated from the action label
 * @param  {string} id        sidepanel id
 * @param  {string} action    current action
 * @return {string}            formatted id
 */
function getActionId(id, action) {
	if (action.id || action.label) {
		const actionId =
			action.id ||
			action.label
				.toLowerCase()
				.split(' ')
				.join('-');
		return id && `${id}-nav-${actionId}`;
	}
	return undefined;
}

function ActionList(props) {
	const { className, actions, selected, onSelect, id } = props;

	const isActionSelected = action => {
		if (selected) {
			return action === selected;
		}
		return action.active;
	};

	return (
		<ul className={classNames(className, 'nav')}>
			{actions.map(action => {
				const a11y = {
					role: 'presentation',
				};
				const extra = {};
				const isSelected = isActionSelected(action);

				if (isSelected) {
					// @see https://tink.uk/using-the-aria-current-attribute/
					a11y['aria-current'] = true;
				}
				if (onSelect) {
					extra.onClick = event => {
						onSelect(event, action);
						if (action.onClick) {
							action.onClick(event);
						}
					};
				}

				const actionProps = Object.assign(
					{},
					action,
					{
						active: undefined, // active scope is only the list item
						id: getActionId(id, action),
						bsStyle: 'link',
						role: 'link',
					},
					extra,
				);

				return (
					<li
						title={action.label}
						key={action.key || action.label}
						className={classNames(theme['tc-action-list-item'], 'tc-action-list-item', {
							active: isSelected,
							[theme.active]: isSelected,
						})}
						{...a11y}
					>
						<Action {...actionProps} />
					</li>
				);
			})}
		</ul>
	);
}

ActionList.displayName = 'ActionList';

ActionList.defaultProps = {
	actions: [],
};

if (process.env.NODE_ENV !== 'production') {
	const actionPropType = PropTypes.shape({
		id: PropTypes.string,
		active: PropTypes.bool,
		icon: PropTypes.string,
		key: PropTypes.string,
		label: PropTypes.string,
		onClick: PropTypes.func,
	});

	ActionList.propTypes = {
		id: PropTypes.string,
		actions: PropTypes.arrayOf(actionPropType),
		onSelect: PropTypes.func,
		selected: actionPropType,
		className: PropTypes.string,
	};
}

export default ActionList;
