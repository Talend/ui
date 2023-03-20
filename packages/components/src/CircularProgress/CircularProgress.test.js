import React from 'react';
import { screen, render, configure } from '@testing-library/react';

import CircularProgress from './CircularProgress.component';

configure({ testIdAttribute: 'data-test' });

describe('CircularProgress', () => {
	it('should render by default at default size', () => {
		render(<CircularProgress />);
		expect(screen.getByTestId('circular-progress')).toBeVisible();
	});

	it('should render at small size if set', () => {
		render(<CircularProgress size="small" />);
		expect(screen.getByTestId('circular-progress')).toBeVisible();
	});

	it('should render at large size if set', () => {
		render(<CircularProgress size="large" />);
		expect(screen.getByTestId('circular-progress')).toBeVisible();
		expect(screen.getByTestId('circular-progress')).toHaveClass('theme-large');
	});

	it('should render as light if set', () => {
		render(<CircularProgress light />);
		expect(screen.getByTestId('circular-progress')).toBeVisible();
		expect(screen.getByTestId('circular-progress')).toHaveClass('theme-loaderlight');
	});

	it('should render with percent if set', () => {
		render(<CircularProgress percent={30} />);
		expect(screen.getByLabelText('Loading... 30%')).toBeVisible();
	});
});
