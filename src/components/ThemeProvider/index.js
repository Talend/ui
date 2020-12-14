import React from 'react';
import { css, createGlobalStyle, ThemeProvider } from 'styled-components';
import { normalize } from 'polished';

import defaultTheme from '../../themes';
import tokens from '../../tokens';

const globalStyle = ({ theme }) => `  
	* { border: 1px solid cyan; }
`;

const TalendThemeProvider = ({ theme = defaultTheme, children }) => (
	<ThemeProvider theme={theme}>{children}</ThemeProvider>
);

TalendThemeProvider.createGlobalStyle = createGlobalStyle;
TalendThemeProvider.globalStyle = globalStyle;

export default TalendThemeProvider;
