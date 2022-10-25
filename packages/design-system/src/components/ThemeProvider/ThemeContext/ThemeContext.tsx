/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

export type ThemeContextProps = {
	theme?: string;
	switchTheme?: (theme: string) => void;
};

const ThemeContext = React.createContext<ThemeContextProps>({});

export default ThemeContext;
