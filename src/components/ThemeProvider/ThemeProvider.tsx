import React, { useState } from 'react';
import {
	DefaultTheme,
	ThemeProvider as StyledThemeProvider,
	ThemeProviderProps,
} from 'styled-components';

import ThemeContext from './ThemeContext';

import defaultTheme from '../../themes';

const ThemeProvider = ({ theme = defaultTheme, children }: ThemeProviderProps<any>) => {
	const [selectedTheme, setSelectedTheme] = useState(theme);

	React.useEffect(() => {
		setSelectedTheme(theme);
	}, [theme]);

	const switchTheme = (newTheme: DefaultTheme) => setSelectedTheme(newTheme);

	return (
		<ThemeContext.Provider value={{ switchTheme, theme: selectedTheme }}>
			<StyledThemeProvider theme={selectedTheme}>{children}</StyledThemeProvider>
		</ThemeContext.Provider>
	);
};

export default ThemeProvider;
