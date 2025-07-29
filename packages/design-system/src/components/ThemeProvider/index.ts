import { ThemeProvider as BaseThemeProvider, ThemeProviderProps } from './ThemeProvider';
import ThemeSwitcher from './ThemeSwitcher';

export const ThemeProvider = BaseThemeProvider as typeof BaseThemeProvider & {
	ThemeSwitcher: typeof ThemeSwitcher;
};

ThemeProvider.ThemeSwitcher = ThemeSwitcher;

export type { ThemeProviderProps };
