import ThemeSwitcher from './ThemeSwitcher';
import ThemeProvider from './ThemeProvider';

const TalendThemeProvider = ThemeProvider as typeof ThemeProvider & {
	ThemeSwitcher: typeof ThemeSwitcher;
};

TalendThemeProvider.ThemeSwitcher = ThemeSwitcher;

export default TalendThemeProvider;
