import classNames from 'classnames';
import React from 'react';
import LinkDispatcher from '../LinkDispatcher';

/**
 * @param {object} props react props
 * @example
<SideMenu actions={[]}></SideMenu>
 */
function SideMenu(props) {
	const classes = classNames(
		'btn-group-vertical',
		props.theme.sideMenu
	);
	return (
		<div className={classes}>
			{props.actions.map(action => (
				<LinkDispatcher
					key={action}
					action={action}
					icon
					className={props.theme.sideMenuLink}
				/>
			))}
		</div>
	);
}

SideMenu.propTypes = {
	actions: React.PropTypes.array,
	theme: React.PropTypes.shape({
		sideMenu: React.PropTypes.string,
		sideMenuLink: React.PropTypes.string,
	}),
};

export default SideMenu;
