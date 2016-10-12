import React from 'react';
import classNames from 'classnames';
import { Button } from 'react-bootstrap';
import { themr } from 'react-css-themr';
import { SIDE_PANEL } from '../identifiers';

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
	const theme = props.theme || {};
	const actions = props.actions || [];

	const dockedClassName = { [theme.docked]: props.docked };
	const navClassName = classNames(theme['side-panel'], dockedClassName);
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
						<a
							href="#"
							title={`Display ${action.label}`}
							className={theme.link}
							onClick={action.onClick}
						>
							{ action.icon ? <i className={action.icon} /> : null }
							{ props.docked ? null : <span>{action.label}</span> }
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
}

SidePanel.propTypes = {
	theme: React.PropTypes.shape({
		'side-panel': React.PropTypes.string,
		'action-list': React.PropTypes.string,
		'toggle-btn': React.PropTypes.string,
		docked: React.PropTypes.string,
		link: React.PropTypes.string,
	}),
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

export default themr(SIDE_PANEL)(SidePanel);
