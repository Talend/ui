import React, { useContext, useState } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import defaultTheme, { dark, light } from '../../themes';
import tokens from '../../tokens';

import reset from './reset';
import Toggle from '../Toggle';

const GlobalStyle = createGlobalStyle`  
	${reset};
	
	html {
		/* 1rem = 10px */
		font-size: 62.5%;
	}
	
	body {
		margin: 0;
		padding: 0;
		font-family: 'Open Sans', sans-serif;
		font-size: 14px;
	}

	a {
		text-decoration: none;
	}
	
	.focus-outline-hidden *:focus {
		outline: none;
	}

	::selection {
		background-color: ${tokens.colors.coral[100]};
	}
`;

const ThemeContext = React.createContext({});

const TalendThemeProvider = ({ theme = defaultTheme, children }) => {
	const [selectedTheme, setSelectedTheme] = useState(theme);
	React.useEffect(() => {
		setSelectedTheme(theme);
	}, [theme]);
	const switchTheme = theme => setSelectedTheme(theme);
	return (
		<ThemeContext.Provider value={{ switchTheme, theme: selectedTheme }}>
			<ThemeProvider theme={selectedTheme}>{children}</ThemeProvider>
		</ThemeContext.Provider>
	);
};

const ThemeSwitcher = () => {
	const { switchTheme, theme } = useContext(ThemeContext);
	const [hasDarkMode, setDarkMode] = useState();
	React.useEffect(() => {
		setDarkMode(theme === dark);
	}, [theme]);
	function toggle() {
		switchTheme(hasDarkMode ? light : dark);
	}
	return (
		<Toggle icon={hasDarkMode ? 'talend-eye-slash' : 'talend-eye'} onChange={toggle}>
			Toggle dark mode
		</Toggle>
	);
};

TalendThemeProvider.createGlobalStyle = createGlobalStyle;
TalendThemeProvider.GlobalStyle = GlobalStyle;
TalendThemeProvider.ThemeSwitcher = ThemeSwitcher;

export default TalendThemeProvider;
