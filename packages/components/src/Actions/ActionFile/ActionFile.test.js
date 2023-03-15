import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ActionFile from './ActionFile.component';

jest.unmock('@talend/design-system');
const myAction = {
	label: 'Click me',
	icon: 'talend-caret-down',
	onChange: jest.fn(),
	'data-feature': 'action.feature',
};

describe('ActionFile', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should render a div with a input[type="file"] and a label to mimic a button', () => {
		// when
		render(<ActionFile {...myAction} />);

		// then
		const input = screen.getByLabelText('Click me');
		expect(input).toBeInTheDocument();
		expect(input).toHaveAttribute('type', 'file');
	});

	it('should render a div with a input[type="file"] with some classname on it', () => {
		// when
		render(<ActionFile {...myAction} className="testClassName" />);

		// then
		const input = screen.getByLabelText('Click me');
		expect(input).toHaveClass('sr-only');
	});

	it('should render with accept attribute passed to it', () => {
		render(<ActionFile {...myAction} accept=".zip" />);
		const input = screen.getByLabelText('Click me');
		expect(input).toHaveAttribute('accept', '.zip');
	});

	it('change file value on the button trigger the onChange props', () => {
		// given
		render(<ActionFile {...myAction} />);

		// when
		fireEvent.change(screen.getByLabelText('Click me'), { target: { files: ['file1'] } });

		// then
		expect(myAction.onChange).toHaveBeenCalled();
		expect(myAction.onChange.mock.calls.length).toBe(1);
		const args = myAction.onChange.mock.calls[0];
		expect(args[0].type).toBe('change');
	});

	it('props.change is not called if target has no files attached', () => {
		// given
		render(<ActionFile {...myAction} />);

		// when
		fireEvent.change(screen.getByLabelText('Click me'), { target: { files: [] } });

		// then
		expect(myAction.onChange).not.toHaveBeenCalled();
	});

	it('after change props being trigered, clear the input value', () => {
		// given
		render(<ActionFile {...myAction} />);

		// when
		fireEvent.change(screen.getByLabelText('Click me'), { target: { files: [] } });

		// then
		const input = screen.getByLabelText('Click me');
		expect(input.value).toEqual('');
	});

	it('should pass all props to the Button', () => {
		// when
		render(<ActionFile {...myAction} className="navbar-btn" />);

		// then
		expect(screen.getByLabelText('Click me').parentElement).toHaveClass('navbar-btn');
	});

	it('should display a Progress indicator if set', () => {
		// when
		render(<ActionFile inProgress {...myAction} />);

		// then
		expect(screen.getByLabelText('Loading...')).toBeInTheDocument();
	});

	it('should display a disabled input', () => {
		// when
		render(<ActionFile disabled {...myAction} />);

		// then
		expect(screen.getByLabelText('Click me')).toBeDisabled();
	});

	it('should reverse icon/label', () => {
		// when
		render(<ActionFile iconPosition="right" {...myAction} />);

		// then
		expect(screen.getByText('Click me').nextSibling).toHaveClass('tc-icon-name-talend-caret-down');
	});

	it('should apply transformation on icon', () => {
		// when
		render(<ActionFile iconTransform="rotate-180" {...myAction} />);

		// then
		expect(screen.getByText('Click me').previousSibling).toHaveClass('theme-rotate-180');
	});

	it('should render action with html property name = props.name if set', () => {
		// when
		render(<ActionFile name="custom_name" {...myAction} />);

		// then
		expect(screen.getByLabelText('Click me')).toHaveAttribute('name', 'custom_name');
	});

	it('should not render action if props.available=false', () => {
		render(<ActionFile available={false} {...myAction} />);
		expect(screen.queryByLabelText('Click me')).not.toBeInTheDocument();
	});
});
