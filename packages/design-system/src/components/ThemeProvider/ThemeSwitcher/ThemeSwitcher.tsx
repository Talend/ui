import React, { useContext, useState } from 'react';

import Toggle from '../../Toggle';
import ThemeContext from '../ThemeContext';

import { dark, light } from '../../../themes';

const ThemeSwitcher = () => {
	const { switchTheme, theme } = useContext(ThemeContext);
	const [hasDarkMode, setDarkMode] = useState(false);

	React.useEffect(() => {
		setDarkMode(theme === dark);
	}, [theme]);

	function toggle() {
		if (switchTheme) {
			switchTheme(hasDarkMode ? light : dark);
		}
	}

	return (
		<Toggle icon={hasDarkMode ? 'talend-eye-slash' : 'talend-eye'} onChange={toggle}>
			Toggle dark mode
		</Toggle>
	);
};

export default ThemeSwitcher;
