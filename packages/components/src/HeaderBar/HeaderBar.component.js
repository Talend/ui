import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { useTranslation } from 'react-i18next';

import Inject from '../Inject';
import I18N_DOMAIN_COMPONENTS from '../constants';
import { getTheme } from '../theme';
import AppSwitcher from '../AppSwitcher';

import { Logo } from './primitives/Logo.component';
import { Environment } from './primitives/Environment.component';
import { CallToAction } from './primitives/CallToAction.component';
import { GenericAction } from './primitives/GenericAction.component';
import { Search } from './primitives/Search.component';
import { User } from './primitives/User.component';
import { Information } from './primitives/Information.component';
import { Help } from './primitives/Help.component';
import { AppNotification } from './primitives/AppNotification.component';
import { Intercom } from './primitives/Intercom.component';

import headerBarCssModule from './HeaderBar.module.scss';

const theme = getTheme(headerBarCssModule);

function HeaderBar(props) {
	const { t } = useTranslation(I18N_DOMAIN_COMPONENTS);

	const Components = Inject.getAll(props.getComponent, {
		Logo,
		Environment,
		CallToAction,
		GenericAction,
		Search,
		User,
		Information,
		Help,
		AppNotification,
		Intercom,
	});

	const AppSwitcherComponent =
		props.AppSwitcher || Inject.get(props.getComponent, 'AppSwitcher', AppSwitcher);

	let notificationCenter;
	const { NotificationCenter } = props;
	if (NotificationCenter) {
		notificationCenter = <NotificationCenter />;
	} else if (props.notification) {
		// Deprecated: use @talend ee
		notificationCenter = (
			<Components.AppNotification getComponent={props.getComponent} {...props.notification} t={t} />
		);
	}

	let intercom;
	const { Intercom: CustomIntercom } = props;
	if (CustomIntercom) {
		intercom = <CustomIntercom />;
	} else if (props.intercom) {
		// Deprecated use @talend ee
		intercom = <Components.Intercom getComponent={props.getComponent} {...props.intercom} />;
	}

	return (
		<nav className={theme('tc-header-bar', 'navbar')}>
			<ul className={theme('tc-header-bar-actions', 'navbar-nav')}>
				{props.logo && <Components.Logo getComponent={props.getComponent} {...props.logo} t={t} />}
				<AppSwitcherComponent {...props.brand} {...props.products} isSeparated={!!props.env} />
				{props.env && <Components.Environment getComponent={props.getComponent} {...props.env} />}
			</ul>
			<ul className={theme('tc-header-bar-actions', 'navbar-nav', 'right')}>
				{props.genericAction && (
					<Components.GenericAction getComponent={props.getComponent} {...props.genericAction} />
				)}
				{props.callToAction && (
					<Components.CallToAction getComponent={props.getComponent} {...props.callToAction} />
				)}
				{props.search && <Components.Search getComponent={props.getComponent} {...props.search} />}
				{notificationCenter && (
					<li
						role="presentation"
						className={theme(
							'tc-header-bar-notification-center',
							'tc-header-bar-action',
							'separated',
						)}
					>
						{notificationCenter}
					</li>
				)}
				{intercom && (
					<li
						role="presentation"
						className={theme('tc-header-bar-intercom', 'tc-header-bar-action', 'separated')}
					>
						{intercom}
					</li>
				)}
				{props.help && <Components.Help getComponent={props.getComponent} {...props.help} t={t} />}
				{!props.user && props.information && (
					<Components.Information getComponent={props.getComponent} {...props.information} t={t} />
				)}
				{props.user && <Components.User getComponent={props.getComponent} {...props.user} t={t} />}
			</ul>
		</nav>
	);
}

HeaderBar.Logo = Logo;
HeaderBar.Environment = Environment;
HeaderBar.CallToAction = CallToAction;
HeaderBar.Search = Search;
HeaderBar.GenericAction = GenericAction;
HeaderBar.Help = Help;
HeaderBar.Information = Information;
HeaderBar.User = User;
HeaderBar.displayName = 'HeaderBar';

HeaderBar.propTypes = {
	AppSwitcher: PropTypes.func,
	Intercom: PropTypes.func,
	NotificationCenter: PropTypes.func,
	logo: PropTypes.shape(omit(Logo.propTypes, 't')),
	brand: PropTypes.shape({
		isSeparated: PropTypes.bool,
		renderers: PropTypes.shape({
			Action: PropTypes.func,
		}),
		icon: PropTypes.string,
		iconUrl: PropTypes.string,
	}),
	env: PropTypes.shape(Environment.propTypes),
	callToAction: PropTypes.shape(CallToAction.propTypes),
	genericAction: PropTypes.shape(GenericAction.propTypes),
	search: PropTypes.shape(Search.propTypes),
	help: PropTypes.shape(omit(Help.propTypes, 't')),
	information: PropTypes.shape(omit(Information.propTypes, 't')),
	intercom: PropTypes.shape(Intercom.propTypes),
	user: PropTypes.shape(User.propTypes),
	notification: PropTypes.shape(omit(AppNotification.propTypes, 't')),
	products: PropTypes.shape({
		items: PropTypes.array,
		onSelect: PropTypes.func,
	}),
	getComponent: PropTypes.func,
	t: PropTypes.func,
};

export default HeaderBar;
