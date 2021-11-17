import React, { useContext, useState } from 'react';
import {
	DefaultTheme,
	ThemeProvider as StyledThemeProvider,
	ThemeProviderProps,
} from 'styled-components';

import ThemeContext from './ThemeContext';

import defaultTheme from '../../themes';

const ThemeProvider = ({ theme = defaultTheme, children }: ThemeProviderProps<any>) => {
	const [selectedTheme, setSelectedTheme] = useState(theme);
	// Handle nested Providers: parent Provider doesn't have context, child does
	const context = useContext(ThemeContext);

	React.useEffect(() => {
		setSelectedTheme(theme);
	}, [theme]);

	const switchTheme = (newTheme: DefaultTheme) => setSelectedTheme(newTheme);
	return (
		<ThemeContext.Provider value={context.theme ? context : { switchTheme, theme: selectedTheme }}>
			<StyledThemeProvider theme={context.theme || selectedTheme}>{children}</StyledThemeProvider>
		</ThemeContext.Provider>
	);
};

export default ThemeProvider;
