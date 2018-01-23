import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { translate } from 'react-i18next';

import I18N_DOMAIN_COMPONENTS from '../constants';
import { DEFAULT_I18N } from '../translate';

import Action from '../Actions/Action';
import Inject from '../Inject';
import theme from './SidePanel.scss';

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
function SidePanel({
	id,
	selected,
	onSelect,
	actions,
	getComponent,
	components,
	docked,
	reverse,
	large,
	dockable,
	onToggleDock,
	t,
}) {
	const injected = Inject.all(getComponent, components);
	const navCSS = classNames(
		theme['tc-side-panel'],
		'tc-side-panel',
		{
			[theme.docked]: docked,
			[theme.large]: large,
			[theme.reverse]: reverse,
		},
	);
	const listCSS = classNames(
		'nav',
		'nav-pills',
		'nav-stacked',
		theme['tc-side-panel-list'],
		'tc-side-panel-list',
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
	const Components = Inject.getAll(getComponent, { Action });
	return (
		<nav id={id} className={navCSS} role="navigation" aria-expanded={!(dockable && docked)}>
			{dockable && (
				<div className={theme['toggle-btn']} title={toggleButtonTitle}>
					<Components.Action
						id={id && `${id}-toggle-dock`}
						bsStyle="link"
						onClick={onToggleDock}
						icon="talend-opener"
						label=""
						aria-controls={id}
					/>
				</div>
			)}
			{injected('before-actions')}
			{actions && (
				<ul className={listCSS}>
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
								className={classNames(theme['tc-side-panel-list-item'], 'tc-side-panel-list-item', {
									active: isSelected,
									[theme.active]: isSelected,
								})}
								{...a11y}
							>
								<Components.Action {...actionProps} />
							</li>
						);
					})}
				</ul>
			)}
			{injected('actions')}
		</nav>
	);
}

SidePanel.displayName = 'SidePanel';

SidePanel.defaultProps = {
	actions: [],
	reverse: false,
	large: false,
	dockable: true,
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
		components: PropTypes.object,
		getComponent: PropTypes.func,
		onSelect: PropTypes.func,
		onToggleDock: PropTypes.func,
		docked: PropTypes.bool,
		reverse: PropTypes.bool,
		large: PropTypes.bool,
		dockable: PropTypes.bool,
		selected: actionPropType,
		t: PropTypes.func,
	};
}

export default translate(I18N_DOMAIN_COMPONENTS, { i18n: DEFAULT_I18N })(SidePanel);
