import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PlainTextTitle } from './PlainTextTitle.component';

describe('PlainTextTitle', () => {
	it('should render', () => {
		const props = {
			text: 'text',
			feature: 'my.custom.feature',
			onEdit: jest.fn(),
		};
		const { container } = render(<PlainTextTitle {...props} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render provided component class', () => {
		const props = {
			text: 'text',
			feature: 'my.custom.feature',
			onEdit: jest.fn(),
			componentClass: 'h1',
		};
		render(<PlainTextTitle {...props} />);
		expect(screen.getByRole('heading')).toBeVisible();
		expect(screen.getByRole('heading')).toHaveTextContent('text');
	});

	it('should render in disabled state', () => {
		const props = {
			text: 'text',
			onEdit: jest.fn(),
			disabled: true,
		};
		render(<PlainTextTitle {...props} />);
		expect(screen.getByRole('button')).toBeDisabled();
	});

	it('should render disabled button for inProgress state', () => {
		const props = {
			text: 'text',
			onEdit: jest.fn(),
			inProgress: true,
		};
		render(<PlainTextTitle {...props} />);
		expect(screen.getByRole('button')).toBeDisabled();
	});

	it('should trigger onEdit when click on the action', async () => {
		const user = userEvent.setup();

		const onEdit = jest.fn();
		const props = {
			text: 'text',
			onEdit,
		};
		render(<PlainTextTitle {...props} />);
		await user.click(screen.getByRole('button'));
		expect(onEdit).toHaveBeenCalled();
	});

	it('should render empty text with pencil', () => {
		const props = {
			text: '',
			onEdit: jest.fn(),
		};
		render(<PlainTextTitle {...props} />);
		expect(screen.getByRole('button')).toBeVisible();
		expect(screen.getByRole('button')).toHaveTextContent('');

		expect(screen.getByRole('button')).toHaveClass('theme-tc-editable-text-empty-pencil');
	});
	it('should pass data attributes to the button', () => {
		const props = {
			text: 'text',
			onEdit: jest.fn(),
			'data-tracking': 'my.tracking',
		};
		render(<PlainTextTitle {...props} />);
		expect(screen.getByRole('button')).toHaveAttribute('data-tracking', 'my.tracking');
	});
});
