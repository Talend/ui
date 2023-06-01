import { render, screen } from '@testing-library/react';
import Input from './Input.component';

describe('Input agnostic widget', () => {
	const props = {
		id: 'test',
		name: 'test-name',
		label: 'Test',
		className: 'myCustomClass',
	};
	it('should render an input', () => {
		// given
		// when
		const { container } = render(<Input {...props} />);
		// then
		expect(container.firstChild).toMatchSnapshot();
		expect(screen.getByRole('textbox')).toHaveClass('form-control myCustomClass');
		expect(screen.getByRole('textbox')).toHaveAttribute('name', 'test-name');
	});

	it('should ensure a11y', () => {
		// given
		const aprops = {
			...props,
			description: 'this is an error',
			error: 'error label',
			required: true,
		};
		// when
		render(<Input {...aprops} />);
		// then
		const input = screen.getByRole('textbox');
		expect(input).toHaveAttribute('aria-invalid', 'true');
		expect(input).toBeRequired();
		expect(input).toHaveAttribute('aria-describedby', 'test-description test-error');
	});
});
