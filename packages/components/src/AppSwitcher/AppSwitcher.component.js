import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import I18N_DOMAIN_COMPONENTS from '../constants';

import Action from '../Actions/Action';
import ActionDropdown from '../Actions/ActionDropdown';

import AppSwitcherCSSModule from './AppSwitcher.scss';
import { getTheme } from '../theme';

const theme = getTheme(AppSwitcherCSSModule);

export default function AppSwitcher({ label, isSeparated, ...props }) {
	const { t } = useTranslation(I18N_DOMAIN_COMPONENTS);
	const className = theme('tc-header-bar-action', {
		separated: isSeparated,
	});

	let ActionComponent;
	let clickAction;
	let ariaLabel;
	if (props && props.items && props.items.length) {
		ActionComponent = ActionDropdown;
		ariaLabel = t('APP_SWITCHER', {
			defaultValue: 'Switch to another application. Current application: {{appName}}',
			appName: label,
		});
	} else {
		ActionComponent = Action;
		clickAction = props.onClick;
	}

	return (
		<li role="presentation" className={className}>
			<span role="heading">
				<ActionComponent
					bsStyle="link"
					className={theme('tc-header-bar-brand')}
					tooltipPlacement="bottom"
					label={label}
					{...props}
					aria-label={ariaLabel}
					onClick={clickAction}
				/>
			</span>
		</li>
	);
}

AppSwitcher.propTypes = {
	label: PropTypes.string,
	isSeparated: PropTypes.bool,
	items: PropTypes.arrayOf(PropTypes.object),
	onClick: PropTypes.func,
	renderers: PropTypes.shape({
		Action: PropTypes.func,
	}),
};
