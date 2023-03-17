import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ConfirmDialog from './ConfirmDialog.component';

const children = <div>BODY</div>;

const cancelAction = {
	label: 'CANCEL',
	onClick: jest.fn(),
	tooltipPlacement: 'top',
};

const validateAction = {
	label: 'OK',
	onClick: jest.fn(),
	tooltipPlacement: 'top',
};

describe('ConfirmDialog', () => {
	it('should render with defaults values', () => {
		// given
		const properties = {
			header: 'Hello world',
			show: true,
			validateAction,
			cancelAction,
		};

		// when
		render(<ConfirmDialog {...properties}>{children}</ConfirmDialog>);
		// then
		expect(screen.getByText('Hello world')).toBeInTheDocument();
	});

	it('should render without header', () => {
		// given
		const properties = {
			show: true,
			validateAction,
			cancelAction,
		};

		// when
		render(<ConfirmDialog {...properties}>{children}</ConfirmDialog>);

		// then
		expect(screen.queryByText('Hello world')).not.toBeInTheDocument();
		expect(document.querySelector('.modal-header')).toBeNull();
	});

	it('should render with a small container', () => {
		// given
		const properties = {
			show: true,
			header: 'Hello world',
			size: 'small',
			validateAction,
			cancelAction,
		};

		// when
		render(<ConfirmDialog {...properties}>{children}</ConfirmDialog>);

		// then
		expect(screen.getByText('Hello world')).toBeInTheDocument();
		expect(document.querySelector('.modal-dialog')).toHaveClass('modal-sm');
	});

	it('should render with a large container', () => {
		// given
		const properties = {
			show: true,
			header: 'Hello world',
			size: 'large',
			validateAction,
			cancelAction,
		};

		// when
		render(<ConfirmDialog {...properties}>{children}</ConfirmDialog>);
		// then
		expect(screen.getByText('Hello world')).toBeInTheDocument();
		expect(document.querySelector('.modal-dialog')).toHaveClass('modal-lg');
	});

	it('should render with a progress bar', () => {
		// given
		const properties = {
			show: true,
			header: 'Hello world',
			size: 'large',
			validateAction,
			cancelAction,
			progressLabel: 'This is loading',
			progressValue: 25,
		};

		// when
		render(<ConfirmDialog {...properties}>{children}</ConfirmDialog>);

		// then
		expect(screen.getByText('Hello world')).toBeInTheDocument();
		expect(screen.getByLabelText('This is loading')).toBeInTheDocument();
		expect(screen.getByLabelText('This is loading')).toHaveAttribute('aria-valuenow', '25');
	});

	it('should render with additional actions', () => {
		// given
		const properties = {
			header: 'Hello world',
			show: true,
			validateAction,
			cancelAction,
			secondaryActions: [
				{
					label: 'Keep on Github',
					onClick: jest.fn(),
					bsStyle: 'info',
				},
			],
		};

		// when.
		render(<ConfirmDialog {...properties}>{children}</ConfirmDialog>);

		// then
		expect(screen.getByText('Hello world')).toBeInTheDocument();
		expect(screen.getByText('Keep on Github')).toBeInTheDocument();
		userEvent.click(screen.getByText('Keep on Github'));
		expect(properties.secondaryActions[0].onClick).toHaveBeenCalled();
	});
});
