import ThemeContext from './ThemeContext';
import './ThemeProvider.module.scss';
// eslint-disable-next-line @talend/import-depth
import '@talend/design-tokens/dist/TalendDesignTokens.css';
import React, { PropsWithChildren, useContext, useState } from 'react';

export type ThemeProviderProps = PropsWithChildren<{
	theme: string;
}>;

const ThemeProvider = ({ theme = 'light', children }: ThemeProviderProps) => {
	const [selectedTheme, setSelectedTheme] = useState(theme);
	// Handle nested Providers: parent Provider doesn't have context, child does
	const context = useContext(ThemeContext);

	React.useEffect(() => {
		document.body.dataset.theme = selectedTheme === 'light' ? 'light' : 'dark';
	}, [selectedTheme]);

	React.useEffect(() => {
		setSelectedTheme(theme);
	}, [theme]);

	const switchTheme = (newTheme: string) => setSelectedTheme(newTheme);
	return (
		<ThemeContext.Provider value={context.theme ? context : { switchTheme, theme: selectedTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export default ThemeProvider;
