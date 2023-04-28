/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from 'react';

export type ThemeContextProps = {
	theme?: string;
	switchTheme?: (theme: string) => void;
};

const ThemeContext = createContext<ThemeContextProps>({});

export default ThemeContext;
