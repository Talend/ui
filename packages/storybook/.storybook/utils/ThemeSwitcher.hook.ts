import { useEffect, useState, useMemo } from 'react';

import { addons } from '@storybook/addons';

import { GLOBALS_UPDATED } from '@storybook/core-events';

import { create } from '@storybook/theming';
import { themeDark, themeLight } from '@talend/storybook-docs';

type ThemeKey = 'light' | 'dark';

// here `any` is `ThemeVarsPartial` from `@storybook/theming`
const themeByKey: Record<ThemeKey, any> = {
	light: themeLight,
	dark: themeDark,
};

export const useThemeSwitcher = (initialTheme?: ThemeKey) => {
	const [theme, setTheme] = useState<ThemeKey | undefined>(initialTheme);

	useEffect(() => {
		const channel = addons.getChannel();
		channel.on(GLOBALS_UPDATED, ({ globals: { theme } }) => setTheme(theme));
		return () => channel.removeAllListeners(GLOBALS_UPDATED);
	}, []);

	const sbTheme = useMemo(() => {
		if (theme) {
			return create(themeByKey[theme]);
		}
	}, [theme]);

	return {
		theme: sbTheme,
	};
};
