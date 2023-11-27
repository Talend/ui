import { PropsWithChildren, useContext, useEffect, useState } from 'react';

import 'modern-css-reset/dist/reset.min.css';
import 'typeface-inconsolata/index.css';
import 'typeface-source-sans-pro/index.css';

// eslint-disable-next-line @talend/import-depth
import '@talend/design-tokens/dist/TalendDesignTokens.css';

import ThemeContext from './ThemeContext';

import './ThemeProvider.scss';

export type ThemeProviderProps = PropsWithChildren<{
	theme?: string;
	tokensOverride?: React.CSSProperties;
}>;

export const ThemeProvider = ({
	theme = 'light',
	children,
	tokensOverride,
}: ThemeProviderProps) => {
	const [selectedTheme, setSelectedTheme] = useState(theme);
	// Handle nested Providers: parent Provider doesn't have context, child does
	const context = useContext(ThemeContext);

	useEffect(() => {
		document.body.dataset.theme = selectedTheme === 'light' ? 'light' : 'dark';
	}, [selectedTheme]);

	useEffect(() => {
		setSelectedTheme(theme);
	}, [theme]);

	const switchTheme = (newTheme: string) => setSelectedTheme(newTheme);
	return (
		<ThemeContext.Provider value={context.theme ? context : { switchTheme, theme: selectedTheme }}>
			{tokensOverride ? <div style={tokensOverride}>{children}</div> : children}
		</ThemeContext.Provider>
	);
};
