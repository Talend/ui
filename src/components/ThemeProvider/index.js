import React, { useContext, useState } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { hideVisually } from 'polished';
import 'modern-css-reset/dist/reset.min.css';

import Toggle from '../Toggle';
import defaultTheme, { dark, light } from '../../themes';
import tokens from '../../tokens';

import useGoogleFont from './useGoogleFont';

const GlobalStyle = createGlobalStyle`  
	html {
		/* 1rem = 10px */
		font-size: 62.5%;
	}
	
	body {
		margin: 0;
		padding: 0;
		font-family: 'Source Sans Pro', sans-serif;
		font-size: 14px;
		color: ${({ theme }) => theme.colors.textColor};
		background: ${({ theme }) => theme.colors.backgroundColor};
	}

	a {
		text-decoration: none;
	}
	
	.focus-outline-hidden *:focus {
		outline: none;
	}

	::selection {
		color: ${tokens.colors.gray[900]};
		background-color: ${tokens.colors.coral[100]};
	}
	
	.sr-only {
		${hideVisually()}
	}
`;

const ThemeContext = React.createContext({});

const TalendThemeProvider = ({ theme = defaultTheme, children }) => {
	useGoogleFont(
		'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&family=Inconsolata:wght@300;400;500;600;700;800;900&display=swap',
	);
	const [selectedTheme, setSelectedTheme] = useState(theme);
	React.useEffect(() => {
		setSelectedTheme(theme);
	}, [theme]);
	const switchTheme = newTheme => setSelectedTheme(newTheme);
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
