import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import I18N_DOMAIN_COMPONENTS from '../constants';

import Action from '../Actions/Action';
import ActionDropdown from '../Actions/ActionDropdown';
import Inject from '../Inject';

import AppSwitcherCSSModule from './AppSwitcher.scss';
import { getTheme } from '../theme';

const theme = getTheme(AppSwitcherCSSModule);

export default function AppSwitcher({ label, isSeparated, onClick, getComponent, ...props }) {
	const { t } = useTranslation(I18N_DOMAIN_COMPONENTS);

	const Renderers = Inject.getAll(getComponent, { Action, ActionDropdown });

	const className = theme('tc-app-switcher-action', {
		separated: isSeparated,
	});

	let ActionComponent;
	let clickAction;
	let ariaLabel;
	if (props && props.items && props.items.length) {
		ActionComponent = Renderers.ActionDropdown;
		ariaLabel = t('APP_SWITCHER', {
			defaultValue: 'Switch to another application. Current application: {{appName}}',
			appName: label,
		});
	} else {
		ActionComponent = Renderers.Action;
		clickAction = onClick;
	}

	return (
		<ActionComponent
			bsStyle="link"
			className={theme('tc-app-switcher')}
			tooltipPlacement="bottom"
			label={label}
			aria-label={ariaLabel}
			onClick={clickAction}
			{...props}
		/>
	);
}

AppSwitcher.propTypes = {
	label: PropTypes.string,
	isSeparated: PropTypes.bool,
	items: PropTypes.arrayOf(PropTypes.object),
	onClick: PropTypes.func,
	getComponent: PropTypes.func,
};
