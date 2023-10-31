import ThemeContext from './ThemeContext';
import './ThemeProvider.scss';
// eslint-disable-next-line @talend/import-depth
import '@talend/design-tokens/dist/TalendDesignTokens.css';
import { useEffect, PropsWithChildren, useContext, useState } from 'react';

import 'typeface-source-sans-pro/index.css';
import 'typeface-inconsolata/index.css';
import 'modern-css-reset/dist/reset.min.css';

export type ThemeProviderProps = PropsWithChildren<{
	theme?: string;
}>;

export const ThemeProvider = ({ theme = 'light', children }: ThemeProviderProps) => {
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
			{children}
		</ThemeContext.Provider>
	);
};
