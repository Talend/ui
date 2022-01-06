import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Toggle from '../../Toggle';
import ThemeContext from '../ThemeContext';

import { dark, light } from '../../../themes';

const ThemeSwitcher = () => {
	const { switchTheme, theme } = useContext(ThemeContext);
	const [hasDarkMode, setDarkMode] = useState(false);
	const { t } = useTranslation();

	React.useEffect(() => {
		setDarkMode(theme === dark);
	}, [theme]);

	const toggle = () => {
		if (switchTheme) {
			switchTheme(hasDarkMode ? light : dark);
		}
	};

	return (
		<Toggle icon={hasDarkMode ? 'talend-eye-slash' : 'talend-eye'} onChange={toggle}>
			{t('THEME_TOGGLE_DARK_MODE', 'Toggle dark mode')}
		</Toggle>
	);
};

export default ThemeSwitcher;
