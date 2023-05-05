import PropTypes from 'prop-types';
import { useMemo } from 'react';
import omit from 'lodash/omit';
import { useTranslation } from 'react-i18next';

import Inject from '../../Inject';
import { Action } from '../../Actions';
import ActionIntercom from '../../ActionIntercom';
import Typeahead from '../../Typeahead';
import I18N_DOMAIN_COMPONENTS from '../../constants';
import { getTheme } from '../../theme';
import AppSwitcher from '../../AppSwitcher';

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
