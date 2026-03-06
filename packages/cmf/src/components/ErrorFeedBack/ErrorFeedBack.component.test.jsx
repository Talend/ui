import { render, screen } from '@testing-library/react';
import Component from './ErrorFeedBack.component';

global.window.URL.createObjectURL = vi.fn();

describe('Component ErrorFeedBack', () => {
	beforeEach(() => {
		window.URL.revokeObjectURL = vi.fn();
	});
	it('should render ErrorPanel', () => {
		const errors = [
			{
				name: 'Error',
				message: 'foo',
			},
		];
		render(<Component errors={errors} />);
		const panels = screen.getAllByText('Error: foo');
		expect(panels.length).toBe(1);
		expect(panels[0]).toHaveTextContent(`${errors[0].name}: ${errors[0].message}`);
	});
});
