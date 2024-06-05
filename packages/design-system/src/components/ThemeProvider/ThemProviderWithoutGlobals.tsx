import { PropsWithChildren, useContext, useEffect, useState } from 'react';

// eslint-disable-next-line @talend/import-depth
import '@talend/design-tokens/dist/TalendDesignTokens.css';

import ThemeContext from './ThemeContext';

export type ThemeProviderProps = PropsWithChildren<{
	theme?: string;
	tokensOverride?: Record<string, string | number>;
}>;

export const ThemProviderWithoutGlobals = ({
	theme = 'light',
	children,
	tokensOverride,
}: ThemeProviderProps) => {
	const [selectedTheme, setSelectedTheme] = useState(theme);
	// Handle nested Providers: parent Provider doesn't have context, child does
	const context = useContext(ThemeContext);

	useEffect(() => {
		document.body.dataset.theme = selectedTheme;
	}, [selectedTheme]);

	useEffect(() => {
		setSelectedTheme(theme);
	}, [theme]);

	useEffect(() => {
		if (tokensOverride) {
			Object.keys(tokensOverride).forEach(key => {
				document.body.style.setProperty(key, tokensOverride[key].toString());
			});
		}
	}, [tokensOverride]);

	const switchTheme = (newTheme: string) => setSelectedTheme(newTheme);
	return (
		<ThemeContext.Provider value={context.theme ? context : { switchTheme, theme: selectedTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
