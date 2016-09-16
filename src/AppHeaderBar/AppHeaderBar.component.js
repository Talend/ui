import React from 'react';
import { Link } from 'react-router';
import Dropdown from 'react-bootstrap/lib/Dropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import { api, Dispatcher, Icon } from 'react-cmf';
import { themr } from 'react-css-themr';
import { APP_HEADER_BAR } from '../identifiers';
// TODO: we have an issue during the build on this.


function getActions(context, id) {
	if (typeof id === 'string') {
		return api.action.getActionInfo(context, id);
	}
	return id;
}

/**
 * This is the main bar for webapp
 * @param {object} props   react props
 * @param {object} context react context
 */
function AppHeaderBar(props, context) {

	const actions = [];
	if (Array.isArray(props.actions)) {
		props.actions.forEach((action) => {
			actions.push(getActions(context, action));
		});
	}
	const userMenuActions = [];
	if (Array.isArray(props.userMenuActions)) {
		props.userMenuActions.forEach((action) => {
			userMenuActions.push(getActions(context, action));
		});
	}
	return (
		<div className={props.theme.appHeaderBar}>
			<div className={props.theme.brand}>
				<Link to="/" className={props.theme.link}>
					{props.logo ? <img
						className={props.theme.logo}
						src={props.logo.src}
						alt={props.logo.alt}
						style={props.logo.style}
					/> : null}
					{props.app}
				</Link>
			</div>
			<div className={props.theme.links}>
				{actions.map((action, i) => (
					<Dispatcher onClick={action} key={i}>
						<a className={props.theme.link}>
							<Icon name={action.icon} className="fa-fw" />
						</a>
					</Dispatcher>
				))}
				<Dropdown id="usermenu" pullRight>
					<Dropdown.Toggle useAnchor className="btn btn-inverse">
						<Icon name="icon-profile" className="fa-fw" />
						Micke TUCHEN
					</Dropdown.Toggle>
					<Dropdown.Menu >
						{userMenuActions.map((action, i) => (
							<Dispatcher onClick={action} key={i}>
								<MenuItem eventKey="1">
									<Icon name={action.icon} className="fa-fw" />
									{action.name}
								</MenuItem>
							</Dispatcher>
						))}
					</Dropdown.Menu>
				</Dropdown>
			</div>
		</div>
	);
}

AppHeaderBar.propTypes = {
	actions: React.PropTypes.arrayOf(React.PropTypes.string),
	userMenuActions: React.PropTypes.arrayOf(React.PropTypes.string),
	logo: React.PropTypes.shape({
		src: React.PropTypes.string,
		alt: React.PropTypes.string,
		style: React.PropTypes.string,
	}),
	app: React.PropTypes.string,
	theme: React.PropTypes.shape({
		appHeaderBar: React.PropTypes.string,
		brand: React.PropTypes.string,
		link: React.PropTypes.string,
		links: React.PropTypes.string,
		logo: React.PropTypes.string,
	}),
};
AppHeaderBar.contextTypes = {
	store: React.PropTypes.object,
};
export default themr(APP_HEADER_BAR, null)(AppHeaderBar);
export { AppHeaderBar };
