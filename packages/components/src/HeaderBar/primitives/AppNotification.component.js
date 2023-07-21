import PropTypes from 'prop-types';

import Inject from '../../Inject';
import { Action } from '../../Actions';
import { getTheme } from '../../theme';

import headerBarCssModule from '../HeaderBar.module.scss';

const theme = getTheme(headerBarCssModule);

export function AppNotification({ getComponent, hasUnread, t, ...props }) {
	const className = theme('tc-header-bar-action', 'separated');

	let icon;
	let label;
	if (hasUnread) {
		icon = 'talend-bell-notification';
		label = t('HEADERBAR_NOTIFICATION_UNREAD', {
			defaultValue: 'Notifications (you have unread notifications)',
		});
	} else {
		icon = 'talend-bell';
		label = t('HEADERBAR_NOTIFICATION', {
			defaultValue: 'Notifications (you have no unread notifications)',
		});
	}

	const global = {
		bsStyle: 'link',
		hideLabel: true,
		icon,
		label,
		tooltipPlacement: 'bottom',
		...props,
	};
	const Renderers = Inject.getAll(getComponent, { Action });

	return (
		<li role="presentation" className={className}>
			<Renderers.Action {...global} />
		</li>
	);
}

AppNotification.propTypes = {
	getComponent: PropTypes.func,
	hasUnread: PropTypes.bool,
	renderers: PropTypes.shape({ Action: PropTypes.func }),
	t: PropTypes.func.isRequired,
};
