import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ButtonIconToggle } from '../../ButtonIcon';
import ThemeContext from '../ThemeContext';

import { dark, light } from '../../../themes';
import { I18N_DOMAIN_DESIGN_SYSTEM } from '../../constants';

const ThemeSwitcher = () => {
	const { switchTheme, theme } = useContext(ThemeContext);
	const [hasDarkMode, setDarkMode] = useState(false);
	const { t } = useTranslation(I18N_DOMAIN_DESIGN_SYSTEM);

	React.useEffect(() => {
		setDarkMode(theme === dark);
	}, [theme]);

	const toggle = () => {
		if (switchTheme) {
			switchTheme(hasDarkMode ? light : dark);
		}
	};

	return (
		<ButtonIconToggle
			isActive={hasDarkMode}
			icon={hasDarkMode ? 'talend-eye-slash' : 'talend-eye'}
			onClick={toggle}
		>
			{t('THEME_TOGGLE_DARK_MODE', 'Toggle dark mode')}
		</ButtonIconToggle>
	);
};

export default ThemeSwitcher;
