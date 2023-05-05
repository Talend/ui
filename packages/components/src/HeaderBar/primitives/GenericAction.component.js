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

export function GenericAction({ getComponent, ...props }) {
	const global = {
		bsStyle: 'link',
		tooltipPlacement: 'bottom',
		...props,
	};
	const className = theme('tc-header-bar-action', 'tc-header-bar-generic-action', 'separated');
	const Renderers = Inject.getAll(getComponent, { Action });

	return (
		<li role="presentation" className={className}>
			<Renderers.Action {...global} />
		</li>
	);
}
if (process.env.NODE_ENV !== 'production') {
	GenericAction.propTypes = {
		getComponent: PropTypes.func,
		renders: PropTypes.shape({
			Action: PropTypes.func,
		}),
	};
}
