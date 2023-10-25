import ThemeSwitcher from './ThemeSwitcher';
import { ThemeProvider as BaseThemeProvider, ThemeProviderProps } from './ThemeProvider';

export const ThemeProvider = BaseThemeProvider as typeof BaseThemeProvider & {
	ThemeSwitcher: typeof ThemeSwitcher;
};

ThemeProvider.ThemeSwitcher = ThemeSwitcher;

export type { ThemeProviderProps };
