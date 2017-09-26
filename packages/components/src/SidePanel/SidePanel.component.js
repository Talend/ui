import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import Action from '../Actions/Action';

import theme from './SidePanel.scss';

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
	actions = [],
	docked = true,
	onToggleDock,
	expandTitle = 'Expand',
	collapseTitle = 'Collapse',
}) {
	const dockedCSS = { [theme.docked]: docked };
	const navCSS = classNames(
		theme['tc-side-panel'],
		dockedCSS,
		'tc-side-panel',
	);
	const listCSS = classNames(
		'nav nav-pills nav-inverse nav-stacked',
		'tc-side-panel-list',
		theme['action-list'],
	);
	const isActionSelected = (action) => {
		if (selected) {
			return action === selected;
		}
		return action.active;
	};

	const toggleButtonTitle = docked ? expandTitle : collapseTitle;

	return (
		<nav className={navCSS}>
			<button className={theme['background-overlay']} onClick={onToggleDock} />
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
				{actions.map(action => (
					<li
						title={action.label}
						key={action.key || action.label}
						className={classNames(
							'tc-side-panel-list-item',
							{ active: isActionSelected(action) },
						)}
					>
						<Action
							id={id && `${id}-nav-${action.label.toLowerCase().split(' ').join('-')}`}
							bsStyle="link"
							role="link"
							className={theme.link}
							onClick={(event) => {
								if (onSelect) {
									onSelect(event, action);
								}
								if (action.onClick) {
									action.onClick(event);
								}
							}}
							label={action.label}
							icon={action.icon}
						/>
					</li>
				))}
			</ul>
		</nav>
	);
}

const actionPropType = PropTypes.shape({
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
	expandTitle: PropTypes.string,
	collapseTitle: PropTypes.string,
};

export default SidePanel;
