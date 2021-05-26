import React from 'react';
import { render } from '@testing-library/react';
import ThemeProvider from './src/components/ThemeProvider';

const AllTheProviders = ({ children }) => {
	return <ThemeProvider>{children}</ThemeProvider>;
};

const customRender = (ui, options) => {
	const result = render(ui, { wrapper: AllTheProviders, ...options });
	result.getElement = () => result.container.childNodes[0];
	return result;
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
