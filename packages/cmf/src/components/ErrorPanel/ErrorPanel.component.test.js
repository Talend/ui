import { render, screen } from '@testing-library/react';

import Component from './ErrorPanel.component';

// missing in jsdom: https://github.com/jsdom/jsdom/issues/1721
global.window.URL.createObjectURL = jest.fn();

describe('Component ErrorPanel', () => {
	it('should render the error', () => {
		window.URL.revokeObjectURL = jest.fn();
		const error = {
			name: 'Error',
			message: 'cannot call blabla of undefined',
			stack: 'here it is',
		};
		render(<Component error={error} reported response={{ id: 42 }} />);
		expect(screen.getByText('Error: cannot call blabla of undefined')).toBeInTheDocument();
	});
	it('should call revoke on unmount', () => {
		window.URL.revokeObjectURL = jest.fn();
		const error = {
			name: 'Error',
			description: 'cannot call blabla of undefined',
			stack: 'here it is',
		};
		const { unmount } = render(<Component error={error} reported response={{ id: 42 }} />);
		unmount();
		expect(window.URL.revokeObjectURL).toHaveBeenCalled();
	});
});
