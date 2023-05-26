import { render, screen } from '@testing-library/react';
import Select from './Select.component';

describe('Select agnostic widget', () => {
	const props = {
		id: 'test',
		label: 'Test',
		className: 'myCustomClass',
		options: [
			{ value: 'blue', name: 'Blue color' },
			{ value: 'red', name: 'Red color' },
		],
	};

	it('should render a select', () => {
		// given
		// when
		const { container } = render(<Select {...props} name="test-name" />);
		// then
		const select = screen.getByRole('combobox');
		expect(select).toHaveClass('form-control myCustomClass', { exact: true });
		expect(select).toHaveAttribute('name', 'test-name');
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
		render(<Select {...aprops} />);
		// then
		const select = screen.getByRole('combobox');
		expect(select.getAttribute('aria-invalid')).toBeTruthy();
		expect(select.getAttribute('aria-required')).toBeTruthy();
		expect(select).toHaveAttribute('aria-describedby', 'test-description test-error');
	});
});
