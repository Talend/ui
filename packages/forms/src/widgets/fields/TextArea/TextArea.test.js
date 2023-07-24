import { render, screen } from '@testing-library/react';
import TextArea from './TextArea.component';

describe('TextArea agnostic widget', () => {
	const props = {
		id: 'test',
		name: 'test-name',
		label: 'Test',
		className: 'myCustomClass',
	};

	it('should render a TextArea', () => {
		// given
		// when
		const { container } = render(<TextArea {...props} />);
		// then
		const input = screen.getByRole('textbox');
		expect(input).toHaveClass('form-control myCustomClass', { exact: true });
		expect(input).toHaveAttribute('name', 'test-name');
		expect(container.firstChild).toMatchSnapshot();
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
		render(<TextArea {...aprops} />);
		// then
		const input = screen.getByRole('textbox');
		expect(input.getAttribute('aria-invalid')).toBeTruthy();
		expect(input.getAttribute('aria-required')).toBeTruthy();
		expect(input).toHaveAttribute('aria-describedby', 'test-description test-error');
	});
});
