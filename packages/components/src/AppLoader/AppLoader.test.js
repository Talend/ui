import React from 'react';
import { screen, render } from '@testing-library/react';
import { AppLoaderComponent } from './AppLoader.component';

describe('AppLoader', () => {
	it('should render', () => {
		render(<AppLoaderComponent />);
		expect(screen.getByLabelText('Loading application')).toBeInTheDocument();
	});
});
