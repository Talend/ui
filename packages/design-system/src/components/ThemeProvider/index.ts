import { createGlobalStyle } from 'styled-components';

import ThemeSwitcher from './ThemeSwitcher';
import ThemeProvider from './ThemeProvider';

import { GlobalStyle } from './ThemeProvider.style';

const TalendThemeProvider = ThemeProvider as typeof ThemeProvider & {
	createGlobalStyle: typeof createGlobalStyle;
	GlobalStyle: typeof GlobalStyle;
	ThemeSwitcher: typeof ThemeSwitcher;
};

TalendThemeProvider.createGlobalStyle = createGlobalStyle;
TalendThemeProvider.GlobalStyle = GlobalStyle;
TalendThemeProvider.ThemeSwitcher = ThemeSwitcher;

export default TalendThemeProvider;
