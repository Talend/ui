import { PropsWithChildren, useContext, useLayoutEffect, useState } from 'react';

import 'modern-css-reset/dist/reset.min.css';
import 'typeface-inconsolata/index.css';
import 'typeface-source-sans-pro/index.css';

// eslint-disable-next-line @talend/import-depth
import '@talend/design-tokens/dist/TalendDesignTokens.css';

import ThemeContext from './ThemeContext';

import './ThemeProvider.scss';

export type ThemeProviderProps = PropsWithChildren<{
	theme?: string;
	tokensOverride?: Record<string, string | number>;
}>;

export const ThemeProvider = ({
	theme = 'light',
	children,
	tokensOverride,
}: ThemeProviderProps) => {
	const [selectedTheme, setSelectedTheme] = useState(theme);
	// Handle nested Providers: parent Provider doesn't have context, child does
	const context = useContext(ThemeContext);

	useLayoutEffect(() => {
		document.body.dataset.theme = selectedTheme;
	}, [selectedTheme]);

	useLayoutEffect(() => {
		setSelectedTheme(theme);
	}, [theme]);

	useLayoutEffect(() => {
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
