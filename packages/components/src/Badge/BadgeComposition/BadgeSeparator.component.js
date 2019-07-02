import React from 'react';
import badgeCssModule from '../Badge.scss';
import { getTheme } from '../../theme';

const theme = getTheme(badgeCssModule);

const BadgeSeparator = () => <span className={theme('tc-badge-separator')} />;

export default BadgeSeparator;
