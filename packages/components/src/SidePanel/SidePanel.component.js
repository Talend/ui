import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { translate } from 'react-i18next';

import I18N_DOMAIN_COMPONENTS from '../constants';
import { DEFAULT_I18N } from '../translate';

import Action from '../Actions/Action';

import theme from './SidePanel.scss';

/**
 * return the formatted action id
 * if there is no action id, it is generated from the action label
 * @param  {string} id		sidepanel id
 * @param  {string} action 	current action
 * @return {string}        	formatted id
 */
function getActionId(id, action) {
	const actionId =
		action.id ||
		action.label
			.toLowerCase()
			.split(' ')
			.join('-');
	return id && `${id}-nav-${actionId}`;
}

/**
 * This component aims to display links as a menu.
 * @param {object} props react props
 *
 @example
 const actions = [
	 { label: 'Preparations', icon: 'fa fa-asterisk', onClick: action('Preparations clicked') },
	 { label: 'Datasets', icon: 'fa fa-file-excel-o', onClick: action('Datasets clicked') },
	 { label: 'Favorites', icon: 'fa fa-star', onClick: action('Favorites clicked') }
 ];
 <SidePanel
	 actions={ actions }
	 docked={ isDocked }
	 selected= { selectedItem }
	 onToggleDock={ action('Toggle dock clicked') }
	 onSelect={ action('onItemSelect') }
 />
 *
 */
function SidePanel({ id, selected, onSelect, actions, docked, onToggleDock, t, renderers }) {
	const dockedCSS = { [theme.docked]: docked };
	const navCSS = classNames(theme['tc-side-panel'], dockedCSS, 'tc-side-panel');
	const listCSS = classNames(
		'nav nav-pills nav-inverse nav-stacked',
		'tc-side-panel-list',
		theme['action-list'],
	);
	const isActionSelected = action => {
		if (selected) {
			return action === selected;
		}
		return action.active;
	};

	const expandLabel = t('SIDEPANEL_EXPAND', { defaultValue: 'Expand' });
	const collapseTitle = t('SIDEPANEL_COLLAPSE', { defaultValue: 'Collapse' });
	const toggleButtonTitle = docked ? expandLabel : collapseTitle;

	return (
		<nav className={navCSS} role="navigation">
			<ul className={listCSS}>
				<li className={theme['toggle-btn']} title={toggleButtonTitle}>
					<Action
						id={id && `${id}-toggle-dock`}
						className={theme.link}
						bsStyle="link"
						onClick={onToggleDock}
						icon="talend-opener"
						label=""
					/>
				</li>
				{actions.map(action => {
					const a11y = {};
					const extra = {};
					const isSelected = isActionSelected(action);

					if (isSelected) {
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
							className: classNames(theme.link, action.className),
						},
						extra,
					);
					return (
						<li
							title={action.label}
							key={action.key || action.label}
							className={classNames('tc-side-panel-list-item', {
								active: isSelected,
							})}
							{...a11y}
						>
							<renderers.Action {...actionProps} />
						</li>
					);
				})}
			</ul>
		</nav>
	);
}

SidePanel.defaultProps = {
	actions: [],
	renderers: { Action },
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

	SidePanel.propTypes = {
		id: PropTypes.string,
		actions: PropTypes.arrayOf(actionPropType),
		onSelect: PropTypes.func,
		onToggleDock: PropTypes.func,
		docked: PropTypes.bool,
		selected: actionPropType,
		t: PropTypes.func,
		renderers: PropTypes.shape({
			Action: PropTypes.node,
		}),
	};
}

export default translate(I18N_DOMAIN_COMPONENTS, { i18n: DEFAULT_I18N })(SidePanel);
