import React from 'react';
import classNames from 'classnames';
import { Button } from 'react-bootstrap';
import theme from './SidePanel.scss';
import Icon from '../Icon';

/* eslint-disable jsx-a11y/href-no-hash */

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
	 onToggleDock={ action('Toggle dock clicked') }
	 docked={ isDocked }
     toggleIcon={ 'fa fa-arrow-left' }
 />
 *
 */
function SidePanel(props) {
	const actions = props.actions || [];

	const dockedCSS = { [theme.docked]: props.docked };
	const navCSS = classNames(
		theme['tc-side-panel'],
		dockedCSS,
		'tc-side-panel'
	);
	const listCSS = classNames(
		'nav nav-pills nav-inverse nav-stacked',
		'tc-side-panel-list',
		theme['action-list']
	);

	return (
		<nav className={navCSS}>
			<Button
				className={theme['toggle-btn']}
				bsStyle="link"
				onClick={props.onToggleDock}
				aria-hidden="true"
				title="Toggle side panel"
			>
				<Icon name={props.toggleIcon || 'talend-arrow-left'} />
			</Button>
			<ul className={listCSS}>
				{actions.map(action => (
					<li
						key={action.label}
						className={classNames(
							'tc-side-panel-list-item',
							{ active: !!action.active }
							)}
					>
						<Button
							title={`Display ${action.label}`}
							bsStyle="link"
							role="link"
							className={theme.link}
							onClick={action.onClick}
						>
							{ action.icon ? <Icon name={action.icon} /> : null }
							{ props.docked ? null : <span>{action.label}</span> }
						</Button>
					</li>
				))}
			</ul>
		</nav>
	);
}

SidePanel.propTypes = {
	actions: React.PropTypes.arrayOf(
		React.PropTypes.shape({
			label: React.PropTypes.string,
			icon: React.PropTypes.string,
			onClick: React.PropTypes.func,
		})
	),
	onToggleDock: React.PropTypes.func,
	docked: React.PropTypes.bool,
	toggleIcon: React.PropTypes.string,
};

export default SidePanel;
