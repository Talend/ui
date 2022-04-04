import React from 'react';
import { DefaultTheme } from 'styled-components';

export type ThemeContextProps = {
	theme?: DefaultTheme;
	switchTheme?: (theme: DefaultTheme) => void;
};

const ThemeContext = React.createContext<ThemeContextProps>({});

export default ThemeContext;
