import React from 'react';
import { themr } from 'react-css-themr';
import classNames from 'classnames';
import { APP_HEADER_BAR } from '../../identifiers';

/**
 * The top bar is the place where the user finds useful information and tools
 * to describe the application
 * the logo, the name of the application, an optionnal global search,
 * few icons for feedback & onboarding and a menu to access logout
 * and profile information.
 * @param {object} props   react props
 */
function AppHeaderBar(props) {
	let logo = null;
	if (props.logo) {
		logo = (<img
			className={props.theme.logo}
			src={props.logo.src}
			alt={props.logo.alt}
			style={props.logo.style}
		/>);
	}
	let link = (
		<a href="#/" className={props.theme.link}>
			{logo} {props.app}
		</a>
	);
	if (props.link) {
		link = (
			<props.link>{logo} {props.app}</props.link>
		);
	}
	const wrapper = classNames(props.theme.appHeaderBar, 'navbar');
	const brand = classNames(props.theme.brand, 'navbar-brand');
	return (
		<div className={wrapper}>
			<div className={brand}>
				{link}
			</div>
			{props.children}
		</div>
	);
}

AppHeaderBar.propTypes = {
	logo: React.PropTypes.shape({
		src: React.PropTypes.string,
		alt: React.PropTypes.string,
		style: React.PropTypes.object,
	}),
	app: React.PropTypes.string,
	theme: React.PropTypes.shape({
		appHeaderBar: React.PropTypes.string,
		brand: React.PropTypes.string,
		link: React.PropTypes.string,
		logo: React.PropTypes.string,
	}),
};
export default themr(APP_HEADER_BAR)(AppHeaderBar);
export { AppHeaderBar as PureAppHeaderBar };
