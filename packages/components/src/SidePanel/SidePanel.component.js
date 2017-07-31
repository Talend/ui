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
function SidePanel(props) {
	const { selected, onSelect } = props;
	const actions = props.actions || [];

	const dockedCSS = { [theme.docked]: props.docked };
	const navCSS = classNames(
		theme['tc-side-panel'],
		dockedCSS,
		'tc-side-panel',
	);
	const listCSS = classNames(
		'nav nav-pills nav-inverse nav-stacked',
		'tc-side-panel-list',
	);
	const isActionSelected = (action) => {
		if (selected) {
			return action === selected;
		}
		return action.active;
	};

	return (
		<nav className={navCSS}>
			<ul className={listCSS}>
				<li className={theme['toggle-btn']}>
					<Action
						id={props.id && `${props.id}-toggle-dock`}
						className={theme.link}
						bsStyle="link"
						onClick={props.onToggleDock}
						label="Toggle side panel"
						icon="talend-arrow-left"
						hideLabel
						tooltipPlacement={props.tooltipPlacement}
					/>
				</li>
				{actions.map(action => (
					<li
						key={action.key || action.label}
						className={classNames(
							'tc-side-panel-list-item',
							{ active: isActionSelected(action) },
						)}
					>
						<Action
							id={props.id && `${props.id}-nav-${action.label.toLowerCase().split(' ').join('-')}`}
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
							hideLabel={props.docked}
							tooltipPlacement={props.tooltipPlacement}
						/>
					</li>
				))}
			</ul>
		</nav>
	);
}

const actionPropType = React.PropTypes.shape({
	active: React.PropTypes.bool,
	icon: React.PropTypes.string,
	key: React.PropTypes.string,
	label: React.PropTypes.string,
	onClick: React.PropTypes.func,
});

SidePanel.propTypes = {
	id: React.PropTypes.string,
	actions: React.PropTypes.arrayOf(actionPropType),
	onSelect: React.PropTypes.func,
	onToggleDock: React.PropTypes.func,
	docked: React.PropTypes.bool,
	selected: actionPropType,
	tooltipPlacement: React.PropTypes.string,
};

SidePanel.defaultProps = {
	tooltipPlacement: 'right',
};
export default SidePanel;
