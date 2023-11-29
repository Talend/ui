import InlineForm from './InlineForm.component';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import getDefaultT from '../translate';

describe('InlineForm', () => {
	let defaultProps;
	beforeEach(() => {
		defaultProps = {
			text: 'my text',
			feature: 'my.custom.feature',
			onSubmit: jest.fn(),
			onChange: jest.fn(),
			onCancel: jest.fn(),
			required: true,
			t: getDefaultT,
		};
	});
	it('should render', () => {
		const { container } = render(<InlineForm {...defaultProps} />);
		expect(screen.getByRole('textbox')).toBeVisible();
		expect(screen.getAllByRole('button')).toHaveLength(2);
		expect(container.firstChild).toMatchSnapshot();
	});
	it('should call change value and call onChange when change event trigger', async () => {
		const user = userEvent.setup();

		const event = { target: { value: 'myInputChage' } };
		render(<InlineForm {...defaultProps} />);
		await user.type(screen.getByRole('textbox'), 'myInputChage');
		expect(defaultProps.onChange).toHaveBeenCalledWith(expect.anything(event));
	});
	it('should call onSubmit when submit event trigger', async () => {
		const user = userEvent.setup();

		render(<InlineForm {...defaultProps} />);
		await user.clear(screen.getByRole('textbox'));
		await user.type(screen.getByRole('textbox'), 'mySubmitData');
		await user.click(screen.getAllByRole('button')[1]);
		expect(defaultProps.onSubmit).toHaveBeenCalledWith(expect.anything(), {
			value: 'mySubmitData',
			props: defaultProps,
		});
	});
	it('should not call onSubmit when submit event trigger with empty value', async () => {
		const user = userEvent.setup();

		render(<InlineForm {...defaultProps} text="" />);
		await user.click(screen.getAllByRole('button')[1]);
		expect(defaultProps.onSubmit).not.toHaveBeenCalled();
		expect(screen.getByRole('textbox').parentElement).toHaveClass('has-error');
	});
	it('should call onCancel when cancel event trigger', async () => {
		const user = userEvent.setup();

		const event = {};
		render(<InlineForm {...defaultProps} text="myDataBeforeCancel" />);
		expect(screen.getByRole('textbox')).toHaveValue('myDataBeforeCancel');
		await user.click(screen.getAllByRole('button')[0]);
		expect(defaultProps.onCancel).toHaveBeenCalledWith(expect.anything(event));
		expect(screen.getByRole('textbox')).toHaveValue('');
	});
	it('should call onCancel when ESC', async () => {
		const user = userEvent.setup();

		render(<InlineForm {...defaultProps} text="myDataBeforeCancel" />);
		await user.click(screen.getByRole('textbox'));
		await user.keyboard('{Escape}');
		expect(defaultProps.onCancel).toHaveBeenCalledWith(expect.anything());
		expect(screen.getByRole('textbox')).toHaveValue('');
	});

	it('should call selectInput on render', () => {
		const input = { select: jest.fn(), focus: jest.fn() };
		new InlineForm(defaultProps).selectInput(input);
		expect(input.select).toHaveBeenCalled();
		expect(input.focus).toHaveBeenCalled();
	});
	it('should show an error message if errorMessage is provided', () => {
		const errorMessage = 'Custom error message';
		const props = { ...defaultProps, errorMessage };
		render(<InlineForm {...props} />);
		expect(screen.getByText(errorMessage)).toBeVisible();
		expect(screen.getByText(errorMessage)).toHaveClass('text-danger');
		expect(screen.getByText(errorMessage).parentElement).toHaveClass('has-error');
	});
	it('should not show errors if not required', async () => {
		const user = userEvent.setup();

		const props = { ...defaultProps, required: false };
		render(<InlineForm {...props} text="" />);
		await user.click(screen.getAllByRole('button')[1]);
		expect(defaultProps.onSubmit).toHaveBeenCalled();
	});
	it('should add placeholder to input', () => {
		const placeholder = 'Your text here...';
		const props = { ...defaultProps, required: false, placeholder };
		render(<InlineForm {...props} />);
		const input = screen.getByRole('textbox');
		expect(input).toHaveAttribute('placeholder', placeholder);
	});
});
