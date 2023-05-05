import PropTypes from 'prop-types';
import { useMemo } from 'react';
import omit from 'lodash/omit';
import { useTranslation } from 'react-i18next';

import Inject from '../Inject';
import Action from '../Actions/Action';
import ActionIntercom from '../ActionIntercom';
import ActionDropdown from '../Actions/ActionDropdown';
import Typeahead from '../Typeahead';
import I18N_DOMAIN_COMPONENTS from '../constants';
import { getTheme } from '../theme';
import AppSwitcher from '../AppSwitcher';

import headerBarCssModule from './HeaderBar.module.scss';

const theme = getTheme(headerBarCssModule);

export function Information({ getComponent, t, ...props }) {
	const global = {
		bsStyle: 'link',
		icon: 'talend-info-circle',
		label: t('HEADERBAR_INFO', { defaultValue: 'Information' }),
		tooltipPlacement: 'bottom',
		...props,
	};
	const className = theme('tc-header-bar-action', 'separated');
	const Renderers = Inject.getAll(getComponent, { Action, ActionDropdown });

	return (
		<li role="presentation" className={className}>
			{props.items && props.items.length ? (
				<Renderers.ActionDropdown pullRight noCaret hideLabel {...global} />
			) : (
				<Renderers.Action hideLabel {...global} />
			)}
		</li>
	);
}

if (process.env.NODE_ENV !== 'production') {
	Information.propTypes = {
		getComponent: PropTypes.func,
		items: PropTypes.array,
		renderers: PropTypes.shape({
			ActionSplitDropdown: PropTypes.func,
			Action: PropTypes.func,
		}),
		t: PropTypes.func.isRequired,
	};
}
