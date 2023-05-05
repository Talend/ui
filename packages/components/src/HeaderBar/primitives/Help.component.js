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

export function Help({ getComponent, t, ...props }) {
	const global = {
		bsStyle: 'link',
		icon: 'talend-question-circle',
		label: t('HEADERBAR_HELP', { defaultValue: 'Help' }),
		tooltipPlacement: 'bottom',
		...props,
	};
	const className = theme('tc-header-bar-action', 'tc-header-bar-help', 'separated');
	const Renderers = Inject.getAll(getComponent, { Action });

	return (
		<li role="presentation" className={className}>
			<Renderers.Action {...global} />
		</li>
	);
}
if (process.env.NODE_ENV !== 'production') {
	Help.propTypes = {
		getComponent: PropTypes.func,
		renderers: PropTypes.shape({
			ActionSplitDropdown: PropTypes.func,
			Action: PropTypes.func,
		}),
		t: PropTypes.func.isRequired,
	};
}
