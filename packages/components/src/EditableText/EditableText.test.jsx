import { render, screen } from '@testing-library/react';
import { EditableTextComponent } from './EditableText.component';

describe('EditableText', () => {
	let defaultProps;
	beforeEach(
		() =>
			(defaultProps = {
				text: 'my text',
				feature: 'my.custom.feature',
				onEdit: jest.fn(),
				onSubmit: jest.fn(),
				required: true,
			}),
	);
	it('should render', () => {
		const { container } = render(<EditableTextComponent {...defaultProps} />);
		expect(container.firstChild).toMatchSnapshot();
	});
	it('should render InlineForm', () => {
		render(<EditableTextComponent {...defaultProps} editMode />);
		expect(screen.getByRole('textbox')).toBeInTheDocument();
		expect(screen.getByRole('textbox')).toHaveClass('tc-editable-text-form-input');
	});
	it('should render skeleton', () => {
		const { container } = render(<EditableTextComponent {...defaultProps} loading />);
		expect(container.firstChild).toHaveClass('tc-skeleton');
	});
	it('should render inProgress', () => {
		render(<EditableTextComponent {...defaultProps} inProgress />);
		expect(screen.getByLabelText('Edit in progress')).toBeVisible();
		expect(screen.getByLabelText('Edit in progress')).toHaveAttribute('aria-busy', 'true');
	});
});
