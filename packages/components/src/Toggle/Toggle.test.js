import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Toggle from './Toggle.component';

const defaultProps = {
	id: 'id',
	onChange: jest.fn(),
	onBlur: jest.fn(),
};

describe('Toggle', () => {
	it('should render a Toggle', () => {
		// when
		const { container } = render(<Toggle {...defaultProps} />);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render an intermediate Toggle', () => {
		// given
		const props = {
			...defaultProps,
			intermediate: true,
			'data-feature': 'toggle',
		};

		// when
		render(<Toggle {...props} />);

		// then
		// TODO: we should look at this aria-checked attribute
		// expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'mixed');
		expect(screen.getByRole('checkbox')).not.toBeChecked();
		// eslint-disable-next-line jest-dom/prefer-checked
		expect(screen.getByRole('checkbox').dataset.checked).toBe('1');
	});

	it('should render a checked Toggle', () => {
		// given
		const props = {
			...defaultProps,
			checked: true,
			'data-feature': 'toggle',
		};

		// when
		render(<Toggle {...props} />);

		// then
		expect(screen.getByRole('checkbox')).toBeChecked();
		expect(screen.getByRole('checkbox').parentElement).toHaveAttribute(
			'data-feature',
			'toggle.disable', // looks like a bug
		);
	});

	it('should render a disabled Toggle', () => {
		// given
		const props = {
			...defaultProps,
			disabled: true,
			'data-feature': 'toggle',
		};

		// when
		render(<Toggle {...props} />);

		// then
		expect(screen.getByRole('checkbox')).toBeDisabled();
	});

	it('should render a autoFocused Toggle', () => {
		// given
		const props = {
			...defaultProps,
			autoFocus: true,
		};

		// when
		render(<Toggle {...props} />);

		// then
		expect(screen.getByRole('checkbox')).toHaveFocus();
	});

	it('should render a Toggle with label', () => {
		// given
		const props = {
			...defaultProps,
			label: 'some label',
		};

		// when
		render(<Toggle {...props} />);

		// then
		expect(screen.getByText('some label')).toBeVisible();
		expect(screen.getByLabelText('some label')).toBe(screen.getByRole('checkbox'));
	});

	it('should support custom className', () => {
		// given
		const props = {
			...defaultProps,
			className: 'custom-class',
		};

		// when
		render(<Toggle {...props} />);

		// then
		expect(document.querySelector('.checkbox')).toHaveClass('custom-class');
	});

	it('should pass extra props to input', () => {
		// when
		render(<Toggle {...defaultProps} aria-describedby="my-error-id" />);

		// then
		expect(screen.getByRole('checkbox')).toHaveAttribute('aria-describedby', 'my-error-id');
	});

	it('should trigger a change event', async () => {
		const user = userEvent.setup();

		// given

		// when
		render(<Toggle {...defaultProps} />);
		await user.click(screen.getByRole('checkbox'));

		// then
		expect(defaultProps.onChange).toHaveBeenCalled();
	});

	it('should trigger a blur event', () => {
		// given

		// when
		render(<Toggle {...defaultProps} />);
		screen.getByRole('checkbox').focus();
		screen.getByRole('checkbox').blur();

		// then
		expect(defaultProps.onBlur).toHaveBeenCalled();
	});
});
