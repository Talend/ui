import React from 'react';
import { mount } from 'enzyme';

import { ThemeProvider } from '@talend/design-system';

// eslint-disable-next-line react/prop-types
const AllTheProviders = ({ children, ...props }) => {
	return <ThemeProvider>{React.cloneElement(children, props)}</ThemeProvider>;
};

export const mountWithTheme = component => mount(<AllTheProviders>{component}</AllTheProviders>);
