import React from 'react';
import classNames from 'classnames';
import { Button } from 'react-bootstrap';
import theme from './SidePanel.scss';

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
 />
 *
 */
function SidePanel(props) {
	const actions = props.actions || [];

	const dockedClassName = { [theme.docked]: props.docked };
	const navClassName = classNames(theme['tc-side-panel'], dockedClassName, 'tc-side-panel');
	const listClassName = classNames('nav nav-pills nav-stacked', theme['action-list']);

	return (
		<nav className={navClassName}>
			<Button
				className={theme['toggle-btn']}
				bsStyle="link"
				onClick={props.onToggleDock}
				aria-hidden="true"
				title="Toggle side panel"
			>
				<i className="fa fa-arrow-left" />
			</Button>
			<ul className={listClassName}>
				{actions.map(action => (
					<li key={action.label}>
						<Button
							title={`Display ${action.label}`}
							bsStyle="link"
							role="link"
							className={theme.link}
							onClick={action.onClick}
						>
							{ action.icon ? <i className={action.icon} /> : null }
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
};

export default SidePanel;
