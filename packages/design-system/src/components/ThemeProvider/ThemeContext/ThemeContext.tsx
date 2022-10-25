/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

export type ThemeContextProps = {
	theme?: any;
	switchTheme?: (theme: any) => void;
};

const ThemeContext = React.createContext<ThemeContextProps>({});

export default ThemeContext;
